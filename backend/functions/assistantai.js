import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import OpenAI from "openai";
import fs from "fs";
import axios from "axios";
import { retrieveUserData } from "./retrieveData.js";
import { updateThreadId } from "./updateThreadId.js";
import { chatWithBaseGPT } from "./api.js";

// retrieving the keys from env file

const openai_key = process.env.OPENAI_API_KEY;
const summary_key = process.env.SUMMARIZER_API_KEY;
const assistant_key = process.env.OPENAI_ASSISTANT_ID;

const model = "gpt-4-turbo-preview";

// Function to get list of news articles from a topic using axios and an external API
async function get_summary(topic) {
  console.log("calling get_summary");
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

// get_answer function is a backup and is called
// in case the chatbot automatically doesn't use the regular chatgpt
// capabilites. Inside it it's use the function that is making an api call to the
// 3.5 model (mohammed's old code)

async function get_answer(message) {
  console.log("calling get_answer");
  const output = await chatWithBaseGPT(message);
  return output.content;
}

class AssistantManager {
  constructor() {
    this.client = new OpenAI({ apiKey: openai_key });
    this.model = model;
    this.assistant = null;
    this.thread = null;
    this.summary = null;
  }

  // the below code creates an assistant which in returns gets an assistant id ,
  // but we are not using the code since we already have created it through the
  // website and using the assistant id we stored in OPENAI_ASSISTANT_ID
  // --- -- - - - - - -- -- - -- - - -

  // async createAssistant(name, instructions, tools) {
  //   if (!this.assistant) {
  //     const file = await this.client.files.create({
  //       file: fs.createReadStream("../../Documents/comments.txt"),
  //       purpose: "assistants",
  //     });

  //     const assistantObj = await this.client.beta.assistants.create({
  //       name: name,
  //       instructions: instructions,
  //       tools: tools,
  //       model: this.model,
  //       file_ids: [file.id],
  //     });

  //     AssistantManager.assistant_id = assistantObj.id;
  //     this.assistant = assistantObj;
  //     console.log(`Assistant ID: ${this.assistant.id}`);
  //   }
  // }

  // function to retrieve the assistant id

  async retrieveAssistant(id) {
    const assistantObj = { id: id };
    AssistantManager.assistant_id = assistantObj.id;
    this.assistant = assistantObj;
    console.log(`Assistant ID: ${this.assistant.id}`);
  }

  // Create a new thread for conversation, but commenting it out because
  // the body of this code is in the else statement of the retrieveThread.
  // - - - -- - - - - -- - -- - - -- -  -

  // async createThread() {
  //   if (!this.thread) {
  //     const threadObj = await this.client.beta.threads.create();
  //     AssistantManager.thread_id = threadObj.id;
  //     this.thread = threadObj;
  //     console.log(`Thread ID: ${this.thread.id}`);
  //   }
  // }

  // function to retrieve thread id. If there is no threadid associated with the logged in user,
  // we make a new thread id and append the new data in the database with the associated user. That part
  // is done by the updateThreadId
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

  async retrieveUserData(token) {
    const response = await retrieveUserData(token);
    console.log("response-blah-blah", response);
    const data = response.data;
    const { threadId, ...filteredData } = data;
    console.log("filteredData", filteredData);
    return filteredData;
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
  async runAssistant(extraInstructions) {
    console.log("Running assistant now..");
    if (this.thread && this.assistant) {
      this.run = await this.client.beta.threads.runs.create(this.thread.id, {
        assistant_id: this.assistant.id,
        instructions: extraInstructions,
      });
    }
  }
  // gets the recent response data from the chatgpt
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

  // based on what the function name is, it executes the appropriate function associated with that
  // function name
  async callRequiredFunctions(required_actions) {
    if (!this.run) {
      return;
    }

    const toolOutputs = [];
    for (const action of required_actions.tool_calls) {
      const functionName = action.function.name;
      const argument = JSON.parse(action.function.arguments);

      try {
        if (functionName === "get_summary") {
          const output = await get_summary(argument.topic);
          let finalStr = output.join("\n");
          toolOutputs.push({
            tool_call_id: action.id,
            output: finalStr,
          });
        } else if (functionName === "get_answer") {
          const output = await get_answer(argument.message);
          toolOutputs.push({
            tool_call_id: action.id,
            output: output,
          });
        } else {
          throw new Error(`Unknown function: ${functionName}`);
        }
      } catch (error) {
        console.error(`Error processing ${functionName}: ${error}`);
        // Handle or log the error appropriately
      }
    }

    console.log("Submitting outputs back to the assistant...");
    await this.client.beta.threads.runs.submitToolOutputs(
      this.thread.id,
      this.run.id,
      { tool_outputs: toolOutputs }
    );
  }

  // this constantly runs until status is completed. Initially set the setTimeout to 5000, but to speed up the checking of
  // the run status, i made it 1000.
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
        console.log(runStatus.last_error);
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

// new instance of the class
const manager = new AssistantManager();
// this function is being called everytime the user sends a message in the chat interface.
export async function assistantAI(instruction, token) {
  // substitue personalInfo with a string of the information from the database for the logged on user.
  if (!manager.assistant) {
    console.log("retrieveAssist");
    await manager.retrieveAssistant(assistant_key);
  }
  if (!manager.thread) {
    await manager.retrieveThread(token);
  }
  let data = await manager.retrieveUserData(token);
  await manager.addMessageToThread("user", JSON.stringify(data)); // the personal information is added to the thread
  await manager.addMessageToThread("user", instruction); // the question that the user asked to the chat interface

  await manager.runAssistant(
    "For all response, take into consideration of user's personal heatlh information. For example if they have a fever , and they ask whether they can go outside without warm clothing. The response should be no."
  );
  const result = await manager.waitForCompleted();

  response.status = 200;
  response.data = result;
  return response;
}
