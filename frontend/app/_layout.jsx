import { Stack } from 'expo-router';

const RootLayout = () => {
    return <Stack>
        {/* <Stack.Screen
            name="index"
            options={{
                headerTitle: "Home Page",
                headerStyle: {
                    backgroundColor: "red",
                }
            }}
        />
        <Stack.Screen
            name="screens/User/[id]"
            options={{
                headerTitle: "User Page"
            }}
        /> */}
        <Stack.Screen
            name="(tabs)"
            options={{
                headerShown: false,
            }}
        />
    </Stack>
};

export default RootLayout;