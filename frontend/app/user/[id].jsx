import { View, Text } from "react-native";
import { Stack, useRouter, useSearchParams, useLocalSearchParams, useGlobalSearchParams } from 'expo-router'

const UserPage = ({ id }) => {
    return (
        <View>
            <Text>This is userpage {id}</Text>
        </View>
    )
}

export default UserPage;