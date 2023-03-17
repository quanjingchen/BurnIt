import React, { useState, createContext } from 'react';
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

const Stack = createStackNavigator();
export const UserContext = createContext({
  login: false,
  setLogin: () => { }
});

export default function App() {
  const [login, setLogin] = useState(false);
  LogBox.ignoreAllLogs();


  return (
    <UserContext.Provider value={{ login, setLogin }}>
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
            options={{
              title: 'BurnIt',
              headerTitle: null,
              headerLeft: () => null,
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
    </UserContext.Provider>

  );
}


