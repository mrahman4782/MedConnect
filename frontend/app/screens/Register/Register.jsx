import { useState } from 'react'
import { Platform, Alert, Text, View, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from '../../components/CustomButton';
import userRegister from '../../functions/register.js';
import { useRouter, Stack } from 'expo-router';

const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onRegisterPressed = async () => {
        // console.warn("Register Pressed");
        // if (email != '' && password != '' && confirmPassword != '') {
        //     if (password == confirmPassword) {
        //         let output = await userRegister(email, password);
        //         if ('status' in output) {
        //             if (output.status == 201) {
        //                 router.push({
        //                     pathname: "/screens/Chatbot",
        //                 })
        //             }
        //             else if (output.status == 500) {
        //                 setErrorMessage("An error has occured during registration. Please try again later")
        //             }
        //         }
        //     } else {
        //         setErrorMessage("Passwords do not match");
        //     }
        // } else {
        //     setErrorMessage("Please fill in all fields");
        // }
        if (email === '' || password === '' || confirmPassword === '') {
            setErrorMessage("Please fill in all fields");
        } else if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
        } else {
            try {
                let result = await userRegister(email, password);
                console.log("Result: ", result)
                router.push({
                    pathname: "/"
                })
                return;
            } catch (error) {
                if (error.message === "Request failed with status code 403") {
                    setErrorMessage("Email already registered")
                }
                else {
                    setErrorMessage("An error has occured during registration. Please try again later")
                }
            }

        }
        if (errorMessage && (Platform.OS === 'ios' || Platform.OS === 'android')) {
            Alert.alert(errorMessage);
        }
    }


    const onSignInPressed = () => {
        router.push("/screens/Login")
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.viewScroll}>
            <Stack.Screen
                options={{
                    headerShown: false,
                    headerTitle: 'Registration',
                }}
            />
            <View style={styles.root}>
                <View style={[styles.box, errorMessage ? styles.boxWithErrorMessage : null]}>
                    <Text style={styles.loginText}>R E G I S T E R</Text>

                    <CustomInput
                        style={styles.textFields}
                        placeholder="Email"
                        value={email}
                        setValue={setEmail}
                    />
                    <CustomInput
                        style={styles.textFields}
                        placeholder="Password"
                        value={password}
                        setValue={setPassword}
                    // secureTextEntry //temperarily commented out
                    />
                    <CustomInput
                        style={styles.textFields}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                    // secureTextEntry 
                    />

                    <CustomButton
                        text="Register"
                        onPress={onRegisterPressed}
                    />

                    <CustomButton
                        text="Have an account? Sign in"
                        onPress={onSignInPressed}
                        type="TERTIARY"
                    />

                    {Platform.OS !== 'android' && Platform.OS !== 'ios' && errorMessage !== "" && <Text style={styles.errorMessage}>{errorMessage}</Text>}


                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewScroll: {
        flex: 1,
        backgroundColor: '#000080',
    },
    root: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 200,
        // backgroundColor: '#e0e1dd',
        // paddingBottom: 120,
        // paddingTop: 80
    },
    box: {
        backgroundColor: '#598392',
        padding: 40,
        width: 300,
        height: 400,
        borderRadius: 20,
        alignContent: 'center'
    },
    boxWithErrorMessage: {
        height: 450, // Adjust this value based on your requirements
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#051C60',
        margin: 10
    },
    errorMessage: {
        backgroundColor: 'red',
        color: 'white',
        paddingTop: '10px',
        paddingBottom: '10px',
        textAlign: 'center',
        justifyContent: 'center'
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
        padding: 10,
        color: '#757474',
        outline: 'none',
        borderWidth: 0,
        borderRadius: 5,
        height: 35
    },
})

export default Register