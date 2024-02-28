import { useState, useEffect } from 'react';
import { useWindowDimensions, SafeAreaView, View, Text, TextInput, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';
import Logo from '../../../assets/icon.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const API_ENDPOINT = "https://randomuser.me/api/?results=30" //for testing only

const Map = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [fullData, setFullData] = useState([]);
    const [locationName, setLocationName] = useState("");

    const {height} = useWindowDimensions();
    const onPressSearch = () => {
        console.warn("Searching")
    }

    useEffect(() => {
        setIsLoading(true);
        fetchData(API_ENDPOINT)
    }, []);

    const fetchData = async(url) => {
        try{
            const response = await fetch(url);
            const json = await response.json();
            setData(json.results);

            console.log(json.results)

            setIsLoading(false);

        } catch(error) {
             
            setError(error);
            console.error(error);
            setIsLoading(false);
        }
    }

    handleSearch = (query) => {
        setSearchQuery(query)
    }


    if( isLoading ){
        return(
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <ActivityIndicator 
                    size={"large"}
                    color="#5500dc"
                />
            </View>
        )
    }

    if(error){
        return(
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <Text>Error in fetch data ... Please try again later</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.root}>
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
            <FlatList 
                data={data}
                keyExtractor={(item) => item.login.username}
                renderItem={({item}) => (
                    <View styles={styles.itemContainer}>
                        <Image source={{url: item.picture.thumbnail}} style={styles.image}/>
                        <View>
                            <Text style={styles.textName}>{item.name.first} {item.name.last}</Text>
                            <Text style={styles.textLocation}>{item.name.email}</Text>
                        </View>
                    </View>
                )}
            />
            <CustomButton
                text="Search"
                onPress={onPressSearch}
            />
        </SafeAreaView>
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