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

export async function addNewProjectToDatabase(owner: string) {
  const docId = uuidv4();
  const newProject = doc(db, `projects/${docId}`);
  const data = {
    uid: docId,
    projectOwner: owner,
    projectTitle: "New Project",
    createdAt: serverTimestamp(),
  };
  await setDoc(newProject, data)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
export async function getUserProjects(owner: string) {
  const docRef = collection(db, "projects");
  const queryData = query(docRef, where("projectOwner", "==", owner));
  const querySnapshot = await getDocs(queryData);
  const data = querySnapshot.docs.map((doc) => doc.data());
  return data;
  // setUserProjects(data);
}
export async function updateUserProjectTitle(id: string, title: string) {
  const docRef = doc(db, "projects", id);
  await updateDoc(docRef, {
    projectTitle: title,
  }).then((e) => {
    return title;
  });
}
export async function getSingleProjectById(id: string, userId: string) {
  const docRef = collection(db, "projects");
  const queryData = query(
    docRef,
    where("uid", "==", id),
    where("projectOwner", "==", userId)
  );
  try {
    const querySnapshot = await getDocs(queryData);
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data[0];
  } catch (error) {
    return "you don't have access to this project";
  }
}
