import React from 'react';
import { Svg, Path } from 'react-native-svg';

import { getAuth, FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
import { LoginManager, AccessToken, LoginButton } from 'react-native-fbsdk-next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import app from '../../firebaseSetup';
import auth from '../../firebaseSetup';
// import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

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
<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 200 }}>
      {/* <Button title='Sign in with Facebook' onPress={SignInWithFB} /> */}
      <Svg width="100" height="100">
        <Path
          d="M50,0 L100,50 L50,100 L0,50 Z"
          fill="red"
        />
      </Svg>
      <Text>Welcome to BurnIt!</Text>
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('Login failed with error:', error);
          } else if (result.isCancelled) {
            console.log('Login was cancelled');
          } else {
            SignInWithFB();
          }
        }}
        onLogoutFinished={() => console.log('User logged out')}
      />
      {/* <View style={{ position: 'absolute', left: 12 }}>
        <Icon name='facebook' size={30} color='#4267B2' />
      </View> */}
    </View>
  );
}

export default SignInScreen;