import { Tabs } from 'expo-router';

const RootLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    headerTitle: "Home Page",
                    title: "Home",
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: "purple",
                    }
                }}
            />

            <Tabs.Screen
                name="User/[id]"
                options={{
                    headerTitle: "User Page",
                    title: "User"
                }}
            />
        </Tabs>
    )
}

export default RootLayout;