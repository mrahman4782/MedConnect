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
                    headerTitle: "User Details",
                    title: "User",
                    headerStyle: {
                        backgroundColor: "#598392",
                    },
                    headerTitleStyle: {
                        color: "#FFFFFF", 
                      },
                }}
            />
        </Tabs>
    )
}

export default RootLayout;