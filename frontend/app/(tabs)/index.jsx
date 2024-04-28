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
import logoT from '../../assets/MedConnect-12-transparent 2.png'
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
                              pathname: '/User/[id]',
                            })
                          }
                        >
                         <FontAwesome5 name='user-edit' size={35} color="white" solid />

                        <Text style={styles.optionText}> Update Account </Text>
                        </Pressable>

                        <Pressable style={[styles.gridOption, { backgroundColor: '#5483B3' }]} 
                            onPress={() =>
                            router.push({
                                pathname: '/screens/Credit/Credit',
                            })
                            }
                        >
                         <FontAwesome5 name='info-circle' size={35} color="white" solid />

                        <Text style={styles.optionText}> About MedConnect </Text>
                        </Pressable>

                        <Pressable
                        style={styles.logoutButton}
                        onPress={() => { FIREBASE_AUTH.signOut(), sessionStorage.setSessionKey(''); }} title="Logout" >
                       <Text  style={styles.logoutButtonText}> Logout</Text>
                     </Pressable>


                      </View>

                     
                     </View>

                
            </SafeAreaView>


            ) : ( // When no user is logged in
                <View style={styles.root}>
                    <View style={styles.headerlogo}> 
                    <Image
                        source={logoT}
                        style={styles.logoT}
                    />
                    </View>

                   
                    <View style={styles.container2}>
                        <Pressable style={styles.Button} onPress={() => router.push(`/screens/Login/`)}>
                            <Text style={styles.ButtonText}>Login</Text>
                    
                        </Pressable>
                        <Pressable style={styles.Button} onPress={() => router.push({ pathname: '/screens/Register' })}>
                            <Text style={styles.ButtonText}>Sign Up </Text>
                        </Pressable>
                    </View> 
                </View>
            )}
        </View>
    )
    
}

const styles = StyleSheet.create({
  
    background: {
        flex: 1,
        backgroundColor: '#F5F8FE',
    },

    animationStyle: {
        flex: 1
    },

    logoutButton: {
        backgroundColor: '#2B4F7A',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',  
        width: '93%',
        height: 70,
        bottom: 10, 
        marginTop:20,
      
    },
    logoutButtonText: {
        color: '#ffffff', 
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center', // Center the text horizontally

    },

    
    Button: {
        borderRadius: 10,
        backgroundColor: '#19233C',
        marginVertical: 15, 
        alignItems: 'center',
        justifyContent: 'center', 
        width: '95%', 
        alignSelf: 'center',
        height:70, 
        
        

    },
    ButtonText: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold',

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
        marginBottom: 40,
        borderBottomRightRadius: 20, 
        borderBottomLeftRadius: 20, 
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
      },
      
      headerText: {
        fontSize: 40,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 80, 
        marginBottom: 70,
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
        width: '43%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        paddingTop: 25,
        paddingLeft:10,
        paddingRight:10,
        margin: 12,
      },

      optionText: {
        color: '#fff',
        marginTop: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
      },

      centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

      root: {
        justifyContent: 'center',
        paddingTop: 70,
        flex: 1,
    },

        headerlogo: {
        // padding: 40,
        marginTop: 100,
        width: '100%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
      },
  
      logoT: {
        height: 100,
        width: 430,
},

    container2: {
        flex: 1,
        backgroundColor: '#F5F8FE',
        marginTop: 60,
    },


})




export default Homepage;