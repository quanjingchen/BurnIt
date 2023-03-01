import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Summary from './Summary.js';
import Meal from './Meal.js';
import Exercise from './Exercise.js';

const Tab = createMaterialBottomTabNavigator();

const Home = () => {

  return (
    <Tab.Navigator
      initialRouteName="Summary"
      activeColor="#FF0303"
      barStyle={{ backgroundColor: '#F9F9F9' }}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Summary"
        component={Summary}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Meal"
        component={Meal}
        options={{
          tabBarLabel: 'Meal',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food-variant" color={color} size={26} />
          ),
        }}
      />
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
