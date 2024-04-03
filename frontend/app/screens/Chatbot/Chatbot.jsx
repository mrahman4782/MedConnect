import { Text, View, ImageBackground, StyleSheet, useWindowDimensions, ScrollView  } from "react-native";
import Logo from '../../../assets/icon.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from '../../components/CustomButton';
import chatWithGPT from '../../functions/apiCall';

import { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
    const { height } = useWindowDimensions();
    const [input, setInput] = useState("");

    const [gptOutput, setGptOutput] = useState([{ type: 'gpt', text: 'Hello!' }]); // store chat history
    const scrollViewRef = useRef(); // manage scroll for scrollView

    useEffect(() => { //Scroll down, input new message 
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [gptOutput]);



    const styles = StyleSheet.create({
        scrollViewContainer: {
            flex: 1,
            width: '100%',
        },
        background: {
            width: '100%',
            height: '100%',
            position: 'absolute',
        },
        container: {
            flex: 1,
            padding: 10,
            justifyContent: 'center',

        },
        messageContainer: {
            flexDirection: 'row',
            padding: 5,
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

        },
        gptMessage: {
            backgroundColor: '#90ee90',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopRightRadius: 20,

        },
        messageText: {
            padding: 10,
            color: 'black',
        },
        inputContainer: {
            flexDirection: 'row',
            width: '80%',
            borderColor: '#000', 
            padding: 5,
            justifyContent: 'space-between', 
            minHeight: 50,
            marginTop: 30
        },
        textInput: {
            flex: 1, 
            marginRight: 10,
            fontSize: 14, 
            padding: 10
        },
        sendButtonContainer: {
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 5, 
            justifyContent: 'center', 
        },
        sendButtonText: {
            color: '#000000',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 16, 
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
        // <ImageBackground source={Logo} style={styles.background} resizeMode="cover">
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollViewContainer}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    ref={scrollViewRef}>
                {/* <Text>Welcome to the MedChat</Text> */}
                {gptOutput.map((msg, index) => (    // Iterate chat history and display
                    <View key={index} style={[styles.messageContainer, msg.type === 'user' ? styles.userMessage : styles.gptMessage, { alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start' }]}>
                        <Text style={styles.messageText}>{msg.text}</Text>
                    </View>
                ))}
                <View style={styles.inputContainer}>
                    <CustomInput
                        style={styles.textInput}
                        placeholder="Enter your message"
                        value={input}
                        setValue={setInput}
                    />
                    <CustomButton
                        containerStyle={styles.sendButtonContainer}
                        textStyle={styles.sendButtonText}
                        text="Enter"
                        onPress={onEnterPress}
                    />
                   </View>
                </ScrollView>
            </View>
        // </ImageBackground>
    );
};

export default Chatbot;
