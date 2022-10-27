import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../pages/api/firebase";
import { useAuthContext } from "./AuthContext";
import { v4 as uuidv4 } from "uuid";

import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  query,
  orderBy,
  serverTimestamp,
  where,
  doc,
  updateDoc,
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
        uid: uuidv4(),
        projectOwner: owner,
        projectTitle: "New Project",
        createdAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      const newDocs = await getAllUserProjects(owner);
      setUserProjects(newDocs);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  async function getAllUserProjects(owner) {
    const docRef = collection(db, "projects");
    const queryData = query(docRef, where("projectOwner", "==", owner));
    const querySnapshot = await getDocs(queryData);
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
    // setUserProjects(data);
  }
  async function getProjectById(id) {
    const docRef = collection(db, "projects");
    const queryData = query(
      docRef,
      where("uid", "==", id),
      where("projectOwner", "==", currentUser.uid)
    );
    try {
      const querySnapshot = await getDocs(queryData);
      const data = querySnapshot.docs.map((doc) => doc.data());
      return data;
    } catch (error) {
      return "you don't have access to this project";
    }
  }
  async function getChaptersByProjectId(id) {
    const docRef = collection(db, "chapters");
    const queryData = query(
      docRef,
      where("projectID", "==", id),
      orderBy("chapterNumber", "asc")
    );
    const querySnapshot = await getDocs(queryData);
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  }
  async function createChapter(projectId) {
    const docRef = await addDoc(collection(db, "chapters"), {
      uid: uuidv4(),
      projectID: projectId,
      chapterTitle: "New Chapter",
      createdAt: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    const Doc = doc(db, "chapters", docRef.id);
    const newDocs = await getChaptersByProjectId(projectId);
    console.log(newDocs);
    await updateDoc(Doc, {
      chapterNumber: newDocs.length + 1,
    });
    return newDocs;
  }
  useEffect(() => {
    async function getUserProjects() {
      if (currentUser) {
        try {
          const fetchedProjects = await getAllUserProjects(currentUser.uid);
          setUserProjects(fetchedProjects);
          console.log("fetched", fetchedProjects);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getUserProjects();
  }, [currentUser]);
  const sharedState = {
    addANewProjectToDatabase,
    getAllUserProjects,
    userProjects,
    setUserProjects,
    getProjectById,
    getChaptersByProjectId,
    createChapter,
  };
  return (
    <DatabaseContext.Provider value={sharedState}>
      {children}
    </DatabaseContext.Provider>
  );
}
