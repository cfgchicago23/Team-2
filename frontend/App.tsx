import { StyleSheet, Text, View } from 'react-native';
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/firebaseConfig';
import { Auth } from './components/Auth/Auth';
import { useState } from 'react';

import * as React from 'react';
import { YouthNav } from './components/Youth/YouthNav';
import {LeaderNav} from './components/Leader/LeaderNav';
import { DocumentData } from 'firebase/firestore';
import { fetchUserData } from './firebase/firestore'
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AdminNav } from './components/Admin/AdminNav';

export type tabParamsList = {
  Home: undefined;
  Profile: {user: User};
}
const Tab = createBottomTabNavigator<tabParamsList>();

export default function App() {
  const [user, setUser] = useState<User>();
  const [userData, setUserData] = useState<DocumentData>();

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
      </View>
    );
  } else {
    if (userData === undefined) {
      fetchUserData(user, setUserData);
      return (
        <View style={styles.container}>
          <Text>Loading</Text>
        </View>
      )
    } else if (userData.type === undefined) {
      return (
        <View style={styles.container}>
          <Text>User has no type.</Text>
        </View>
      );
    } else if (userData.type === "Youth") {
      return <YouthNav user={user} userData = {userData} fetchUserData = {fetchUserData} setUserData = {setUserData}/>
    } else if (userData.type === "Leader") {
      return <LeaderNav user={user} userData = {userData} fetchUserData = {fetchUserData} setUserData = {setUserData}/>
    } else if(userData.type === "Admin") {
      return <AdminNav user={user}/>
    }
    else {
      return (
        <View style={styles.container}>
          <Text>Navigation not setup yet for {userData.type}</Text>
        </View>
      );
    }
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
