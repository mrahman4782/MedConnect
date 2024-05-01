import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const CustomButton = ({ onPress, text, type = "PRIMARY" }) => {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.container, styles[`container_${type}`]]}
        >
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 10,
    },

    container_PRIMARY: {

        backgroundColor: '#000000',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        marginVertical: 10,
        backgroundColor: '#19233C',

    },

    container_SECONDARY: {
        borderColor: '#3B71F3',
        borderWidth: 2,
    },

    container_TERTIARY: {},

    text: {
        fontWeight: 'bold',
        color: 'white',
    },

    text_TERTIARY: {
        color: 'white',
        fontSize: 11,
        marginBottom: -90
    },

    text_SECONDARY: {
        color: 'blue',
    },
})

export default CustomButton;