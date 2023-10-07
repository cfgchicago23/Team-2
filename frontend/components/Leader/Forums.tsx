import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, ScrollView, RefreshControl, TextInput} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import firestoreChat, { getFirestoreChat } from './firestoreChat';
import { getAuth } from 'firebase/auth';


const Forums = () => {  
  const [messages, setMessages] = useState<IMessage[]>([])

  const auth = getAuth();
  const user = auth.currentUser?.uid!

  useEffect(() => {
  }, [])

  const onSend = useCallback((messages = []) => {
    firestoreChat(user, messages[0].text, new Date(), {_id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',})

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user,
      }}
    />
  )
  
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'lightgray',
      borderRadius: 5,
    },
    temp: {
      backgroundColor: 'red',
    }
  })

export default Forums;