import React from 'react';
import { getAuth, FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import app from '../../firebaseSetup';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';


const SignInScreen = () => {

  const navigation = useNavigation();

  const SignInWithFB = async () => {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw new Error('User cancelled login');
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw new Error('Something went wrong obtaining access token');
    }
    const auth = getAuth(app);
    const credential = FacebookAuthProvider.credential(data.accessToken);
    const user = await signInWithCredential(auth, credential);
    console.log(user);
    // Navigate to the Summary component
    navigation.navigate('Home');
  }

  return (
    <View>
      <Button title='Sign in with Facebook' onPress={SignInWithFB}/>
    </View>
  );
}

export default SignInScreen;