import React from 'react';
import { getAuth, FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import app from '../../firebaseSetup';
import auth from '../../firebaseSetup';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useContext } from 'react';
import { UserContext } from '../../App';
const SignInScreen = () => {

  const { setLogin } = useContext(UserContext);
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
    // const auth = getAuth(app);
    const credential = FacebookAuthProvider.credential(data.accessToken);
    console.log('before: ', auth);

    const user = await signInWithCredential(auth, credential);
    console.log('after')
    setLogin(true);
    navigation.navigate('Home');
  }
  const SignInWithGoogle = () => { };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title='Sign in with Facebook' onPress={SignInWithFB}/>
      <GoogleSigninButton
    style={{ width: 192, height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Light}
    onPress={SignInWithGoogle}
  />
    </View>
  );
}

export default SignInScreen;