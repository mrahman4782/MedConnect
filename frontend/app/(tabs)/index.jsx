import { Pressable, Text, View, StyleSheet, Image, SafeAreaView, StatusBar } from "react-native";
import { Link, router } from "expo-router";
import { useContext, createContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from "../FireBaseConfig";
import authRequest from '../functions/authRequest';
import sessionStorage from '../functions/sessionStorage.js';
import LottieView from 'lottie-react-native'
import logoT from '../../assets/logo_transparent.png'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



const Homepage = () => {
    // const [isUserLoggedin, setIsUserLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true)
    const [animationPlayed, setAnimationPlayed] = useState(true)

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            //console.log("user: ", user);
            setUser(user);
            if (user) {
                // console.log("username: ", user.displayName);
                setUsername(user.displayName) //need api to get username. or atleast set up displayname
            }
            setLoading(false);
        })
    }, [])


    return (
        <View style={styles.background}>
            {animationPlayed ? (
                <View style={styles.animationStyle}>
                    <LottieView
                        source={require('../../assets/Test1.json')}
                        autoPlay
                        loop={false}
                        onAnimationFinish={() => setAnimationPlayed(false)}
                    />
                </View>
            ) : loading ? (
                <Text>Loading...</Text>


            ) : user ? ( // When user is logged in

                <SafeAreaView style={styles.safeArea}>
                    <StatusBar barStyle="light-content" backgroundColor="#19233C" />
                    <View style={styles.container}>
                    <View style={styles.headerContainer}>
                      <Text style={styles.headerText}> Let's find you medical help</Text>
                      </View>

                      <View style={styles.gridContainer}> 
                      <Pressable style={[styles.gridOption, { backgroundColor: '#052659' }]} 
                       onPress={() =>
                        router.push({
                            pathname: '/screens/Chatbot',
                        })
                      }
                      >
                        <FontAwesome5 name='comments' size={35} color="white" solid />
                        <Text style={styles.optionText}> Chat With AI Doctor </Text>
                        </Pressable>

                        
                        <Pressable style={[styles.gridOption, { backgroundColor: '#7DA0CA' }]} 
                          onPress={() =>
                              router.push({
                                pathname: '/screens/Map',
                              })
                            }
                    >
                        <FontAwesome5 name='search' size={35} color="white" solid />
                        <Text style={styles.optionText}> Find Affordable Treatment </Text>
                        </Pressable>

                        <Pressable style={[styles.gridOption, { backgroundColor: '#4FA2D3' }]} 
                         onPress={() =>
                            router.push({
                              pathname: '/User',
                            })
                          }
                        >
                         <FontAwesome5 name='user-edit' size={35} color="white" solid />

                        <Text style={styles.optionText}> Update Account </Text>
                        </Pressable>

                        <Pressable style={[styles.gridOption, { backgroundColor: '#5483B3' }]} 
                        >
                         <FontAwesome5 name='info-circle' size={35} color="white" solid />

                        <Text style={styles.optionText}> About MedConnect </Text>
                        </Pressable>
                      </View>

                      <View>
                     <Pressable
                        onPress={() => { FIREBASE_AUTH.signOut(), sessionStorage.setSessionKey(''); }} title="Logout" >
                       <Text> Logout</Text>
                     </Pressable>
                     </View>

                      </View>
            </SafeAreaView>


            ) : ( // When no user is logged in
                <View style={styles.background}>
                    <View style={styles.logoContainer}> 
                    <Image
                        source={logoT}
                        style={styles.logoT}
                        resizeMode="center"
                    />
                    </View>
                    <View style={styles.logout}>
                        <Pressable style={styles.loginButton} onPress={() => router.push(`/screens/Login/`)}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </Pressable>
                        <Pressable style={styles.registerButton} onPress={() => router.push({ pathname: '/screens/Register' })}>
                            <Text style={styles.registerButtonText}>Sign Up </Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </View>
    )
    
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#F9FBFC'
    },

    background: {
        flex: 1,
        backgroundColor: '#F5F8FE',
    },
    // box: {
    //     alignItems: 'center',
    //     flex: 1,
    //     padding: 20,
    //     paddingBottom: 130,
    //     paddingTop: 80
    // },

    animationStyle: {
        flex: 1
    },
    login: {
        marginBottom: 200,
    },
    logout: {
        marginBottom: 400,
   
    },
    loginButton: {
        backgroundColor: '#19233C',
        padding: 15, 
        marginVertical: 5, 
        alignItems: 'center',
        borderRadius: 10,
        width: '95%', 
        alignSelf: 'center',
        height:70, 

    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',

    },
    registerButton: {
        backgroundColor: '#19233C', 
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 10,
        width: '95%',
        alignSelf: 'center',
        height:70, 

    },
    registerButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',

    },
    
    logoutButton: {
        backgroundColor: '#3c4a50',

        width: 250,
        height: 50,
        borderRadius: 5,
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    logoutButtonText: {
        color: '#ffffff', 
        fontSize: 16,
    },

/////////////////////////////

    safeArea: {
        flex: 1,
        backgroundColor: '#19233C'
    },

    container: {
        flex: 1,
        backgroundColor: '#F5F8FE',
    },

    headerContainer: {
        backgroundColor: '#19233C', 
        width: '100%',
        marginBottom: 50,
        borderBottomRightRadius: 20, 
        borderBottomLeftRadius: 20, 
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
      },
      
      headerText: {
        fontSize: 40,
        color: '#fff',
        fontWeight: 'semi-bold',
        marginTop: 80, 
        marginBottom: 100,
        letterSpacing: -0.5,
        textAlign: 'left',
    },

      gridContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: 30,
        paddingHorizontal: 10, 
        paddingTop: 10, 
      },

      gridOption: {
        width: '42%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        padding: 20,
        margin: 10,
      },

      optionText: {
        color: '#fff',
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold',
      },

      centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

      logoContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      logoT: {
        resizeMode: 'cover', 
        width: 900, // Adjust the width to match the design
        height: 500, // Adjust the height to maintain aspect ratio
        alignSelf: 'center', // Center logo horizontally
    },
  
})




export default Homepage;