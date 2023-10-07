import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { User } from "firebase/auth";
import React from 'react';

import Dashboard from './Dashboard';
import ManageLeaders from './ManageLeaders';

export type tabParamsList = {
  Dashboard: {user: User},
  "Manage Leaders": {user: User},
}

export type YouthNavProps = {
  user: User
}

const Tab = createBottomTabNavigator<tabParamsList>();

export const AdminNav = (props: YouthNavProps) => (
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
        name="Manage Leaders"
        component={ManageLeaders}
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