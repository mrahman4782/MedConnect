import React, { useState, useRef, useEffect, } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, KeyboardAvoidingView, Platform, Image, } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import chatWithGPT from '../../functions/apiCall';
const Chatbot = () => {
  const [input, setInput] = useState('');
  const [gptOutput, setGptOutput] = useState([{ type: 'gpt', text: 'Hello, how can I help you?' }]);
  const scrollViewRef = useRef();
  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [gptOutput]);
  const onEnterPress = async () => {
    if (input.trim() !== '') {
      const newGptOutput = { type: 'user', text: input };
      setGptOutput([...gptOutput, newGptOutput]);
      const output = await chatWithGPT(input);
      setGptOutput(currentGptOutput => [...currentGptOutput, { type: 'gpt', text: output }]);
      setInput('');
    }
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1D3151',
    },
    scrollViewContainer: {
      flex: 1,
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
      backgroundColor: '#ADD8E6',
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 20,
      alignSelf: 'flex-start',
    },
    gptMessage: {
      backgroundColor: '#111823',
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderTopRightRadius: 20,
      alignSelf: 'flex-end',
    },
    messageText: {
      padding: 10,
      color: 'white',
      fontSize: 18,
      fontWeight: '500',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    textInput: {
      flex: 1,
      padding: 10,
      backgroundColor: '#78797A',
      borderRadius: 20,
      marginRight: 10,
    },
    sendButtonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
    },
    sendButtonImage: {
      width: '100%',
      height: '100%',
      },
  });
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={{ flexGrow: 0 }}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
      >
        {gptOutput.map((msg, index) => (
          <View key={index} style={[styles.messageContainer,
            msg.type === 'user' ? styles.userMessage : styles.gptMessage
          ]}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
        keyboardVerticalOffset={Platform.select({ ios: 60, android: 0 })}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Enter your message"
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButtonContainer}
          onPress={onEnterPress}
        >
        <Image
            source={require('../../../assets/send_button.png')}
            resizeMode='contain'
            style={styles.sendButtonImage}
        />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};
export default Chatbot;