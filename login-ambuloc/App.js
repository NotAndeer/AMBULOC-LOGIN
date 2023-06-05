import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import RegisterScreen from './screens/Register';
import { initializeApp } from 'firebase/app';
import Historial from './screens/Historial';
import FisrtScreen from './screens/Home';
import Settings from './screens/Settings';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBdJ-HgQ3FbRxr2k2kdpi6YY12NdVfTt-c",
  authDomain: "ambuloc-61f6f.firebaseapp.com",
  projectId: "ambuloc-61f6f",
  storageBucket: "ambuloc-61f6f.appspot.com",
  messagingSenderId: "309609423899",
  appId: "1:309609423899:web:08c998dc50740be67504be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Historial" component={Historial} />
        <Stack.Screen name="Home" component={FisrtScreen} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
