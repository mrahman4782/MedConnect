import { Image } from 'react-native';
import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FireBaseConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import homeIcon from '../../assets/home-icon.png'
import userIcon from '../../assets/user-icon.png'


const RootLayout = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
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
                    // tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                    tabBarIcon: () => <Image source={homeIcon} style={{ height: 30, width: 30 }} />,
                    tabBarStyle: { display: !user ? 'none' : 'flex' }
                }}
            />

            <Tabs.Screen
                name="User/[id]"
                options={{
                    headerTitle: "Update your profile",
                    title: "User",
                    headerStyle: {
                        backgroundColor: "#fff",
                        height: 150,

                    },
                    headerTitleStyle: {
                        color: "#000",
                        fontSize: 30,
                        fontWeight: 'bold',
                        marginTop: 20,

                    },
                    // tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                    tabBarIcon: () => <Image source={userIcon} style={{ height: 30, width: 30 }} />,
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