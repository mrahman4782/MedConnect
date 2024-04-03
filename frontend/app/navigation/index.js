import { View, Text } from 'react-native';
import { Link, router, useLocalSearchParams, useRouter } from "expo-router";// use in place of react-native stack navigator
import ConfirmAccount from "../screens/ConfirmAccount"
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import Login from "../screens/Login";
import Register from '../screens/Register';
import { NavigationContainer } from 'expo-router';
import { createStackNavigator } from 'expo-router';

// import Index from '../index'
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from '@react-navigation/native'; // causes expo conflict

// const Stack = createStackNavigator();

const Navigation = () => {
    const params = useLocalSearchParams();
    const router = useRouter();

    return (
        // <Stack.Navigator screenOptions={{ headerShown: false }}>
        <View>
            {/* <Stack.Screen name="Index" component={Index} /> */}
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="ConfirmAccount" component={ConfirmAccount} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
            </Stack.Navigator>
         </View>
        // {/* </Stack.Navigator> */ }
    )
}

export default Navigation