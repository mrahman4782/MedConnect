import { Pressable, Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { Link, router } from "expo-router";
import { useContext, createContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from "../FireBaseConfig";
import authRequest from '../functions/authRequest';
import logoImage from '../../assets/logo1.png';
import logoTransparent from '../../assets/logo1_background_removed.png'
import sessionStorage from '../functions/sessionStorage.js';

// const Stack = createNativeStackNavigator();
// const InsideStack = createNativeStackNavigator();

// function InsideLayout() {
//     return (
//         <InsideStack.Navigator>
//             <InsideStack.Screen name="Example" component={List} />
//         </InsideStack.Navigator>

//     )
// }

const Homepage = () => {
    // const [isUserLoggedin, setIsUserLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
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
            console.log("user: ", user);
            setUser(user);
            setLoading(false);
        })
    }, [])

    return (
        <View>
            {loading ? (<Text>Loading...</Text>
            ) : (
                user ? (
                    <View>
                        <Text>Welcome, user</Text>
                        <Pressable
                            onPress={() =>
                                router.push({
                                    pathname: '/screens/Chatbot',
                                })
                            }
                        >
                            <Text>ChatBot</Text>
                        </Pressable>

                        <Pressable onPress={() => {FIREBASE_AUTH.signOut(), sessionStorage.setSessionKey('');}} title="Logout" >
                            <Text>Logout</Text>
                        </Pressable>

                        <Pressable
                            onPress={() =>
                                router.push({
                                    pathname: '/screens/Map',
                                })
                            }
                        >
                            <Text>Map</Text>
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
                    <View style={styles.background_notLoggedIn}>
                        <Image
                            source={logoTransparent}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Pressable style={styles.loginButton} onPress={() => router.push(`/screens/Login/`)}>
                            <Text style={styles.loginButtonText}>L O G I N</Text>
                        </Pressable>
                        <Pressable style={styles.registerButton} onPress={() => router.push({pathname: '/screens/Register'})}>
                            <Text style={styles.registerButtonText}>R E G I S T E R</Text>
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
        height: 350,
        width: 400
    },
    background_notLoggedIn : {
        flex: 1,
        backgroundColor: '#598392',
        justifyContent: 'center', // centers vertically
        alignItems: 'center',
        
    },
    loginButton: {
        backgroundColor: '#0a0a0a',
        padding: 20,
        width: 250,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 110,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    registerButton: {
        backgroundColor: '#f5f0f0',
        padding: 20,
        width: 250,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 7,
        marginBottom: 400
    },
    registerButtonText: {
        color: '#000000',
        fontSize: 12,
    },
    
})

export default Homepage;