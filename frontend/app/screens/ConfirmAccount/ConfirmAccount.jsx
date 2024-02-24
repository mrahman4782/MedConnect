import { useState } from 'react'
import { Text, View, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from '../../components/CustomButton';

const ConfirmAccount = () => {
    const [code, setCode] = useState("");

    const onConfirmPressed = () => {
        console.warn("Confirm Pressed");
    }

    const onSignInPressed = () => {
        console.warn("Signin Pressed")
    }

    const onResendPressed = () => {
        console.warn("Resend Pressed")
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Confirm Account</Text>
                {/* 
                <CustomInput
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                /> */}
                <CustomInput
                    placeholder="Enter your confirmation code"
                    value={code}
                    setValue={setCode}
                // secureTextEntry
                />
                <CustomButton
                    text="Confirm"
                    onPress={onConfirmPressed}
                />

                <CustomButton
                    text="Resend Code"
                    onPress={onResendPressed}
                    type="SECONDARY"
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

export default ConfirmAccount