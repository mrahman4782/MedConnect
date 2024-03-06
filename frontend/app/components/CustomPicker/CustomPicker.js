import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView, View, Text, TextInput, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';

const CustomPicker = ({ items }) => {
    const [selectedValue, setSelectedValue] = useState();
    return (
        <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
            }
        >

            {items.map((item, index) => (
                <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
        </Picker>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#E8E8E8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    input: {
        // backgroundColor: 'white'
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        marginTop: 10
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


export default CustomPicker