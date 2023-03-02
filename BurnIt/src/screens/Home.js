import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Summary from './Summary.js';
import Meal from './Meal.js';
import Exercise from './Exercise.js';
import { getAuth } from 'firebase/auth';
import app from '../../firebaseSetup';
import axios from 'axios';

const Tab = createMaterialBottomTabNavigator();

const Home = () => {
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const [user, setUser] = useState({
    uid: currentUser.uid,
    name: currentUser.displayName,
    gender: 'female',
    weight_kg: 50,
    height_cm: 160,
    age: 30,
  });

  const handleGetUser = () => {
    const uid = currentUser.uid;
    console.log('getUserID: ', uid);
    axios.get(`http://localhost:3000/users/${uid}`)
      .then(response => {
        const userFromServer = response.data;
        // console.log('userFromServer._id: ',  userFromServer)
        if (userFromServer) {
          setUser({
            ...user,
            name: userFromServer.name,
            gender: userFromServer.gender,
            weight_kg: userFromServer.weight_kg,
            height_cm: userFromServer.height_cm,
            age: userFromServer.age,
          });
        }

      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCreateUser = (data) => {
    console.log('User: ', data);
    axios.post('http://localhost:3000/users', data)
    .then(res => {console.log('posted user')})
    .catch(err => console.error('ERROR WITH POSTING DATA', err))
  };
  useEffect(() => {handleGetUser()}, []);


  return (
    <Tab.Navigator
      initialRouteName="Summary"
      activeColor="#FF0303"
      barStyle={{ backgroundColor: '#F9F9F9' }}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Summary"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      >
        {(props) => <Summary {...props} user={user} setUser={setUser} currentUser={currentUser} handleCreateUser={handleCreateUser}/>}
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
          {(props) => <Meal {...props} user={user}/>}
      </Tab.Screen>

      <Tab.Screen
        name="Exercise"
        component={Exercise}
        options={{
          tabBarLabel: 'Exercise',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="run" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
