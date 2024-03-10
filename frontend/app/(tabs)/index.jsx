import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { useContext, createContext, useEffect, useState } from "react";

import authRequest from '../functions/authRequest';
// import Login from "../screens/Login";
// import Register from '../screens/Register';
// import Chatbot from '../screens/Chatbot';
// import ConfirmAccount from "../screens/ConfirmAccount";
// import ForgotPassword from "../screens/ForgotPassword";
// import ResetPassword from "../screens/ResetPassword";


const Homepage = () => {
    const [isUserLoggedin, setIsUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true)

    // get auth request
    // if verified, change available linkes (i.e. if person is signed in, remove the signin and register)
    useEffect(() => {
        //get authentication
        const auth = async () => {
            //get token

            //get authRequest
        }

        return () => {
            console.log("if verified change availble links")
        };

        async function helper() {
            await auth();
            setLoading(false)
        }

    }, [])

    return (
        <View style={styles.root}>
            <Text>Homepage</Text>

            <Link href="screens/Map/Map">Map</Link>

            <Pressable
                onPress={() =>
                    router.push(`/screens/Login/`)}>
                <Text>login</Text>
            </Pressable>
            <Pressable
                onPress={() =>
                    router.push(`/screens/Chatbot/`)}>
                <Text>Chatbot</Text>
            </Pressable>
            <Pressable
                onPress={() =>
                    router.push({
                        pathname: "/screens/Register",
                    })}>
                <Text>register</Text>
            </Pressable>

            <Pressable onPress={() =>
                router.push({
                    pathname: "(tabs)/User/[id]",
                    params: { id: 1 }
                })}>
                <Text>User</Text>
            </Pressable>

            <Pressable onPress={() =>
                router.push({
                    pathname: "/screens/Credit",
                    params: { id: 1 }
                })}>
                <Text>Credit</Text>
            </Pressable>

            {/* <Navigation /> */}

            {/* <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ConfirmAccount" component={ConfirmAccount} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F9FBFC'
    }
})

export default Homepage;