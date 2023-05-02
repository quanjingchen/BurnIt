import React, { useState } from 'react';
import { styles } from './styles';
import { getAuth, FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import app from './firebaseSetup';
import SignInScreen from './src/screens/SignInScreen.js';
import Home from './src/screens/Home.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/state/store';

const Stack = createStackNavigator();


export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

