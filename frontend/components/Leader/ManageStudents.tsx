import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { DocumentData, QuerySnapshot, collection, getDocs, query, updateDoc, where, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { tabParamsList } from './LeaderNav';
import { FirebaseError } from 'firebase/app';
import { User } from 'firebase/auth';

type Props = BottomTabScreenProps<tabParamsList, 'ManageClub'>;

const ManageYouth = ({ route, navigation }: Props) => {  

  const [email, setEmail] = useState<string>();
  const user: User = route.params.user;
  const [error, setError] = useState("");

  const handleAddYouth = () => {
    if (email !== undefined) {
      const q = query(collection(db, "users"), where("email", "==", email), where("type", "==", "Youth"));
      getDocs(q).then((userList: QuerySnapshot) => {
        userList.forEach((document: DocumentData) => {
          if (document.data().club === null) {
            updateDoc(doc(db, 'users', document.id), {
              club: user.uid
            });
            setError("User added.");
          } else {
            setError("This user cannot be added.");
          }
        })
      }).catch((error: FirebaseError) => {
        console.log(error);
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <Text>Manage Youth</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType='email-address'
          onChangeText={(text) => setEmail(text)}
        />
        <TouchableOpacity
          style={styles.Button}
          onPress={() => handleAddYouth()}>
            <Text
              style={styles.ButtonText}>
              Add Youth
            </Text>
        </TouchableOpacity>
        <Text style={styles.ErrorText}>{error}</Text>
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
    color: 'black',
  }
});

export default ManageYouth;