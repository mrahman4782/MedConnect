import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, Pressable, TouchableOpacity, Linking } from 'react-native'
import { useRouter, Stack, Link, router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import logo from '../../../assets/MedConnect-12-transparent 2.png';
import EP from '../../../assets/Elizabeth Palacios.png'
import MR from '../../../assets/Mohammad Rahman.png'
import NT from '../../../assets/Namgyal Thily.png'
import YL from '../../../assets/Yeongho Lee.png'
import RY from '../../../assets/Richard Yeung.png'
import backIcon from '../../../assets/back-button-icon-white.png'

const Credit = () => {

    const onHandlePress = (url) => {
        Linking.openURL(url)
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            <Stack.Screen
                options={{
                    headerTitle: '',
                    // headerShown: true, //change if you want
                    headerLeft: ({ color }) =>
                        <Pressable
                            onPress={() =>
                                router.push({
                                    pathname: '/',
                                })
                            }>
                            {/* <FontAwesome size={40} name="arrow-circle-o-left" color={color} /> */}
                            <Image
                                source={backIcon}
                                style={{ height: 50, width: 50 }}
                            />
                        </Pressable>
                }}
            />
            <View style={styles.root}>

                <View style={styles.headerContainer}>
                    <View style={styles.aboutContainer}>
                        <Text style={styles.aboutText}>About</Text>
                    </View>
                    <Image
                        source={logo}
                        style={styles.logo}
                    />
                </View>

                <View style={styles.purposeContainer}>
                    <Text style={styles.purposeText}>The US healthcare system is increasingly burdensome and costly. Medconnect offers a solution by providing a one-stop platform for medical services. Our AI offers reliable medical information, while our integration with Zoc Doc and Google Maps simplifies booking appointments with medical professionals and pharmacies. With Medconnect, access to healthcare is streamlined in one convenient app</Text>
                    <TouchableOpacity onPress={() => onHandlePress('https://github.com/mrahman4782/MedConnect')}>
                        <Text style={styles.linkText}>Github</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.userRightContainer}>
                    <Image
                        source={MR}
                        style={styles.userImage}
                    />
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Mohammad Rahman</Text>
                        <Text>Backend, Firebase, ZocDoc</Text>
                        <TouchableOpacity onPress={() => onHandlePress('https://github.com/mrahman4782')}>
                            <Text style={styles.linkText}>Github</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.userLeftContainer}>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Namgyal Thily</Text>
                        <Text style={{ textAlign: 'right' }}>Chatbot AI</Text>
                        <TouchableOpacity onPress={() => onHandlePress('https://github.com/Namgyal9')}>
                            <Text style={{ ...styles.linkText, textAlign: 'right' }}>Github</Text>
                        </TouchableOpacity>
                    </View>
                    <Image
                        source={NT}
                        style={styles.userImage}
                    />
                </View>
                <View style={styles.userRightContainer}>
                    <Image
                        source={EP}
                        style={styles.userImage}
                    />
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Elizabeth Palacios</Text>
                        <Text>Backend, Frontend UI, Map</Text>
                        <TouchableOpacity onPress={() => onHandlePress('https://github.com/elypalacios')}>
                            <Text style={styles.linkText}>Github</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.userLeftContainer}>
                    <View >
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Yeongho Lee</Text>
                        <Text style={{ textAlign: 'right' }}>Chat Page</Text>
                        <TouchableOpacity onPress={() => onHandlePress('https://github.com/k205leeyh')}>
                            <Text style={{ ...styles.linkText, textAlign: 'right' }}>Github</Text>
                        </TouchableOpacity>
                    </View>
                    <Image
                        source={YL}
                        style={styles.userImage}
                    />
                </View>
                <View style={styles.userRightContainer}>
                    <Image
                        source={RY}
                        style={styles.userImage}
                    />
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Richard Yeung</Text>
                        <Text>Frontend, Debugging</Text>
                        <TouchableOpacity onPress={() => onHandlePress('https://github.com/ryrichard')}>
                            <Text style={styles.linkText}>Github</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#F5F8FE',
    },
    root: {
        alignItems: 'center',
        flex: 1,
        padding: 10,
    },
    aboutContainer: {
        // backgroundColor: 'red',
        alignItems: 'center',
    },
    headerContainer: {
        // backgroundColor: 'pink',
        // justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    aboutText: {
        fontSize: 24,
        paddingBottom: 10,
        fontWeight: 'bold'
    },
    logo: {
        height: 50,
        width: 300,
    },
    bodyContainer: {
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyLeftContainer: {
        // backgroundColor: 'blue',
        marginLeft: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    bodyRightContainer: {
        // backgroundColor: 'green',
        marginRight: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    userImage: {
        width: 110,
        height: 110,
        margin: 10,
    },
    purposeContainer: {
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 20,
        marginVertical: 10,
        width: '90%', // Adjust width to fit different screen sizes
        alignItems: 'center',
        justifyContent: 'center', // Center content vertically
    },
    purposeText: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
    },
    userRightContainer: {
        alignItems: 'center',
        backgroundColor: '#5483B3',
        padding: 20,
        borderRadius: 20,
        marginVertical: 10,
        width: '60%', // Set width to about half the screen
        alignSelf: 'flex-end', // Align the container to the far right
        flexDirection: 'row',
        justifyContent: 'flex-end', // Align 
    },
    userLeftContainer: {
        backgroundColor: 'rgba(5, 38, 89, 0.8)',
        padding: 20,
        borderRadius: 20,
        marginVertical: 10,
        width: '60%',
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default Credit;