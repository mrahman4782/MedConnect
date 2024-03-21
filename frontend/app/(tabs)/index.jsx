import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { useContext, createContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from "../FireBaseConfig";
import authRequest from '../functions/authRequest';

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

                        <Pressable onPress={() => FIREBASE_AUTH.signOut()} title="Logout" >
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

                        <Pressable
                            onPress={() =>
                                router.push({
                                    pathname: '/screens/Credit',
                                })
                            }
                        >
                            <Text>Credit</Text>
                        </Pressable>
                    </View>
                ) : (
                    <View>
                        <Text>Welcome</Text>
                        <Pressable onPress={() => router.push(`/screens/Login/`)}>
                            <Text>Login</Text>
                        </Pressable>
                        <Pressable
                            onPress={() =>
                                router.push({
                                    pathname: '/screens/Register',
                                })
                            }
                        >
                            <Text>Register</Text>
                        </Pressable>
                    </View>
                )
            )}
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