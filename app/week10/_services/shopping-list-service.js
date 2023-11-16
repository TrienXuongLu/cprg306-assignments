import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, where, onSnapshot, doc } from 'firebase/firestore';


export async function getItems(userId) {
    try {
        const collectionRef = collection(db, "users", userId, "items");
        const queryRef = query(collectionRef, where('quantity', '>', 0));
        console.log(queryRef);
        const queryArray = await getDocs(queryRef);
        console.log(queryArray);
        const itemArray = queryArray.docs.map((doc) => {
            console.log(doc);
            return ({id: doc.id, ...doc.data(),});
        });
        console.log(itemArray);
 
        return itemArray;
    } catch (e) {
        console.error("Error Message", e);
    }
};

export async function addItem(userId, element) {
    try {
        console.log(element.name);
        if(element.name === null || element.quantity > 100 || element.category === null) {
            throw new Error("Missing required fields");
        }

        const docRef = collection(db, "users", userId, "items");
        const newItem = await addDoc(docRef, element);
        console.log(newItem);
        return newItem;

    } catch (e) {
        console.error("Invalid element", e);
    }
};