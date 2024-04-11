import { Text, View, ImageBackground, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Logo from '../../../assets/icon.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from '../../components/CustomButton';
import chatWithGPT from '../../functions/apiCall';

import { useState, useRef, useEffect } from 'react';
import { Stack } from "expo-router";

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
            justifyContent: 'space-between',
            backgroundColor: '#000080',

        },
        messageContainer: {
            flexDirection: 'row',
            padding: 5,
            marginVertical: 4,
            maxWidth: '80%',
            alignSelf: 'flex-end',
            flexWrap: 'wrap',
            borderWidth: 4,
            borderColor: '#000000',
        },
        userMessage: {
            backgroundColor: '#add8e6',
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderTopLeftRadius: 20,

        },
        gptMessage: {
            backgroundColor: '#f8f8ff',
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
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 10,
            marginBottom: 20,
        },
        textInput: {
            flex: 4, 
            marginRight: 10,
            padding: 10,
            backgroundColor: '#FFF',
            minHeight: 40, 
            maxHeight: 200,
            textAlignVertical: 'top',
        },
        sendButtonContainer: {
            flex: 1, 
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#D3D3D3',
            borderRadius: 5,
        },
          sendButtonText: {
            color: '#FFFFFF',
            fontWeight: 'bold',
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
            <Stack.Screen
                options={{
                    headerTitle: 'HeaderTitle'
                }}
            />


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
                    <View style={{ flex: 4, marginRight: 10 }}>
                        <CustomInput
                            style={styles.textInput}
                            placeholder="Enter your message"
                            value={input}
                            setValue={setInput}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CustomButton
                            containerStyle={styles.sendButtonContainer}
                            textStyle={styles.sendButtonText}
                            text="Enter"
                            onPress={onEnterPress}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
        // </ImageBackground>
    );
};

export default Chatbot;