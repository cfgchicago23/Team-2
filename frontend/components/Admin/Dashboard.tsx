import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, ScrollView, RefreshControl } from 'react-native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
const Dashboard = () => {  
    const [reports, setReports] = useState<string[]>([]);
    const[refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => {
        fetchReportData();
    }, []);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      fetchReportData();
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
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
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
              <Text style={styles.title}>Dashboard</Text>
              {
                reports.map((item: any) => {
                  console.log(item.id);
                  return <View key={item.id} style={styles.item}>
                    <Text style={styles.bold}>{item.user}:</Text>
                    <Text>{item.message}</Text>
                    </View>
                })
              }
            </ScrollView>
        </SafeAreaView>
    )
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
    item: {
      padding: 15,
      backgroundColor: '#ffffff',
      borderRadius: 20,
      marginBottom: 10,
      fontSize: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      paddingVertical: 20
    },
    bold: {
      fontWeight: "bold"
    }
  });

export default Dashboard;