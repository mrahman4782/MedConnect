import { useState } from 'react'
import { Text, View, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from '../../components/CustomButton';

const ResetPassword = () => {
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitPressed = () => {
        console.warn("Submit Pressed");
    }

    const onSignInPressed = () => {
        console.warn("Signin Pressed")
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Reset your Password</Text>

                <CustomInput
                    placeholder="code"
                    value={code}
                    setValue={setCode}
                // secureTextEntry
                />
                <CustomInput
                    placeholder="password"
                    value={password}
                    setValue={setPassword}
                // secureTextEntry
                />
                <CustomButton
                    text="Submit"
                    onPress={onSubmitPressed}
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

export default ResetPassword