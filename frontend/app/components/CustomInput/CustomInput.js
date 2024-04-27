import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';

//const API_ENDPOINT = "https://randomuser.me/api/?results=30" //for testing only

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, keyboardType, maxLength, query, style }) => {

    // [value, setValue] = useState("");

    onHandleChange = (text) => {
        if (keyboardType === "numeric") {
            //replace all nonnumeric value to ''
            const numericValue = text.replace(/[^0-9]/g, '');
            setValue(numericValue);
        }
        else {
            setValue(text)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                value={value}
                onChangeText={onHandleChange}
                placeholder={placeholder}
                style={[styles.input, style]}
                secureTextEntry={secureTextEntry}
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={keyboardType}
                maxLength={maxLength}
            // onChangeText={(query) => handleSearch(query)}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#E8E8E8',
        borderRadius: 4
    },
    input: {
        // backgroundColor: 'white'
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    textName: {
        fontSize: 17,
        marginLeft: 10,
        fontWeight: "600"
    },
    textLocation: {
        fontSize: 14,
        marginLeft: 10,
        color: "grey"
    }
})


export default CustomInput