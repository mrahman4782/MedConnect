import { Pressable, Text, View, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView } from "react-native";
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
import { Dimensions, Platform } from 'react-native';


const Homepage = () => {

    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true)
    const [animationPlayed, setAnimationPlayed] = useState(true)



    useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
        setDimensions(window);
    });

    // Return a clean-up function that removes the event listener
    return () => subscription.remove();
    }, []);



    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
            if (user) {
                setUsername(user.displayName) //need api to get username. or atleast set up displayname
            }
            setLoading(false);
        })
    }, [])

    const dynamicStyles = {
        gridOption: {
            width: dimensions.width > 600 ? '32%' : '43%',
            height: dimensions.width > 600 ? '42%' : '33%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 18,
            margin: 12,
            paddingTop: 30,
            paddingBottom: 30,
            paddingLeft: dimensions.width > 992 ? 30 : dimensions.width > 768 ? 25 : dimensions.width > 600 ? 20 : 10,
            paddingRight: dimensions.width > 992 ? 30 : dimensions.width > 768 ? 25 : dimensions.width > 600 ? 20 : 10,
        },
        optionText: {
            color: '#fff',
            marginTop: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: dimensions.width > 992 ? 30 : dimensions.width > 768 ? 28 : dimensions.width > 600 ? 25 : 20,
        },
        logoutButton: {
            backgroundColor: '#2B4F7A',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            alignSelf: 'center',
            width: dimensions.width > 992 ? '65%' : dimensions.width > 768 ? '70%' : dimensions.width > 600 ? '75%': '90%',
            height: dimensions.width > 768 ? '20%' : 70,
            marginTop: 20,
        },
    };



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
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.safeArea}>
                    <StatusBar barStyle="light-content" backgroundColor="#19233C" />
                    <View style={styles.container}>
                    <View style={styles.headerContainer}>
                      <Text style={styles.headerText}>Let's find the medical help you need</Text>
                      </View>

                      <View style={styles.gridContainer}> 
                      <Pressable style={[dynamicStyles.gridOption, { backgroundColor: '#052659' }]} 
                       onPress={() =>
                        router.push({
                            pathname: '/screens/Chatbot',
                        })
                      }
                      >
                        <FontAwesome5 name='comments' size={35} color="white" solid />
                        <Text style={dynamicStyles.optionText}> Chat With AI Doctor </Text>
                        </Pressable>

                        
                        <Pressable style={[dynamicStyles.gridOption, { backgroundColor: '#7DA0CA' }]} 
                          onPress={() =>
                              router.push({
                                pathname: '/screens/Map',
                              })
                            }
                    >
                        <FontAwesome5 name='search' size={35} color="white" solid />
                        <Text style={dynamicStyles.optionText}> Find Affordable Treatment </Text>
                        </Pressable>

                        <Pressable style={[dynamicStyles.gridOption, { backgroundColor: '#4FA2D3' }]} 
                         onPress={() =>
                            router.push({
                              pathname: '/User/[id]',
                            })
                          }
                        >
                         <FontAwesome5 name='user-edit' size={35} color="white" solid />

                        <Text style={dynamicStyles.optionText}> Update Account </Text>
                        </Pressable>

                        <Pressable style={[dynamicStyles.gridOption, { backgroundColor: '#5483B3' }]} 
                            onPress={() =>
                            router.push({
                                pathname: '/screens/Credit/Credit',
                            })
                            }
                        >
                         <FontAwesome5 name='info-circle' size={35} color="white" solid />

                        <Text style={dynamicStyles.optionText}> About MedConnect </Text>
                        </Pressable>

                        <Pressable
                        style={dynamicStyles.logoutButton}
                        onPress={() => { FIREBASE_AUTH.signOut(), sessionStorage.setSessionKey(''); }} title="Logout" >
                       <Text  style={styles.logoutButtonText}> Logout</Text>
                     </Pressable>


                      </View>

                     
                     </View>

                
            </SafeAreaView>
            </ScrollView>


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
        flex: 1,
        alignSelf: 'center',
    },

    logoutButton: {
        backgroundColor: '#2B4F7A',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',  
        width:  '75%',      
        height: 70,
        bottom: 10, 
        marginTop:20,

    },

    logoutButtonText: {
        color: '#ffffff', 
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center', 

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
        paddingVertical: 10,
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
        paddingHorizontal: 10, // Adjust this for desired padding on the sides
    },

 ////////

//       gridContainer: {
//         flex: 1,
//         flexDirection : 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-around',
//         marginBottom: 30,
//         paddingHorizontal: 10, 
//         paddingTop: 10, 
//       },

//    gridOption: {
//         width:'43%',
//         aspectRatio: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 18,
//         paddingTop: 25,
//         paddingLeft:10,
//         paddingRight:10,
//         margin: 12,
//       },
    ///////////

    gridContainer: {
    flex: 1,
    flexDirection : 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingHorizontal: 10, 
    justifyContent: 'center',
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