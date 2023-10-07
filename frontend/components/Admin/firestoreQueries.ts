import { FirebaseError } from "firebase/app";
import { doc, collection, getFirestore, query, where, getDocs, setDoc, updateDoc, } from "firebase/firestore";

//get firestore reference and find user by email
export async function findUserByEmail(email: string) {
    const db = getFirestore();
    const usersRef = collection(db, "users");

    // Create a query against the collection.
    const q = query(usersRef, where("email", "==", email), where("type", "==", "Leader"), where("club", "==", null));

    const snapshot = await getDocs(q);
    if (snapshot.empty){
        return {
            id: null,
            message: "Please enter a valid Leader's email address."
        }
    }
    let id = ""
    snapshot.forEach((doc) => {
        id = doc.id;
    })
    return {
        id: id,
        message: "success"
    }
}

export function createNewClubFirestore(uid: string, clubName: string){
     //sets new club document in firestore
     const db = getFirestore();
     setDoc(doc(db, "clubs", uid), {
            name: clubName,
            dashboard: [],
    }).catch((error) => console.log(error));

    updateDoc(doc(db, "users", uid), {
        club: uid,
    }).catch((error) => console.log(error));

    return {}
}