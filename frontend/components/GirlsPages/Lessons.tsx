import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Button, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import lessonData from './data.json';

const Lessons = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Define the Module component to display a rectangle with a number, icon, and topic
  const Module = ({ number, topic }) => {
    const lesson = lessonData.find((lesson) => lesson.number === number);

    const handleModuleClick = () => {
      setSelectedLesson(lesson);
      setModalVisible(true);
    };

    return (
      <TouchableOpacity onPress={handleModuleClick}>
        <View style={styles.moduleContainer}>
          <View style={styles.rectangle}>
            <Text style={styles.moduleNumber}>Lesson {number}</Text>
            <Text style={styles.moduleTopic}>{topic}</Text>
            <FontAwesome name="star" size={24} color="black" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        {selectedLesson && (
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Lesson {selectedLesson.number}</Text>
            <Text style={styles.modalTopic}>{selectedLesson.topic}</Text>
            <Text style={styles.modalDescription}>{selectedLesson.description}</Text>
            {/* Add any other information you want to display */}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        )}
      </Modal>
    </View>
  );
};

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
  moduleContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  rectangle: {
    width: 200,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#DF91C0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
  moduleNumber: {
    color: 'black',
    fontWeight: 'bold',
  },
  moduleTopic: {
    color: 'black',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTopic: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Lessons;