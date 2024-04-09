import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FireBaseConfig';
import { View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const RootLayout = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            //console.log("user: ", user);
            setUser(user);
            setLoading(false);
        })
    }, [])


    const renderTabs = () => (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    headerTitle: "Home Page",
                    title: "Home",
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: "purple",
                    },
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                    tabBarStyle: { display: !user ? 'none' : 'flex' }
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
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                    tabBarStyle: { display: !user ? 'none' : 'flex' }
                }}
            />
        </Tabs>
    );

    return (
        renderTabs()
    )
}

export default RootLayout;