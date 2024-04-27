import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const CustomExpandableCard = (data) => {

    const [expanded, setExpanded] = useState(false);
    const [animation] = useState(new Animated.Value(100));

    const toggleExpansion = () => {
        // Start the animation when the box is clicked
        Animated.timing(animation, {
          toValue: expanded ? 100 : 300,  // End height of the box when expanded
          duration: 300,  // Duration of the animation
          useNativeDriver: false  // Use native driver for better performance
        }).start();
    
        setExpanded(!expanded);  // Toggle the state to keep track of expansion
      };
    
      return (
        <TouchableOpacity onPress={toggleExpansion}>
          <Animated.View style={[styles.box, { height: animation }]}>
            {/* Content of the box goes here */}
          </Animated.View>
        </TouchableOpacity>
      );
};

const styles = StyleSheet.create({
    box: {
      backgroundColor: 'skyblue',
      width: '100%', // You can adjust the width as needed
      // Initial static height is not necessary due to the animated height
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      // Add other styling as needed
    },
    // Add other styles if needed
  });

  export default CustomExpandableCard;