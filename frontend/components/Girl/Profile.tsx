import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import { signOutUser } from "../../firebase/auth";
import { useState } from "react";

import { tabParamsList } from "./GirlNav";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";

type Props = BottomTabScreenProps<tabParamsList, 'Profile'>;

export default function Profile({ route, navigation }: Props) {

  const [error, setError] = useState("");
  const user = route.params.user;

  return (
      <View style={styles.container}>
        <Text style={styles.displayName}>{user.displayName}</Text>
        <View style={styles.bottom}>
            <TouchableOpacity
              onPress={() => signOutUser(setError)}>
                <Text style={styles.signout}>Sign Out</Text>
            </TouchableOpacity>
            <Text>{error}</Text>
          </View>
          <StatusBar style="auto" />
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10
    },
    profilePicture: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginTop: 30,
    },
    displayName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 5,
      marginBottom: 10,
    },
    description: {
      width: '100%',
      height: 200,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 5,
      textAlignVertical: 'top',
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