import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Summary from './Summary.js';
import Meal from './Meal.js';
import Exercise from './Exercise.js';
import { getAuth } from 'firebase/auth';
import auth from '../../firebaseSetup';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../state/actions';

const Tab = createMaterialBottomTabNavigator();

const Home = () => {
  const currentUser = auth.currentUser;
  const [update, setUpdate] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleCreateUser = (data) => {
    axios.post('http://localhost:3000/users', data)
    .then(res => {
      // console.log('posted user')
    })
    .catch(err => console.error('ERROR WITH POSTING DATA', err))
  };

  const handleGetUser = () => {
    const uid = currentUser.uid;
    // console.log('getUserID: ', uid);
    axios.get(`http://localhost:3000/users/${uid}`)
      .then(response => {
        const userFromServer = response.data;
        if (userFromServer) {
          dispatch(setUser({
            uid: currentUser.uid,
            name: userFromServer.name,
            profile_url: userFromServer.profile_url,
            gender: userFromServer.gender,
            weight_kg: userFromServer.weight_kg,
            height_cm: userFromServer.height_cm,
            age: userFromServer.age,
          }));
        } else {
          const newUser = {
            uid: currentUser.uid,
            name: currentUser.displayName,
            profile_url: currentUser.photoURL,
            gender: 'female',
            weight_kg: 50,
            height_cm: 160,
            age: 30,
          };
          dispatch(setUser(newUser));
          handleCreateUser(newUser);
        }

      })
      .catch(error => {
        console.error(error);
      });
  };


  useEffect(() => {handleGetUser()}, []);


  return (
    <Tab.Navigator
      initialRouteName="Summary"
      // activeColor="#FF0303"
      activeColor="#F66D44"
      inactiveColor="#A9A9A9"
      barStyle={{ backgroundColor: '#2C3639' }}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Summary"
        options={{
          tabBarLabel: 'Summary',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      >
        {(props) => <Summary {...props} currentUser={currentUser} update={update} handleCreateUser={handleCreateUser}/>}
      </Tab.Screen>

      <Tab.Screen
        name="Meal"
        options={{
          tabBarLabel: 'Meal',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food-variant" color={color} size={26} />
          ),
        }}
      >
          {(props) => <Meal {...props} setUpdate={setUpdate}/>}
      </Tab.Screen>

      <Tab.Screen
        name="Exercise"
        options={{
          tabBarLabel: 'Exercise',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="run" color={color} size={26} />
          ),
        }}
      >
        {(props) => <Exercise {...props} setUpdate={setUpdate}/>}
      </Tab.Screen>

    </Tab.Navigator>
  );
};

export default Home;
