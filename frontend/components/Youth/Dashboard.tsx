import React, { useEffect, useState } from 'react';
import { Text, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { tabParamsList } from './YouthNav';

type Props = BottomTabScreenProps<tabParamsList, 'Dashboard'>;

const Dashboard = ({ route, navigation }: Props) => {
    const [events, setEvents] = useState<string[]>([]);
    const user = route.params.user;

    useEffect(() => {
        fetchEventsData();
    });

    const fetchEventsData = () => {
        const userRef = doc(db, 'users', user.uid);
        getDoc(userRef).then((userData: DocumentData) => {
            const clubRef = doc(db, 'clubs', userData.data().club);
            getDoc(clubRef).then((clubData: DocumentData) => {
                setEvents(clubData.data().dashboard);
            }).catch((error: FirebaseError) => {
                handleError(error);
            });
        }).catch((error: FirebaseError) => {
            handleError(error);
        });

    }
    
    const handleError = (error: FirebaseError) => {
        const errorCode: string = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    }

  return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Announcements</Text>

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

export default Dashboard;