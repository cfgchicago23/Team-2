import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/firebaseConfig';
import Auth from './components/Auth/Auth';
import { useState } from 'react';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import Profile from './components/Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export type tabParamsList = {
  Home: undefined;
  Profile: {user: User};
}
const Tab = createBottomTabNavigator<tabParamsList>();

export default function App() {
  const [user, setUser] = useState<User>();

  onAuthStateChanged(auth, (user) => {
    if (user === null) { 
      setUser(undefined);
    } else {
      setUser(user);
    }
  });

  if (user === undefined) {
    return (
      <View style={styles.container}>
        <Auth />
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
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
            initialParams={{user: user}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
