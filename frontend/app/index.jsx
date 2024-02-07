import { Pressable, Text, View } from "react-native";
import { Link, router } from "expo-router";

const Homepage = () => {
    const id = 1
    return (
        <View>
            <Text>Homepage</Text>
            <Link href="/Map/MapPage">Map</Link>
            <Pressable onPress={() => router.push(`/user/${id}`)}>
                <Text>User 1</Text>
            </Pressable>
        </View>
    )
}

export default Homepage;