import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {  getAuth } from "firebase/auth";

const Help = ({}) => {
  const typeMap = new Map<string, string>();
typeMap.set('😀', '1');
typeMap.set('😐', '2');
typeMap.set('😢', '3');
  const auth = getAuth()
  const user = auth.currentUser!.uid
  const handleEmojiPress = (emoji: string) => {
    // Logic to handle emoji button press (if there's any)
    //console.log(emoji + ' pressed', typeMap.get(emoji));

    //console.log(user);
    const db = getFirestore();
    updateDoc(doc(db, "users", user), {
      mood :typeMap.get(emoji)
      })
    }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Need Help?</Text>

      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactIcon}>📞</Text>
        <Text style={styles.contactText}>CONTACT POLICE</Text>
        <Text style={styles.subText}>+1 911 FOR URGENT SITUATIONS</Text>
      </TouchableOpacity>

      <View style={styles.mentorContainer}>
        <Text style={styles.mentorTitle}>Share Your Experience</Text>
        <Text>How do you feel about today's session?</Text>
        <Text>Select an emoji to share your feedback with Club Mentor:</Text>
        <Text style={styles.messagePrompt}>Let them know below!</Text>

        <View style={styles.emojiContainer}>
          <TouchableOpacity style={styles.emojiButton} onPress={() => handleEmojiPress("😀")}>
            <Text style={styles.emoji}>😀</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.emojiButton} onPress={() => handleEmojiPress("😐")}>
            <Text style={styles.emoji}>😐</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.emojiButton} onPress={() => handleEmojiPress("😢")}>
            <Text style={styles.emoji}>😢</Text>
          </TouchableOpacity>
        </View>
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
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  emojiButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#FFC1E1',
  },
  emoji: {
    fontSize: 30,
  }
});

export default Help;
