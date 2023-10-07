import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { User } from "firebase/auth";
import React from 'react';

import Dashboard from './Dashboard';
import Forums from './Forums';
import ManageStudents from './ManageStudents';

export type tabParamsList = {
  Dashboard: {user: User}
  Forums: {user: User},
  "Manage Club": {user: User},
}

export type GirlNavProps = {
  user: User
}

const Tab = createBottomTabNavigator<tabParamsList>();

export const LeaderNav = (props: GirlNavProps) => (
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
        name="Manage Club"
        component={ManageStudents}
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
        name="Forums"
        component={Forums}
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