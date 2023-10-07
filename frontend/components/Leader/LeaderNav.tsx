import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { User } from "firebase/auth";
import React from 'react';

import Dashboard from './Dashboard';
import Forums from './Forums';
import ManageStudents from './ManageStudents';
import Loading from './Loading';

export type tabParamsList = {
  Dashboard: {user: User}
  Forums: {user: User},
  ManageClub: {user: User},
}

export type LeaderNavProps = {
  user: User,
  userData: any,
  fetchUserData: any,
  setUserData: any,
}

const Tab = createBottomTabNavigator<tabParamsList>();

export const LeaderNav = (props: LeaderNavProps) => {
  const {user, userData, fetchUserData, setUserData} = props;
  console.log(userData.club)
  if (userData.club === null){
    return(
      <Loading user={user} userData={userData} fetchUserData={fetchUserData} setUserData={setUserData}></Loading>
    )
  }else{
    return (
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
            initialParams={{user: props.user}}
          />
          <Tab.Screen
            name="ManageClub"
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
  }
};
