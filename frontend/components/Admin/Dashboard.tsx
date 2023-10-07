import React, {useEffect, useState} from 'react';
import { View, Text, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
const Dashboard = () => {  
    const [reports, setReports] = useState<string[]>([]);

    useEffect(() => {
        fetchReportData();
    }, []);

    const fetchReportData = () => {
        const adminRef = doc(db, 'evals', 'list');
        getDoc(adminRef).then((adminData: DocumentData) => {
            setReports(adminData.data().values);
        }).catch((error: FirebaseError) => {
            handleError(error);
        });
    }

    const handleError = (error: FirebaseError) => {
      const errorCode: string = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <Text>Dashboard</Text>
            {
              reports.map((item: any) => {
                return <View key={item.id} style={styles.item}>
                  <Text>{item.user}:</Text>
                  <Text>{item.message}</Text>
                  </View>
              })
            }
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

export default Dashboard;