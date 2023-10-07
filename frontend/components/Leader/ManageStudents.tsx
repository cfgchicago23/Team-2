import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../firebase/firebaseConfig";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { tabParamsList } from "./LeaderNav";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";
import colors from "../../constants/colors";
import * as Progress from "react-native-progress";
import { fetchUserData } from "../../firebase/firestore";

type Props = BottomTabScreenProps<tabParamsList, "ManageClub">;

export type LoadingProps = {
  user: any;
  userData: any;
  fetchUserData: any;
  setUserData: any;
};

const ManageStudents = ({ route, navigation }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [students, setStudents] = useState<DocumentData[]>([]);
  const [error, setError] = useState("");
  const user: User = route.params.user;
  const [userData, setUserData] = useState<DocumentData>();
  const [refreshing, setRefreshing] = useState(false);
  const typeMap = new Map();
  typeMap.set("1", "😀");
  typeMap.set("2", "😐");
  typeMap.set("3", "😢");
  const handleAddYouth = () => {
    if (email !== undefined) {
      const q = query(
        collection(db, "users"),
        where("email", "==", email),
        where("type", "==", "Youth")
      );
      getDocs(q)
        .then((userList: QuerySnapshot) => {
          userList.forEach((document: DocumentData) => {
            if (document.data().club === null) {
              updateDoc(doc(db, "users", document.id), {
                club: user.uid,
              });
              setTemporaryError("User added.");
            } else {
              setTemporaryError("This user cannot be added.");
            }
          });
        })
        .catch((error: FirebaseError) => {
          console.log(error);
        });
    }
  };
  
  const setTemporaryError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 3000); 
  };
  

  const fetchStudents = () => {
    const q = query(
      collection(db, "users"),
      where("club", "==", user.uid),
      where("type", "==", "Youth")
    );
    getDocs(q)
      .then((userList: QuerySnapshot<DocumentData>) => {
        const fetchedStudents = userList.docs.map((doc) => ({
          ...doc.data(),
          key: doc.id,
        }));

        setStudents(fetchedStudents);
      })
      .catch((err: FirebaseError) => {
        console.error("Error fetching students: ", err.message);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, [user.uid]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchStudents();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  function getMoodColor(mood: any): string | undefined {
    if (mood === "3") {
      return 'rgba(255, 0, 0, 0.5)'; //red opaque
    } else if( mood === "2") {
      return 'rgba(255, 165, 0, 0.5)'; //orange opaque
    } else {
      return 'rgba(0, 128, 0, 0.5)'; //green opaque
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Manage Students</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddYouth}>
          <Text style={styles.addButtonText}>Add Youth</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.ErrorText}>{error}</Text>

      <FlatList
        data={students}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <View style={styles.studentItem}>
            <Text style={styles.studentName}>{typeMap.get(item.mood)} {item.name} </Text>
            
            <Progress.Bar
              progress={0.5}
              width={300}
              color={getMoodColor(item.mood)}
              style={styles.progressBar}
            />
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  Button: {
    width: 250,
    margin: 10,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#3498db",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  ButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  ErrorText: {
    textAlign: "center",
    color: "red",
    fontSize: 15,
    marginTop: 10,
  },
  item: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  inputContainer: {
    flexDirection: "row",
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  TextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  addButton: {
    margin: 5,
    padding: 10,
    alignItems: "center",
    backgroundColor: colors.pink,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  studentItem: {
    width: "100%",
    padding: 10,
    flexDirection: "column", // Vertical layout
    alignItems: "flex-start", // Align items to the left
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  studentName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5, 
  },
  progressBar: {
    marginTop: 5, 
  },
});

export default ManageStudents;
