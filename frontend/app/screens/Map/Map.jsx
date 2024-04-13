import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Logo from '../../../assets/icon.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from '../../components/CustomButton';
import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps'
import {logo1} from '../../../assets/logo1.png';
// import dotenv from 'dotenv';
// dotenv.config({path: '../../.env'}); 

// const apiKey = process.env.GOOGLE_MAP_KEY;

const apiKey = '';

const Map = () => {

    const { height } = useWindowDimensions();
    const [markers, setMarkers] = useState([]);  
    const [mapInput, setMapInput] = useState("");   
    const [userLatitude, setUserLatitude] = useState(40.7128);
    const [userLongitude, setUserLongitude] = useState( -74.0060);
    const [address, setAddress] = useState('');

    const onRegionChangeComplete = (region) => {
        setUserLatitude(region.latitude);
        setUserLongitude(region.longitude);
    }; 

    const styles = StyleSheet.create({
        root: {
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#b0c2e8'
        },
        logo: {
            width: '70%',
            maxWidth: 300,
            maxHeight: 200,
            margin: 10,
        },
        mapContainer: {
            height: 400,
            width: '100%',
            alignItems: 'center',
            
          },
        map: {
            ...StyleSheet.absoluteFillObject,
        }
    })

    useEffect(() => {

        if (userLatitude && userLongitude && mapInput.trim()) {
            const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(mapInput.trim())}&location=${userLatitude},${userLongitude}&radius=5000&key=${apiKey}`;

        // const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLatitude},${userLongitude}&radius=5000&type=${mapInput.trim()}&key=${apiKey}`;

            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    const newMarkers = data.results.map((item) => ({
                        latitude: item.geometry.location.lat,
                        longitude: item.geometry.location.lng,
                        title: item.name,
                        id: item.place_id,
                    }));
                    setMarkers(newMarkers);
                })
                .catch((error) => {
                    console.error('Error fetching places:', error);
                });
        }
    }, [userLatitude, userLongitude, mapInput]); 

    const convertAddressToCoords = async (address) => {
        const geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        try {
            const response = await fetch(geocodeApiUrl);
            const data = await response.json();
            if (data.status === 'OK') {
                const { lat, lng } = data.results[0].geometry.location;
                setUserLatitude(lat);
                setUserLongitude(lng);
               
            } else {
                console.error('Geocoding failed:', data.status);
            }
        } catch (error) {
            console.error('Error fetching geocode:', error);
        }
    };
    

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Image
                source={logo1}
                // style={[styles.logo1, { height: height * 0.3 }]}

                resizeMode="contain"
            />
            <Text>Welcome to the MedChat</Text>

            {/* <CustomInput
            style={styles.input}
            value={userLatitude}
            setValue={setUserLatitude}
            placeholder="Enter latitude"
            />
        <CustomInput
            style={styles.input}
            value={userLongitude}
            setValue={setUserLongitude}
            placeholder="Enter longitude"
            /> */}

            <CustomInput
                style={styles.input}
                value={mapInput}
                setValue={setMapInput}

                placeholder="Enter clinic type"
            />

            <CustomInput
                value={address}
                setValue={setAddress}
                placeholder="Enter address"
            />

            <CustomButton
                text="Search"
                onPress={() => convertAddressToCoords(address)}
            />
            
            </View>

        <View style={styles.mapContainer}>

      <MapView
         style={styles.map}
         region={{
            latitudeDelta: 0.0722, 
            longitudeDelta: 0.0321, 
            latitude: userLatitude ,
            longitude: userLongitude ,
        }}
         onRegionChangeComplete={onRegionChangeComplete}

        >

        {markers.map((marker) => (
            <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            />
        ))}
        
        </MapView>
    
        </View>

        </ScrollView>
    )
}

export default Map;
