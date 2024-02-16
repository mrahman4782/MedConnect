import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link, router } from "expo-router";

const Homepage = () => {
    const id = 1
    return (
        <View style={styles.root}>
            <Text>Homepage</Text>
            <Link href="/Map/MapPage">Map</Link>
            <Pressable onPress={() => router.push(`/screens/Login/Login/`)}>login</Pressable>
            <Pressable onPress={() => router.push(`/screens/Register/Register/`)}>register</Pressable>
            <Pressable onPress={() => router.push(`/screens/User/${id}`)}>
                <Text>User 1</Text>
            </Pressable>
            <Link href="/Credit/CreditPage">Credit</Link>
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