import { useState } from 'react'
import { Pressable, Text, View, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Logo from '../../../assets/icon.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from '../../components/CustomButton';
import { useRouter } from 'expo-router';
import userLogin from '../../functions/login.js';
import { Link, router } from "expo-router";

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { height } = useWindowDimensions();

    const onSignInPressed = async () => {
        
        if (email != '' && password != ''){

            let output = await userLogin(email, password);

            if ('status' in output){
                if (output.status == 200){
                
                    router.push({
                        pathname: "/screens/Chatbot",
                    })
                }
            }

        }

    }

    const onForgotPasswordPressed = () => {
        console.warn("Forgotpassword Pressed");
    }

    const onSignUpPressed = () => {
        console.warn("Signup Pressed");
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image
                    source={Logo}
                    style={[styles.logo, { height: height * 0.3 }]}
                    resizeMode="contain"
                />
                <Text>Login</Text>
                <CustomInput
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                />
                <CustomInput
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                // secureTextEntry 
                />
                <CustomButton
                    text="Sign In"
                    onPress={onSignInPressed}
                />
                <CustomButton
                    text="Forgot Password"
                    onPress={onForgotPasswordPressed}
                    type="TERTIARY"
                />
                <CustomButton
                    text="Don't have an account? Create one"
                    onPress={onSignUpPressed}
                    type="TERTIARY"
                />

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F9FBFC'
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
        margin: 10,
    }
})

export default Login