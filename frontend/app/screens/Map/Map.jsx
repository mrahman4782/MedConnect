import { useState } from 'react';
import { Text, View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/icon.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const Map = () => {
    const {height} = useWindowDimensions();
    const [locationName, setLocationName] = useState("");
    const onPressSearch = () => {
        console.warn("Searching")
    }

    return (
        <View style={styles.root}>
            <Image
                source={Logo}
                style={styles.map, {height: height * 0.3}} 
                resizeMode="contain"
            />
            <Text>Map</Text>
            <CustomInput 
                placeholder = "location"
                value = {locationName}
                setValue = {setLocationName}
            />
            <CustomButton
                text="Search"
                onPress={onPressSearch}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems : 'center',
        padding: 20,
        backgroundColor: '#F9FBFC'
    },
    map: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
        margin: 10,
    }
})

export default Map;