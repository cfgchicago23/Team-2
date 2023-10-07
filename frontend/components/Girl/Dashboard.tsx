import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/colors';

const Dashboard = ({ studentName }) => {
  // Define any state variables you may need using the useState hook
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [alerts, setAlerts] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Thrive for Girls</Text>

      {/* Greeting with the student's name */}
      <Text style={styles.greeting}>Hello {studentName}!</Text>

      {/* Render the pink boxes for upcoming meetings, notifications, and alerts */}
      <View style={styles.box}>
        <Text style={styles.boxText}>Upcoming Meetings</Text>
        <Text style={styles.subText}>Friday, October 6 @ 5 pm</Text>
        <Text style={styles.subText}>JP Morgan Chase, Chicago USA</Text>
        {/* You can add content specific to upcoming meetings here */}
      </View>

      <View style={styles.box}>
        <Text style={styles.boxText}>Notifications</Text>
        <Text style={styles.subText}>Lorem impsum</Text>
        {/* You can add content specific to notifications here */}
      </View>

      <View style={styles.box}>
        <Text style={styles.boxText}>Alerts in Your Area</Text>
        <Text style={styles.subText}>Lorem impsum</Text>
        {/* You can add content specific to alerts here */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    marginLeft: -200,
  },
  box: {
    width: 350,
    height: 150,
    borderRadius: 20,
    backgroundColor: colors.pink,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'left',
  },
  subText: {
    fontSize: 16,
    color: 'black',
    marginTop: 0,
    marginLeft: 10,
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left', // Align text to the left
    position: 'absolute',
    left: 20,
    top: 20,
  },
});

export default Dashboard;