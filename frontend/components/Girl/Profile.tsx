import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import { signOutUser } from "../../firebase/auth";
import { useState } from "react";

import { tabParamsList } from "../../App";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";

type Props = BottomTabScreenProps<tabParamsList, 'Profile'>;

export default function Profile({ route, navigation }: Props) {

  const [error, setError] = useState("");
  const user = route.params.user;

  return (
    <View style={styles.container}>
      {/* Display User's Display Name */}
      
      <Text style={styles.displayName}>{user.displayName}</Text>
      <Text style={styles.club}>Club: CodeForGood_23</Text>
      <Text style={styles.club}>Team: *****2*****</Text>

      {/* Display User's Email Address */}
      <Text style={styles.email}>{user.email}</Text>

      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => signOutUser(setError)}>
          <Text style={styles.signout}>Sign Out</Text>
        </TouchableOpacity>
        <Text>{error}</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 80
  },
  displayName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
    padding: 10
  },
  email: {
    fontSize: 16,
    fontWeight: '500', fontStyle:'italic',
    marginTop: 5,
    marginBottom: 10,
    color: 'grey',
    textAlign: 'center'
  },
  club: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
    color: 'grey',
    textAlign: 'center'
  },
  signout: {
    color: 'red',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});
