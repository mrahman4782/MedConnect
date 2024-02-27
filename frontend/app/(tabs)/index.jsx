// import Navigation from "./navigation"; //not useful for expo

import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import ConfirmAccount from "../screens/ConfirmAccount";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import Login from "../screens/Login";
import Register from '../screens/Register';


const Homepage = () => {
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

            <Link href="/Credit/CreditPage">Credit</Link>

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