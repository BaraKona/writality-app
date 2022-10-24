import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../pages/api/firebase";
import { useAuthContext } from "./AuthContext";

import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { updateCurrentUser } from "firebase/auth";
const DatabaseContext = createContext();

export function useDatabaseContext() {
  return useContext(DatabaseContext);
}

export function DatabaseContextWrapper({ children }) {
  const [userProjects, setUserProjects] = useState([]);
  const { currentUser } = useAuthContext();

  async function addANewProjectToDatabase(owner) {
    try {
      const docRef = await addDoc(collection(db, "projects"), {
        projectOwner: owner,
        projectTitle: "New Project",
        createdAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  async function getAllUserProjects(owner) {
    const docRef = collection(db, "projects");
    const queryData = query(docRef, where("projectOwner", "==", owner));
    const querySnapshot = await getDocs(queryData);
    const data = querySnapshot.docs.map((doc) => doc.data());
    setUserProjects(data);
  }
  useEffect(() => {
    if (currentUser) {
      getAllUserProjects(currentUser.uid)
        .then((fetchedProjects) => {
          setUserProjects(fetchedProjects);
          console.log("fetched");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  const sharedState = {
    addANewProjectToDatabase,
    getAllUserProjects,
    userProjects,
    setUserProjects,
  };
  return (
    <DatabaseContext.Provider value={sharedState}>
      {children}
    </DatabaseContext.Provider>
  );
}
