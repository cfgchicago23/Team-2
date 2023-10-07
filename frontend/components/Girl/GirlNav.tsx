import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { User } from "firebase/auth";
import React from 'react';
import Dashboard from './Dashboard';
import Lessons from './Lessons';
import Help from './Help';
import Profile from '../Auth/Profile';

export type tabParamsList = {
  Dashboard: {user: User}
  Help: {user: User},
  Lessons: {user: User},
  Profile: {user: User}
}

export type GirlNavProps = {
  user: User
}

const Tab = createBottomTabNavigator<tabParamsList>();

export const GirlNav = (props: GirlNavProps) => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          tabBarHideOnKeyboard: true,
         }}
      />
      <Tab.Screen
        name="Lessons"
        component={Lessons}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          tabBarHideOnKeyboard: true,
        }}
        initialParams={{user: props.user}}
      />
      <Tab.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          tabBarHideOnKeyboard: true,
        }}
        initialParams={{user: props.user}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          tabBarHideOnKeyboard: true,
        }}
        initialParams={{user: props.user}}
      />
    </Tab.Navigator>
  </NavigationContainer>
);