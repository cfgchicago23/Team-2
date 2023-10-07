import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, ScrollView, RefreshControl, TextInput} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import firestoreChat, { getFirestoreChat } from './firestoreChat';
import { getAuth } from 'firebase/auth';


const Forums = () => {  
  const [messages, setMessages] = useState([])

  const auth = getAuth();
  const user = auth.currentUser?.uid!

  return (
  <View style={styles.container}>
    <ScrollView>

    </ScrollView>
    <View>
      <Text>Submit a evaluation!</Text>
      <Text>

      </TextInput>
    </View>
  </View>)
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

export default Forums;