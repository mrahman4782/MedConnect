import { useState } from 'react'
import { Text, View, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from '../../components/CustomButton';
import userRegister from '../../functions/register.js';
import { useRouter } from 'expo-router';

const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onRegisterPressed = async () => {
        console.warn("Register Pressed");
        if (email != '' && password != '' && confirmPassword != '') {
            if (password == confirmPassword) {
                let output = await userRegister(email, password);

                if ('status' in output) {
                    if (output.status == 201) {
                        router.push({
                            pathname: "/screens/Chatbot",
                        })
                    }
                    else if (output.status == 500) {
                        setErrorMessage("An error has occured during registration. Please try again later")
                    }
                }
            } else {
                setErrorMessage("Passwords do not match");
            }
        } else {
            setErrorMessage("Please fill in all fields");
        }
    }

    const onSignInPressed = () => {
        router.push("/screens/Login")
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <View style={styles.box}>
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

                    {errorMessage !== "" && <Text style={styles.error}>{errorMessage}</Text>}

                    <CustomButton
                        text="Register"
                        onPress={onRegisterPressed}
                    />

                    <CustomButton
                        text="Have an account? Sign in"
                        onPress={onSignInPressed}
                        type="TERTIARY"
                    />

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
        paddingBottom: 120,
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
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#051C60',
        margin: 10
    },
    error: {
        color: "red",
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
        height: 30
    },
})

export default Register