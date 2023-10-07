import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { createNewClubFirestore, findUserByEmail } from './firestoreQueries';
const ManageLeaders = () => {  
  
  const [newLeader, setNewLeader] = useState("");
  const [createClub, setCreateClub] = useState({
    uid: "",
    clubName: "",
  });
  const [error, setError] = useState("")

  const createNewClub = () => {
    createNewClubFirestore(createClub.uid, createClub.clubName).then(() => {
      setNewLeader("")
      setCreateClub({
        uid: "",
        clubName: "",
      })
    })
  }

  const approveLeader = () => {
    findUserByEmail(newLeader).then((leaderId) => {
      if (leaderId.id !== null){
        setCreateClub({
          uid: leaderId.id!,
          clubName: "",
        })
      }else{
        setError(leaderId.message)
      }
    })
  }

 return (
    <SafeAreaView style={styles.container}>
        <Text>Manage Leaders</Text>
        {createClub.uid === "" ? (
          <View style={styles.container}>
            <Text>Add new leaders!</Text>
            <TextInput
            style={styles.TextInput}
            placeholder="email"
            onChangeText={(text) => setNewLeader(text)}
            />
            <Text style={styles.ErrorText}>{error}</Text>
            <TouchableOpacity
            style={styles.Button}
            onPress={() => approveLeader()}>
              <Text
                style={styles.ButtonText}>
                Approve Leader
              </Text>
          </TouchableOpacity>
          </View>
        ):(
          <View style={styles.container}>
            <Text>Create Club your new leader!</Text>
            <Text>Enter Club Name</Text>
            <TextInput
            style={styles.TextInput}
            placeholder="Club Name"
            onChangeText={(text) => setCreateClub({...createClub, clubName: text})}
            />
            <TouchableOpacity
            style={styles.Button}
            onPress={() => createNewClub()}>
              <Text
                style={styles.ButtonText}>
                Create Club
              </Text>
          </TouchableOpacity>
          </View>
        )}
    </SafeAreaView>
 )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeText: {
    color: 'blue',
  },
  TextInput: {
    width: 250,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  Button: {
    width: 250,
    margin: 5,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  ButtonText: {
    color: 'white',
  },
  ErrorText: {
    textAlign: 'center',
    color: 'red',
  }
});

export default ManageLeaders;