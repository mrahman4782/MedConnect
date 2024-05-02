import React, { useState, useRef, useEffect, } from 'react';
import {
  Text, View, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, KeyboardAvoidingView, Platform, Image, Animated, Pressable
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import chatWithGPT from '../../functions/apiCall';
import { Stack, router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const Chatbot = () => {
  const [input, setInput] = useState('');
  const [inputHeight, setInputHeight] = useState(40);
  const [gptOutput, setGptOutput] = useState([{ type: 'gpt', text: 'Hello, how can I help you?' }]);
  const [isTyping, setIsTyping] = useState(false);
  const [messageHistory, setMessageHistory] = useState([]);
  const scrollViewRef = useRef();
  const dot1 = useRef(new Animated.Value(1)).current;
  const dot2 = useRef(new Animated.Value(1)).current;
  const dot3 = useRef(new Animated.Value(1)).current;
  

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [gptOutput]);


  useEffect(() => {
    if (isTyping) {
      animate();
    } else {
      dot1.setValue(1);
      dot2.setValue(1);
      dot3.setValue(1);
    }
  }, [isTyping]);

  const animate = () => {
    const sequence = Animated.sequence([
      Animated.timing(dot1, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(dot1, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(dot2, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(dot2, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(dot3, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(dot3, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(sequence).start();
  };

  const onEnterPress = async () => {
    if (input.trim() !== "") {
      const newGptOutput = { type: "user", text: input };
      setGptOutput([...gptOutput, newGptOutput]);
      setInput('');
      setIsTyping(true);
      setInputHeight(40);

      // Set message history
      if (messageHistory.len >= 6){
        setMessageHistory(curHistory => curHistory.slice(1));
        setMessageHistory(curHistory => [...curHistory, input]);
      }
      else {
        setMessageHistory(curHistory => [...curHistory, input]);
      }

      const output = await chatWithGPT(input, messageHistory);
      console.log(`THE OUTPUT ISSSSSSSSSSS ${JSON.stringify(output)}`);
      setIsTyping(false);
      setGptOutput(currentGptOutput => [...currentGptOutput, { type: 'gpt', text: output.content }]); // Add GPT response to chat output
    }
  };

  const handleInputSizeChange = (event) => {
    setInputHeight(event.nativeEvent.contentSize.height);
  };

  const handleInputChange = (text) => {
    setInput(text);
    if (text === '') {
      setInputHeight(40); 
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#19233C',
    },
    scrollViewContainer: {
      flex: 1,
    },
    messageContainer: {
      flexDirection: "row",
      padding: 5,
      marginVertical: 4,
      maxWidth: '80%',
      alignSelf: 'flex-end',
      flexWrap: 'wrap',
      margin: 15,
    },

//    gptMessage: {
//      backgroundColor: "#111823",
//    }


    gptMessage: {
      backgroundColor: '#90ee90',
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 20,
      alignSelf: 'flex-start',
      margin: 15,
    },
    userMessage: {
      backgroundColor: '#add8e6',
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20,
      alignSelf: "flex-end",
    },
    messageText: {
      padding: 10,
      // color: 'white',
      color: 'black',
      fontSize: 18,
      fontWeight: "500",
    },
    inputContainer: {

//      flexDirection: "row",
//      alignItems: "center",
//      padding: 10,

      flexDirection: 'row',
      alignItems: 'flex-end',
      padding: 15,
    },
    textInput: {
      flex: 1,
      minHeight: 40,
      maxHeight: 120,
      padding: 10,

      //backgroundColor: "#78797A",

      backgroundColor: 'white',
      borderRadius: 20,
      marginRight: 10,
    },
    sendButtonContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: 50,
      height: 50,
    },
    sendButtonImage: {
      //width: "100%",
      //height: "100%",
      width: '80%',
      height: '80%',
      borderRadius: 15,
      padding: 18,
    },
    typingIndicatorContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 4,

//      backgroundColor: "#111823",
//      borderTopLeftRadius: 20,
//      borderBottomLeftRadius: 20,
//      borderTopRightRadius: 20,
//      alignSelf: "flex-end",
//      maxWidth: "80%",
//      padding: 10,
      backgroundColor: "#90ee90",
      borderTopLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20,
      alignSelf: "flex-start",
      maxWidth: "80%",
      padding: 10,
      margin: 15,
    },
    typingIndicatorDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: "white",
    },
    typingIndicatorText2: {
      color: "white",
      backgroundColor: "black",
      marginRight: 4,
    },
    typingIndicatorText: {
      color: "black",
      fontSize: 18,
      fontWeight: "500",
    },
  });

  return (

    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: '',
          // headerShown: true, //change if you want
          headerStyle: {
            backgroundColor: '#19233C'
          },
          headerLeft: ({ color }) =>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/',
                })
              }>
              <FontAwesome size={40} name="arrow-circle-o-left" color='white' />
            </Pressable>
        }}
      />
      < ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={{ flexGrow: 0 }}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
      >

        {
          gptOutput.map((msg, index) => (
            <View key={index} style={[styles.messageContainer,
            msg.type === 'user' ? styles.userMessage : styles.gptMessage
            ]}>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          ))
        }
        {
          isTyping && (
            <View style={styles.typingIndicatorContainer}>
              <Animated.View style={[styles.typingIndicatorDot, { opacity: dot1 }]} />
              <Animated.View style={[styles.typingIndicatorDot, { opacity: dot2 }]} />
              <Animated.View style={[styles.typingIndicatorDot, { opacity: dot3 }]} />
            </View>
          )
        }
      </ScrollView >

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
        keyboardVerticalOffset={Platform.select({ ios: 60, android: 0 })}
      >
        <TextInput
          style={[styles.textInput, { height: Math.max(40, inputHeight) }]}
          placeholder="Enter your message"
          value={input}
          onChangeText={handleInputChange}
          multiline={true}
          onContentSizeChange={handleInputSizeChange}
          showsVerticalScrollIndicator={false}
          textAlignVertical="center"
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
    </View >
  );
};

export default Chatbot;
