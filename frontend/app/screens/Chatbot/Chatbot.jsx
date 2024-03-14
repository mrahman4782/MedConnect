import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Logo from '../../../assets/icon.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from '../../components/CustomButton';
import chatWithGPT from '../../functions/apiCall';
import { useState, useEffect } from 'react'

const Chatbot = () => {

    const { height } = useWindowDimensions();
    const [input, setInput] = useState("");
    const [gptOutput, setGptOutput] = useState("Hello!");

    const styles = StyleSheet.create({
        root: {
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#b0c2e8'
        },
        logo: {
            width: '70%',
            maxWidth: 300,
            maxHeight: 200,
            margin: 10,
        }
    })
    const onEnterPress = async () => {

        if (input != '') {

            let output = await chatWithGPT(input);

            setGptOutput(output);

        }

    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image
                    source={Logo}
                    style={[styles.logo, { height: height * 0.3 }]}
                    resizeMode="contain"
                />
                <Text>Welcome to the MedChat</Text>
                <CustomInput
                    placeholder="Enter your message"
                    value={input}
                    setValue={setInput}
                />
                <CustomButton
                    text="Enter"
                    onPress={onEnterPress}
                />
                <Text>{gptOutput}</Text>

            </View>
        </ScrollView>
    )
}

export default Chatbot;