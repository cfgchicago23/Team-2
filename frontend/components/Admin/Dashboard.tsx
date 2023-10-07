import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
const Dashboard = () => {  
    return(
        <SafeAreaView style={styles.container}>
            <Text>Dashboard</Text>
        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Dashboard;