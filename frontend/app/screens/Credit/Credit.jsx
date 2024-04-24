import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import tempLogo from '../../../assets/icon.png'
const Credit = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Credits</Text>
            <View style={styles.creditBox}>
                <Image
                    source={tempLogo}
                    style={styles.logo}
                    resizeMode="center" />
                <Text style={styles.creditText}>Person 1</Text>
                <Text style={styles.creditLink}>Contact</Text>
            </View>
            <View style={styles.creditBox}>
                <Image
                    source={tempLogo}
                    style={styles.logo}
                    resizeMode="center" />
                <Text style={styles.creditText}>Person 2</Text>
                <Text style={styles.creditLink}>Contact</Text>
            </View>
            <View style={styles.creditBox}>
                <Image
                    source={tempLogo}
                    style={styles.logo}
                    resizeMode="center" />
                <Text style={styles.creditText}>Person 3</Text>
                <Text style={styles.creditLink}>Contact</Text>
            </View>
            <View style={styles.creditBox}>
                <Image
                    source={tempLogo}
                    style={styles.logo}
                    resizeMode="center" />
                <Text style={styles.creditText}>Person 4</Text>
                <Text style={styles.creditLink}>Contact</Text>
            </View>
            <View style={styles.aboutBox}>
                <Text style={styles.aboutText}>This is a group project created with HealthCare in mind</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000080',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    logo: {
        marginRight: 200,
        height: 100,
        width: 100
    },
    headerText: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20
    },
    creditBox: {
        flex: 1,
        backgroundColor: '#000090',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    aboutBox: {
        backgroundColor: '#000080',
        width: '90%',
        padding: 20,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center'
    },
    creditText: {
        fontSize: 18,
        color: 'white'
    },
    creditLink: {
        fontSize: 16,
        color: '#1E90FF',
        textDecorationLine: 'underline',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    aboutText: {
        fontSize: 16,
        color: 'white'
    }
});

export default Credit;