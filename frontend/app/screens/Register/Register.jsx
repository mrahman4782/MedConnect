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
                <Text style={styles.title}>Registration</Text>

                <CustomInput
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                />
                <CustomInput
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                // secureTextEntry //temperarily commented out
                />
                <CustomInput
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F9FBFC'
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#051C60',
        margin: 10
    },
    error: {
        color: "red",
    }
})

export default Register