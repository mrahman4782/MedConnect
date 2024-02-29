import { useState } from 'react'
import { Text, View, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from '../../components/CustomButton';

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")

    const onRegisterPressed = () => {
        console.warn("Register Pressed");
    }

    const onSignInPressed = () => {
        console.warn("Signin Pressed");
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
    }
})

export default Register