import { Text, View, ImageBackground, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Logo from '../../../assets/icon.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from '../../components/CustomButton';
import chatWithGPT from '../../functions/apiCall';
import { useState, useRef } from 'react';

const Chatbot = () => {
    const { height } = useWindowDimensions();
    const [input, setInput] = useState("");
    const [gptOutput, setGptOutput] = useState([{ type: 'gpt', text: 'Hello!' }]); // store chat history
    const scrollViewRef = useRef(); // manage scroll for scrollView

    const styles = StyleSheet.create({
        scrollViewContainer: {
            flex: 1,
        },
        background: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            minHeight: height,
            backgroundColor: '#b0c2e8',
        },
        textBox: {
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 20,
            width: '100%',
            position: "absolute",
            bottom: 5,
            zIndex: 10,
        },
        messageContainer: {
            flexDirection: 'row',
            padding: 10,
            marginVertical: 4,
            maxWidth: '80%',
            alignSelf: 'flex-end',
            flexWrap: 'wrap',
        },
        userMessage: {
            backgroundColor: '#add8e6',
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderTopLeftRadius: 20,
            marginRight: '95%',
            alignSelf: 'flex-end',
        },
        gptMessage: {
            backgroundColor: '#90ee90',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopRightRadius: 20,
            marginLeft: '20%',
            alignSelf: 'flex-start',
        },
        messageText: {
            padding: 10,
            color: 'black',
        },
    });

    //Function when you press 'Enter', Send user message to GPT and append answer
    const onEnterPress = async () => {
        if (input !== '') {
            const newGptOutput = { type: 'user', text: input }; // preapre to user message for display
            setGptOutput([...gptOutput, newGptOutput]); // add user message to chat history

            const output = await chatWithGPT(input); // send user message to GPT and waiting
            setGptOutput(currentGptOutput => [...currentGptOutput, { type: 'gpt', text: output }]); // Add GPT answer in to chat history
            setInput(""); // Clear input area after send message
        }
    };

    return (
        <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false} ref={scrollViewRef}>
            <ImageBackground source={Logo} style={styles.background} resizeMode="cover">
                <Text>Welcome to the MedChat</Text>
                {gptOutput.map((msg, index) => (    // Iterate chat history and display
                    <View key={index} style={[msg.type === 'user' ? styles.userMessage : styles.gptMessage, styles.messageContainer]}>
                        <Text style={styles.messageText}>{msg.text}</Text>
                    </View>
                ))}
                <View style={styles.textBox}>
                    <CustomInput
                        placeholder="Enter your message"
                        value={input}
                        setValue={setInput}
                    />
                    <CustomButton
                        text="Enter"
                        onPress={onEnterPress}
                    />
                </View>
            </ImageBackground>
        </ScrollView>
    );
};

export default Chatbot;
