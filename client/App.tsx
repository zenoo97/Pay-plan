import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './src/navigator/screen/LoginScreen';
import SignUpScreen from './src/navigator/screen/SignUpScreen';
import HomeScreen from './src/navigator/screen/HomeScreen';
import 'react-native-url-polyfill/auto';
import MakeChallengeComponent from './src/components/home/MakeChallengeComponent';
import MakeChallenge from './src/navigator/screen/MakeChallenge';

const Stack = createNativeStackNavigator();
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};
function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MakeChallenge" component={MakeChallenge} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
