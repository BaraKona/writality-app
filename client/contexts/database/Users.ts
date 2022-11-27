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
