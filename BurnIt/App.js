import React from 'react';
import { styles } from './styles';
import { getAuth, FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import app from './firebaseSetup';

import SignInScreen from './src/screens/SignInScreen.js';
import Home from './src/screens/Home.js';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen
          name="Home"
          options={{ title: 'BurnIt' }}
          component={Home}
          options={{
            title: 'BurnIt',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold'
            },
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white'
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


