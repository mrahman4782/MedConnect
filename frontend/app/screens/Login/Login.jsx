import { useState } from 'react'
import { Pressable, Text, View, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Logo from '../../../assets/icon.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from '../../components/CustomButton';
import { useRouter } from 'expo-router';
import userLogin from '../../functions/login.js';
import { Link, router } from "expo-router";
import sessionStorage from '../../functions/sessionStorage';

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const { height } = useWindowDimensions();

    const onSignInPressed = async () => {

        if (email != '' && password != '') {

            let output = await userLogin(email, password);

            if ('status' in output) {
                if (output.status == 200) {
                    let key = sessionStorage.sessionKey;
                    setMessage(`SessionKey: ", ${key}`)
                    router.push({
                        pathname: "/",
                    })

                }
            }

        }

    }

    const onForgotPasswordPressed = () => {
        console.warn("Forgotpassword Pressed");
    }

    const onSignUpPressed = () => {
        router.push("/screens/Register")
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <View style={styles.box}>

                    {/* <Image
                        source={Logo}
                        style={[styles.logo, { height: height * 0.3 }]}
                        resizeMode="contain"
                    /> */}
                    <Text style={styles.loginText}>L O G I N</Text>
                    <CustomInput
                        style={styles.textFields}
                        placeholder="Email"
                        value={email}
                        setValue={setEmail}
                    />
                    <CustomInput
                        placeholder="Password"
                        style={styles.textFields}
                        value={password}
                        setValue={setPassword}
                    // secureTextEntry 
                    />
                    <CustomButton
                        text="Sign In"
                        onPress={onSignInPressed}
                    />
                    {/* <CustomButton
                        text="Forgot Password"
                        onPress={onForgotPasswordPressed}
                        type="TERTIARY"
                    /> */}
                    <CustomButton
                        text="Create Account"
                        onPress={onSignUpPressed}
                        type="TERTIARY"
                    />

                    {message !== "" && <Text>{message}</Text>}
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        flex: 1, 
        padding: 20,
        backgroundColor: '#e0e1dd',
        paddingBottom: 130,
        paddingTop: 80
    },
    box: {
        backgroundColor: '#598392',
        padding: 40,
        width: 300,
        height: 400,
        borderRadius: 20,
        alignContent: 'center'
    }, 
    loginText: {
        
        paddingLeft: 5,
        fontSize: 22,
        
        color: "white",
        marginTop: 10,
        marginBottom: 50,
        paddingBottom: 5,
        textAlign: 'center',
        
    },
    textFields: {
        padding: 5,
        color: '#757474',
        outline: 'none',
        borderWidth: 0,
        borderRadius: 5,
        height: 40
    },
    smallText: {

    }

})

export default Login