import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { getMessages, uploadEvaluation, uploadMessage } from './firestoreforums';
import { getAuth } from 'firebase/auth';

const Forums = () => {  
    const [evaluation, setEvaluation] = useState("");
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");

    const auth = getAuth()

    useEffect(() => {
      //onload grab messages from load
      getMessages().then((messages) => {
        setMessages(messages)
      })
    }, [])

    const submitEvaluation = () => {
      uploadEvaluation(evaluation, auth.currentUser!.email!).then(() => {
        setEvaluation("")
      })
    }

    const submitMessage = () => {
      //upload message to firestore
      uploadMessage(currentMessage, auth.currentUser!.displayName!).then((list) => {
          setMessages(list)
      })
    }

    return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style = {styles.middleContainer}>
              <Text style={styles.title}>Enter an evaluation!</Text>
                <TextInput
              style={styles.messageInput}
              value={evaluation}
              onChangeText={setEvaluation}
              placeholder="Your evaluation"
              multiline={true}
              />
              <TouchableOpacity style={styles.sendButton} onPress={() => submitEvaluation()}>
                <Text style={styles.sendButtonText}>SEND</Text>
              </TouchableOpacity>

            </View>
            <View style={styles.messageInputContainer}>
              <Text style={styles.title}>Join the Conversation!</Text>
              <View>
                {messages.map((message) => {
                  return (
                    <View style={styles.messageBubble} key={message.id}>
                      <Text style={styles.bold}>{message.user}</Text>
                      <Text>{message.message}</Text>
                    </View>
                  )
                })}
              </View>
              <TextInput
                style={styles.forumInput}
                value={currentMessage}
                onChangeText={setCurrentMessage}
                placeholder="Your message"
                multiline={true}
              />
              <TouchableOpacity style={styles.sendButton} onPress={() => submitMessage()}>
                <Text style={styles.sendButtonText}>SEND</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
    )
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  contactButton: {
    backgroundColor: '#FFC1E1',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 40,
  },
  contactIcon: {
    fontSize: 24,
  },
  contactText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    marginTop: 10,
    color: 'gray',
  },
  messageBubble: {
    padding: 10,
    backgroundColor: '#FFEBF7',
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
  },
  mentorContainer: {
    backgroundColor: '#FFEBF7',
    padding: 20,
    borderRadius: 10,
  },
  mentorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageInputContainer: {

  },
  messagePrompt: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 10,
  },
  messageInput: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 100,
    marginBottom: 20,
    flexDirection: 'row',
  },

  forumInput: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 40,
    marginBottom: 20,
    flexDirection: 'row',
  },

  sendButton: {
    backgroundColor: colors.pink,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bold: {
    fontWeight: 'bold'
  }
});

export default Forums;