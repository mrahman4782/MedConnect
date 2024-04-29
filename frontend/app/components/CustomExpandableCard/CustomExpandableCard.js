import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Button, Text} from 'react-native';
import GoogleMapReact from 'google-map-react';
import CustomButton from "../CustomButton";

const MarkerComponent = ({ text }) => (
  <div style={{
    position: 'absolute',
    transform: 'translate(-50%, -100%)'
  }}>
    <svg height="40" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
    <div style={styles.markerText}>
      <h3>{text}</h3>
    </div>
  </div>
);

const CustomExpandableCard = (data) => {

    const [expanded, setExpanded] = useState(false);
    const [animation] = useState(new Animated.Value(100));


    const bookAppointmentButton = () => {

    }
    const defaultLocation = {
      center: {
        lat: 40.715465,
        lng: -74.000473
      },
      zoom: 12
    };
    const toggleExpansion = () => {
        // Start the animation when the box is clicked
        Animated.timing(animation, {
          toValue: expanded ? 80 : 330,
          duration: 300, 
          useNativeDriver: true
        }).start();
    
        setExpanded(!expanded);  
      };
    
      return (
        <TouchableOpacity onPress={toggleExpansion}>
          <Animated.View style={[styles.box, { height: animation }]}>
          <View style={styles.headerContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>Header Text</Text>
              <Text style={styles.subText}>This is the subtext</Text>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton 
                text="Book Now"
                type='PRIMARY'
                onPress={bookAppointmentButton}
              />
              {/* <Button
                title="Press Me"
                onPress={() => console.log('Button Pressed')}
              /> */}
            </View>
            </View>
            <View style={styles.mapOuterContainer}>
            <View style={styles.mapContainer}>
            <GoogleMapReact
            // Keep this key here
            bootstrapURLKeys={{ key: 'AIzaSyBJX_S6YGC-kIExuWzU_stPGi8gi7r9W1M'}}
            defaultCenter={defaultLocation.center}
            defaultZoom={defaultLocation.zoom}
           
            >
            <MarkerComponent
              lat={-50}
              lng={77} 
              text="My Marker"
            />
            </GoogleMapReact>
            </View>
            </View>
  

          </Animated.View>
        </TouchableOpacity>
      );
};

const styles = StyleSheet.create({
    box: {
      backgroundColor: '#7498EF',
      width: '100%', 
      overflow: 'hidden',
      marginTop: 5,
      paddingTop: 10,
      borderRadius: '5px',
      paddingRight: 20,
      paddingLeft: 20,
      paddingBottom: 20,
    },
    container: {
      position: 'absolute',
      alignItems: 'center', 
      transform: [{ translateX: -20 }, { translateY: -40 }] // Adjust these values as needed for positioning
    },
    svgContainer: {
      width: 40,  
      height: 40, 
      backgroundColor: 'transparent'
    },
    markerText: {
      transform: 'translateX(-10%)',
      color: 'black',
      fontSize: 12,
      fontWeight: 'bold',
      margin: -7,
      whiteSpace: 'nowrap'
    },
    mapContainer: {
      width: '100%',
      height: '70%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '20px'
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    textContainer: {
      flex: 3, // gives more space to the text side
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    subText: {
      fontSize: 16,
      color: '#666',
    },
    buttonContainer: {
      flex: 1.5, // lesser space for the button
    },
    mapOuterContainer: {
      width: '100%',
      height: '100%',
      borderRadius: 100,
      
      alignItems: 'center',
    }
  });

  export default CustomExpandableCard;