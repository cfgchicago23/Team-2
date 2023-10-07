import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Help = () => {
  const [message, setMessage] = useState('');


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Need Help?</Text>


      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactIcon}>📞</Text>
        <Text style={styles.contactText}>CONTACT POLICE</Text>
        <Text style={styles.subText}>+1 911 FOR URGENT SITUATIONS</Text>
      </TouchableOpacity>


      <View style={styles.mentorContainer}>
        <Text style={styles.mentorTitle}>Contact Your Club Mentor</Text>
        <Text>• Have any questions?</Text>
        <Text>• Need help with a lesson?</Text>
        <Text>• Anything you don’t understand?</Text>
        <Text>• Is there something you’d like to share with your mentor?</Text>


        <Text style={styles.messagePrompt}>Let them know below!</Text>


        <TextInput
          style={styles.messageInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Your message"
          multiline={true}
        />


        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>SEND</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
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
  },
  sendButton: {
    backgroundColor: '#FFC1E1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});


export default Help;
