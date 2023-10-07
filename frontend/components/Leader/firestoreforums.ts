import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

export async function uploadEvaluation(evaluation: string, email: string){
    const db = getFirestore()

    const docRef = doc(db, "evals", "list");

    const snapshot = await getDoc(docRef);

    const datalist = snapshot.data()

    const newList = datalist!.values
    
    newList.push({
        message: evaluation,
        user: email
    })

    await setDoc(doc(db, "evals", "list"), {
        values: newList
    }).catch((error) => console.log(error));

    return {}
}

export async function getMessages(){
    const db = getFirestore()

    const docRef = doc(db, "evals", "chats");

    const snapshot = await getDoc(docRef);

    const datalist = snapshot.data()

    return datalist!.values
    
}

export async function uploadMessage(message: string, email: string){
    const db = getFirestore()

    const docRef = doc(db, "evals", "chats");

    const snapshot = await getDoc(docRef);

    const datalist = snapshot.data()

    const newList = datalist!.values
    
    newList.push({
        message: message,
        user: email,
        id: String(new Date())
    })

    await setDoc(doc(db, "evals", "chats"), {
        values: newList
    }).catch((error) => console.log(error));

    return newList

}