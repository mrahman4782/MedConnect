import { useState, useEffect } from 'react';
import { View, Text, Pressable, Linking, ScrollView, StyleSheet, useWindowDimensions, TouchableOpacity } from "react-native";
import Logo from '../../../assets/icon.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomExpandableCard from '../../components/CustomExpandableCard';
import { providerRetrieve } from "../../functions/providerRetrieve";

const Map = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [fullData, setFullData] = useState([]);
    const [specialty, setSpecialty] = useState("");

    const {height} = useWindowDimensions();
    
    const onPressSubmit = async () => {
        let res = await providerRetrieve(specialty);
        if (res.status == 200){
            console.log("Information received");
            console.log(res.data.provider1);
            setFullData(res.data);
        }
    }

    function transformData(data) {

        // Transform returned object into array for further map computation
        const objToArr = Object.keys(data).map(key => {
            return {
              ...data[key],
              value: data[key].value + 1
            };
          });
        console.log('hi');
        console.log(objToArr);

        return objToArr;
      }
      
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            {/* <Text>This is userpage {id}</Text> */}
            <Text style={styles.text}>SPECIALTY</Text>
            <CustomInput
                value={specialty}
                setValue={setSpecialty}
                placeholder="Enter the name of any specialty"
                style={styles.textFields}
            />
            {transformData(fullData).map((item, index) => (
                <CustomExpandableCard key={index} provider={item} />
            ))}
            <CustomButton
                text="Submit"
                onPress={onPressSubmit}
            />
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 20,
        backgroundColor: '#e0e1dd',
    },
    map: {
        width: '70%',
        maxWidth: 30,
        maxHeight: 200,
        margin: 10,
    },
    textFields: {
        padding: 5,
        color: '#757474',
        outline: 'none',
        borderWidth: 0,
        borderRadius: 5,
        
    },
    text: {
        paddingLeft: 5,
        fontSize: 10,
        marginTop: 10,
        paddingBottom: 5
    },
    box: {
        // Style for each 'box'
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'white',
      },
      name: {
        // Style for the name text
        fontWeight: 'bold',
      },
      address: {
        // Style for the address text
      }
    
    

})

export default Map;