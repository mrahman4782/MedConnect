import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! hiii this is elizabeth</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
