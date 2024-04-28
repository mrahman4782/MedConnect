import { useState } from 'react'
import { Platform, Alert, Pressable, Text, View, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Logo from '../../../assets/icon.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from '../../components/CustomButton';
import { useRouter, Stack, Link, router } from 'expo-router';
import userLogin from '../../functions/login.js';
import sessionStorage from '../../functions/sessionStorage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import logo from '../../../assets/MedConnect-12-transparent 2.png';

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { height } = useWindowDimensions();

    const onSignInPressed = async () => {

        // if (email != '' && password != '') {

        //     let output = await userLogin(email, password);

        //     if ('status' in output) {
        //         if (output.status == 200) {
        //             let key = sessionStorage.sessionKey;
        //             setMessage(`SessionKey: ", ${key}`)
        //             router.push({
        //                 pathname: "/",
        //             })

        //         }
        //     }

        // }
        if (email === "" || password === "") {
            setErrorMessage("Missing Input");
        } else {
            try {
                await userLogin(email, password);
                router.push({
                    pathname: "/",
                });
                return;
            } catch (error) {
                if (error.code === "auth/invalid-email") {
                    setErrorMessage('Invalid Login');
                } else {
                    setErrorMessage('An error occurred during login');
                }
            }
        }

        // Show alert if there's an error message
        if (errorMessage && (Platform.OS === 'ios' || Platform.OS === 'android')) {
            Alert.alert(errorMessage);
        }
    }


    const onForgotPasswordPressed = () => {
        console.warn("Forgotpassword Pressed");
    }

    const onSignUpPressed = () => {
        router.push("/screens/Register")
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            <Stack.Screen
                options={{
                    headerTitle: '',
                    // headerShown: true, //change if you want
                    headerLeft: ({ color }) =>
                        <Pressable
                            onPress={() =>
                                router.push({
                                    pathname: '/',
                                })
                            }>
                            <FontAwesome size={40} name="arrow-circle-o-left" color={color} />
                        </Pressable>
                }}
            />
            <View style={styles.root}>
                <View style={styles.header}>
                    <Image
                        source={logo}
                        style={styles.logo}
                    />
                </View>

                <View style={styles.welcomeBox}>
                    <Text style={styles.welcomeText}>Let's Get Started!</Text>
                </View>

                {/* <View style={[styles.box, errorMessage ? styles.boxWithErrorMessage : null]}> */}
                <View styles={styles.box}>
                    <Text style={styles.text}>Email</Text>
                    <CustomInput
                        style={styles.textFields}
                        placeholder="Email"
                        value={email}
                        setValue={setEmail}
                    />
                    <Text style={styles.text}>Password</Text>
                    <CustomInput
                        placeholder="Password"
                        style={styles.textFields}
                        value={password}
                        setValue={setPassword}
                        secureTextEntry
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
                    {/* <CustomButton
                        text="Create Account"
                        onPress={onSignUpPressed}
                        type="TERTIARY"
                    /> */}
                    <Pressable onPress={onSignUpPressed}>
                        <Text style={styles.loginText}>
                            Dont Have An Account?
                            <Text style={{ color: '#0C4485' }}> Signup Here </Text>
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View>
                {/* {Platform.OS !== 'android' && Platform.OS !== 'ios' && errorMessage !== "" && <Text style={styles.errorMessage}>{errorMessage}</Text>} */}
                {errorMessage !== "" && <Text style={styles.errorMessage}>{errorMessage}</Text>}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#F5F8FE',
    },
    root: {
        justifyContent: 'center',
        flex: 1,
        padding: 50,
        // backgroundColor: '#e0e1dd',
        // paddingBottom: 130,
        // paddingTop: 80,
    },
    header: {
        // backgroundColor: 'blue',
        padding: 40,
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeBox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        paddingBottom: 10,
        fontWeight: 'bold',
        fontSize: 22,
    },
    box: {
        justifyContent: 'center',
        alignItems: 'left',
    },
    boxWithErrorMessage: {
        height: 450,
    },
    logo: {
        height: 100,
        width: 300,
    },
    text: {
        fontWeight: 'bold',
        paddingTop: 10,
    },
    loginText: {
        fontWeight: 'bold',
        padding: 5,
        textAlign: 'center'
    },
    textFields: {
        padding: 10,
        color: '#626262',
        outline: 'none',
        borderWidth: 0,
        borderRadius: 5,
        height: 45
    },
    smallText: {

    },
    errorMessage: {
        backgroundColor: 'red',
        color: 'white',
        paddingTop: '10px',
        paddingBottom: '10px',
        textAlign: 'center',
        justifyContent: 'center'
    }

})

export default Login