import { db } from "../../api/firebase";
import { v4 as uuidv4 } from "uuid";

import {
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

export async function getAllUsers() {
  const docRef = collection(db, "users");
  const queryData = query(docRef);
  const querySnapshot = await getDocs(queryData);
  const data = querySnapshot.docs.map((doc) => doc.data());
  return data;
}
export async function getSingleUserById(id: string) {
  const docRef = collection(db, "users");
  console.log(docRef, id);
  const queryData = query(docRef, where("uid", "==", id));
  try {
    const querySnapshot = await getDocs(queryData);
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data[0];
  } catch (error) {
    console.log(error);
  }
}
