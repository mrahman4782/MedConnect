import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';

const API_ENDPOINT = "https://randomuser.me/api/?results=30" //for testing only

const CustomInput = ({value, setValue, placeholder, secureTextEntry, query}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [fullData, setFullData] = useState([]);
    
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
        <SafeAreaView style={styles.container}>
            <TextInput 
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(query) => handleSearch(query)}
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
        </SafeAreaView>
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
    itemContainer:{
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


export default CustomInput