import { useState } from 'react'
import { Text, View, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from '../../components/CustomButton';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const onSendPressed = () => {
        console.warn("Confirm Pressed");
    }

    const onSignInPressed = () => {
        console.warn("Signin Pressed")
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Reset your Password</Text>
                <Text>Email</Text>
                <CustomInput
                    placeholder="Enter your email"
                    value={email}
                    setValue={setEmail}
                // secureTextEntry
                />
                <CustomButton
                    text="Send"
                    onPress={onSendPressed}
                />

                <CustomButton
                    text="Back to Sign in"
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

export default ForgotPassword