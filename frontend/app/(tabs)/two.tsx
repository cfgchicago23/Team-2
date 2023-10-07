import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Import your JSON data (replace './data.json' with the actual path to your JSON file)
import lessonData from '../../data.json';

export default function TabTwoScreen() {
  // Define the Module component to display a rectangle with a number, icon, and topic
  const Module = ({ number, topic }) => (
    <View style={styles.moduleContainer}>
      <View style={styles.rectangle}>
      <Text style={styles.moduleNumber}>Lesson {number}</Text>
        <Text style={styles.moduleTopic}>{topic}</Text>
        <FontAwesome name="star" size={24} color="black" />
      </View>
    </View>
  );

  // Map the lessonData to create modules
  const modules = lessonData.map((lesson) => ({
    number: lesson.number,
    topic: lesson.topic, // Add the topic property from the JSON data
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Lessons</Text>
      {modules.map((module, index) => (
        <Module
          key={index}
          number={module.number}
          topic={module.topic} // Pass the topic as a prop
        />
      ))}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* EditScreenInfo component */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4ECFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: -150,
  },
  separator: {
    marginVertical: 50,
    height: 1,
    width: '80%',
  },
  moduleContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  rectangle: {
    width: 200,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#DF91C0', // Customize the rectangle's appearance as needed
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20, // Adjust the margin as needed to align the rectangles
    marginLeft: 20,
  },
  moduleNumber: {
    color: 'black',
    fontWeight: 'bold',
  },
  moduleTopic: {
    color: 'black', // Change the text color to black
    fontWeight: 'bold',
  },
});