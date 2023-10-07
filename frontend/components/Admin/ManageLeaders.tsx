import React, {useState} from 'react';
import {View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
const ManageLeaders = () => {  

 return (
    <SafeAreaView style={styles.container}>
        <Text>Manage Leaders</Text>
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

export default ManageLeaders;