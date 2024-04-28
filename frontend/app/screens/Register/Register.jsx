import { useState } from 'react'
import { Button, Pressable, Platform, Alert, Text, View, StyleSheet, ScrollView, Image } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from '../../components/CustomButton';
import userRegister from '../../functions/register.js';
import { useRouter, Stack } from 'expo-router';
import logo from '../../../assets/MedConnect-12-transparent 2.png';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
                    // headerShown: false,
                    headerTitle: '',
                    // headerLeft: () => <Button onPress={() => setCount(c => c + 1)} title="Update count" />,
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
                        style={styles.textFields}
                        placeholder="Password"
                        value={password}
                        setValue={setPassword}
                        secureTextEntry //temperarily commented out
                    />
                    <Text style={styles.text}>Confirm Password</Text>
                    <CustomInput
                        style={styles.textFields}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        secureTextEntry
                    />

                    <CustomButton
                        text="Register"
                        onPress={onRegisterPressed}
                    />

                    <Pressable onPress={onSignInPressed}>
                        <Text style={styles.loginText}>
                            Already Have An Account?
                            <Text style={{ color: '#0C4485' }}> Login Here </Text>
                        </Text>
                    </Pressable>
                    {/* <CustomButton
                        text="Have an account? Sign in"
                        onPress={onSignInPressed}
                        type="TERTIARY"
                    /> */}
                </View>
            </View>
            <View>
                {Platform.OS !== 'android' && Platform.OS !== 'ios' && errorMessage !== "" && <Text style={styles.errorMessage}>{errorMessage}</Text>}
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    viewScroll: {
        flex: 1,
        backgroundColor: '#F5F8FE',
    },
    root: {
        // alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 50,
        // backgroundColor: '#e0e1dd',
        // paddingBottom: 120,
        // paddingTop: 80
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
    logo: {
        height: 100,
        width: 300,
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
    headerText: {
        fontSize: 36,
        paddingLeft: 5,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 50,
        paddingBottom: 5,
        textAlign: 'center',

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
})

export default Register