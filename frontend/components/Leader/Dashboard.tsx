import React, {useState} from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
const LeaderDashboard = () => {
    const [events, setEvents] = useState<string[]>([]);
    const [eventName, setEventName] = useState<string>('');


    const addEvent = () => {
      if (eventName.trim()) {
        setEvents([...events, eventName.trim()]);
        setEventName('');
      }
    };

  return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Announcements</Text>


          <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  value={eventName}
                  placeholder="Enter event name"
                  onChangeText={setEventName}
              />
              <TouchableOpacity style={styles.addButton} onPress={addEvent}>
                  <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
          </View>


          <FlatList
              data={events}
              renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
              keyExtractor={(item, index) => index.toString()}
          />
      </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
      paddingTop: 50,
  },
  title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
  },
  inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
  },
  input: {
      flex: 1,
      height: 50,
      borderColor: '#e0e0e0',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 15,
      backgroundColor: '#ffffff',
  },
  addButton: {
      marginLeft: 10,
      backgroundColor: colors.light_pink,
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
  },
  addButtonText: {
      color: '#ffffff',
      fontWeight: 'bold',
  },
  item: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    marginBottom: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
},
});


export default LeaderDashboard;