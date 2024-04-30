import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import OpenAI from "openai";
import fs from "fs";
import axios from "axios";
import { retrieveUserData } from "./retrieveData.js";
import { updateThreadId } from "./updateThreadId.js";

const openai_key = process.env.OPENAI_API_KEY;
const summary_key = process.env.SUMMARIZER_API_KEY;
const assistant_key = process.env.OPENAI_ASSISTANT_ID;
const model = "gpt-4-turbo-preview";

// Function to get news summary from a topic using axios and an external API
async function get_summary(topic) {
  const url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${summary_key}`;

  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      const summaryJson = response.data;
      const finalSummary = [];

      for (const article of summaryJson.articles) {
        const titleDescription = `Title: ${article.title}, Author: ${article.author}, Source: ${article.source.name}, Description: ${article.description}, URL: ${article.url}`;
        finalSummary.push(titleDescription);
      }

      return finalSummary;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
}

class AssistantManager {
  constructor() {
    this.client = new OpenAI({ apiKey: openai_key });
    this.model = model;
    this.assistant = null;
    this.thread = null;
    this.summary = null;
  }

  // Create an assistant with provided details

  // this can be removed as we are manually making the assistant and just using the id.

  async createAssistant(name, instructions, tools) {
    if (!this.assistant) {
      const file = await this.client.files.create({
        file: fs.createReadStream("../../Documents/comments.txt"),
        purpose: "assistants",
      });

      const assistantObj = await this.client.beta.assistants.create({
        name: name,
        instructions: instructions,
        tools: tools,
        model: this.model,
        file_ids: [file.id],
      });

      AssistantManager.assistant_id = assistantObj.id;
      this.assistant = assistantObj;
      console.log(`Assistant ID: ${this.assistant.id}`);
    }
  }
  async retrieveAssistant(id) {
    const assistantObj = { id: id };
    AssistantManager.assistant_id = assistantObj.id;
    this.assistant = assistantObj;
    console.log(`Assistant ID: ${this.assistant.id}`);
  }

  // Create a new thread for conversation
  async createThread() {
    if (!this.thread) {
      const threadObj = await this.client.beta.threads.create();
      AssistantManager.thread_id = threadObj.id;
      this.thread = threadObj;
      console.log(`Thread ID: ${this.thread.id}`);
    }
  }

  async retrieveThread(token) {
    const response = await retrieveUserData(token);
    console.log("response-blah-blah", response);
    if (response.data.threadId) {
      console.log("threadId exists");
      const threadObj = { id: response.data.threadId };
      AssistantManager.thread_id = threadObj.id;
      this.thread = threadObj;
      console.log(`Thread ID: ${this.thread.id}`);
    } else {
      console.log("create new threadId");
      //separate create thread id
      const threadObj = await this.client.beta.threads.create();
      AssistantManager.thread_id = threadObj.id;
      this.thread = threadObj;
      console.log(`Thread ID: ${this.thread.id}`);
      const response = updateThreadId(threadObj.id, token);
      console.log("response after writing", response);
      //error handiling needed
    }
  }

  // Add a message to the thread with specified role and content
  async addMessageToThread(role, content) {
    if (this.thread) {
      await this.client.beta.threads.messages.create(this.thread.id, {
        role: role,
        content: content,
      });
    }
  }

  // Main logic to run the assistant and process messages
  async runAssistant() {
    console.log("Running assistant now..");
    if (this.thread && this.assistant) {
      this.run = await this.client.beta.threads.runs.create(this.thread.id, {
        assistant_id: this.assistant.id,
      });
    }
  }

  async processMessage() {
    if (this.thread) {
      const messages = await this.client.beta.threads.messages.list(
        this.thread.id
      );

      const lastMessage = messages.data[0];
      const response = lastMessage.content[0].text.value;
      console.log(response, "response in process message");
      return response;
    }
  }

  async callRequiredFunctions(required_actions) {
    if (!this.run) {
      return;
    }

    const toolOutputs = [];
    console.log(required_actions.tool_calls);
    for (const action of required_actions.tool_calls) {
      const functionName = action.function.name;
      const argument = JSON.parse(action.function.arguments);

      if (functionName === "get_summary") {
        const output = await get_summary(argument.topic);

        let finalStr = output.join("\n");

        toolOutputs.push({
          tool_call_id: action.id,
          output: finalStr, // string of all the articles
        });
      } else {
        throw new Error(`Unknown function: ${functionName}`);
      }
    }

    console.log("Submitting outputs back to the assistant...");
    await this.client.beta.threads.runs.submitToolOutputs(
      this.thread.id,
      this.run.id,
      { tool_outputs: toolOutputs } // tool ouputs has to be list of objects
    );
  }

  async waitForCompleted() {
    let runStatus;
    console.log("waiting for the running to finish...");
    if (this.thread && this.run) {
      while (true) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        runStatus = await this.client.beta.threads.runs.retrieve(
          this.thread.id,
          this.run.id
        );
        console.log("RUN STATUS:");
        console.log("-----------");
        console.log(runStatus.status);
        console.log(runStatus.requires_action);
        console.log("\n");

        if (runStatus.status === "completed") {
          const response = await this.processMessage();
          return response;
          break;
        } else if (runStatus.status === "requires_action") {
          console.log("FUNCTION CALLING NOW...");
          await this.callRequiredFunctions(
            runStatus.required_action.submit_tool_outputs
          );
        }
      }
    }
  }
}
let response = {
  status: "",
  data: "",
};

const manager = new AssistantManager();
export async function assistantAI(instruction, token) {
  if (!manager.assistant) {
    console.log("retrieveAssist");
    await manager.retrieveAssistant(assistant_key);
  }
  if (!manager.thread) {
    console.log("retrieve adas");
    await manager.retrieveThread(token);
  }
  await manager.addMessageToThread("user", instruction);

  await manager.runAssistant();
  const result = await manager.waitForCompleted();

  response.status = 200;
  response.data = result;
  return response;
}
