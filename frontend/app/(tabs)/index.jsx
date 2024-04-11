import { Pressable, Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { Link, router } from "expo-router";
import { useContext, createContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from "../FireBaseConfig";
import authRequest from '../functions/authRequest';
import logoImage from '../../assets/logo1.png';
import logoTransparent from '../../assets/logo1_background_removed(cropped).png'
import sessionStorage from '../functions/sessionStorage.js';

const Homepage = () => {
    // const [isUserLoggedin, setIsUserLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true)

    // get auth request
    // if verified, change available linkes (i.e. if person is signed in, remove the signin and register)
    // useEffect(() => {
    //     //get authentication
    //     const auth = async () => {
    //         //get token

    //         //get authRequest
    //     }

    //     return () => {
    //         console.log("if verified change availble links")
    //     };

    //     async function helper() {
    //         await auth();
    //         setLoading(false)
    //     }

    // }, [])
    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            //console.log("user: ", user);
            setUser(user);
            if (user) {
                console.log("user: ", user);
                setUsername(user.displayName) //need api to get username. or atleast set up displayname
            }
            setLoading(false);
        })
    }, [])

    const onPressFakeLogin = () => {
        // Simulate fake user login
        setUser({}); // Set a dummy user object
        setUsername("Fake User"); // Set a dummy username
        setLoading(true); // Simulate loading state

        // Simulate page refresh after fake user login
        setTimeout(() => {
            setLoading(false); // Turn off loading state
        }, 1000); // Wait for 1 second before refreshing
    };

    const onPressFakeLogout = () => {
        // Simulate fake user logout
        setUser(null); // Set a dummy user object
        setUsername(null);
        setLoading(true); // Simulate loading state

        // Simulate page refresh after fake user login
        setTimeout(() => {
            setLoading(false); // Turn off loading state
        }, 1000); // Wait for 1 second before refreshing
    };

    return (
        <View style={styles.background}>
            <Image
                source={logoTransparent}
                style={styles.logo}
                resizeMode="center"
            />
            {loading ? (<Text>Loading...</Text>
            ) : (
                user ? (
                    //logged in users
                    <View style={styles.login}>
                        {/* <Image
                            source={logoTransparent}
                            style={styles.logo}
                            resizeMode="contain"
                        /> */}
                        {username != null && <Text style={{ paddingBottom: 10, fontSize: 20, color: 'skyblue' }}>Welcome, {username}</Text>}
                        <Pressable
                            style={styles.chatButton}
                            onPress={() =>
                                router.push({
                                    pathname: '/screens/Chatbot',
                                })
                            }
                        >
                            <Text style={styles.chatButtonText}>ChatBot</Text>
                        </Pressable>

                        <Pressable
                            style={styles.mapButton}
                            onPress={() =>
                                router.push({
                                    pathname: '/screens/Map',
                                })
                            }
                        >
                            <Text style={styles.mapButtonText}>Map</Text>
                        </Pressable>

                        <Pressable
                            style={styles.mapButton}
                            onPress={() =>
                                router.push({
                                    pathname: '/screens/TestPage',
                                })
                            }
                        >
                            <Text style={styles.mapButtonText}>Test</Text>
                        </Pressable>

                        <Pressable
                            style={styles.logoutButton}
                            onPress={() => { FIREBASE_AUTH.signOut(), sessionStorage.setSessionKey(''); }} title="Logout" >
                            <Text style={styles.logoutButtonText}>Logout</Text>
                        </Pressable>

                        <Pressable
                            style={styles.logoutButton}
                            onPress={onPressFakeLogout}>
                            <Text style={styles.logoutButtonText}>Fake Logout</Text>
                        </Pressable>

                        {/* <Pressable
                            onPress={() =>
                                router.push({
                                    pathname: '/screens/Credit',
                                })
                            }
                        >
                            <Text>Credit</Text>
                        </Pressable> */}
                    </View>
                ) : (
                    // logged out users
                    <View style={styles.logout}>
                        {/* <Image
                            source={logoTransparent}
                            style={styles.logo}
                            resizeMode="contain"
                        /> */}

                        <Pressable style={styles.loginButton} onPress={() => router.push(`/screens/Login/`)}>
                            <Text style={styles.loginButtonText}>L O G I N</Text>
                        </Pressable>

                        <Pressable style={styles.registerButton} onPress={() => router.push({ pathname: '/screens/Register' })}>
                            <Text style={styles.registerButtonText}>R E G I S T E R</Text>
                        </Pressable>

                        <Pressable style={styles.loginButton} onPress={onPressFakeLogin}>
                            <Text style={styles.loginButtonText}>Fake Login</Text>
                        </Pressable>
                    </View>
                )
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    root: {

        backgroundColor: '#F9FBFC'
    },
    logo: {
        marginTop: 100,
        height: 350,
        width: 500
    },
    background: {
        flex: 1,
        backgroundColor: '#000080',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        alignItems: 'center',
        flex: 1,
        padding: 20,
        paddingBottom: 130,
        paddingTop: 80
    },
    // background_notLoggedIn: {
    //     flex: 1,
    //     backgroundColor: '#598392',
    //     justifyContent: 'center', // centers vertically
    //     alignItems: 'center',
    // },
    // background_LoggedIn: {
    //     flex: 1,
    //     backgroundColor: '#598392',
    //     justifyContent: 'center', // Start aligning content from the top
    //     alignItems: 'center',
    //     paddingTop: '10%', // Adjust this value based on the desired starting point of your content
    // },
    login: {
        marginBottom: 200,
    },
    logout: {
        marginBottom: 300,
    },
    loginButton: {
        backgroundColor: '#0a0a0a',
        padding: 10,
        margin: 5,
        width: 250,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    registerButton: {
        backgroundColor: '#f5f0f0',
        padding: 10,
        margin: 5,
        width: 250,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerButtonText: {
        color: '#000000',
        fontSize: 12,
    },
    chatButton: {
        backgroundColor: '#7da2a9',
        padding: 10,
        margin: 5,
        width: 250,
        height: 50,
        borderRadius: 5,
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center', // Center text vertically
    },
    chatButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    mapButton: {
        backgroundColor: '#41636c',
        padding: 10,
        margin: 5,
        width: 250,
        height: 50,
        borderRadius: 5,
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center', // Center text vertically
    },
    mapButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#3c4a50',
        padding: 10,
        margin: 5,
        width: 250,
        height: 50,
        borderRadius: 5,
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center', // Center text vertically
    },
    logoutButtonText: {
        color: '#ffffff', // White for contrast
        fontSize: 16,
    }

})

export default Homepage;