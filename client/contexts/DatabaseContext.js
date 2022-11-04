import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../api/firebase";
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
  setDoc,
} from "firebase/firestore";
const DatabaseContext = createContext();

export function useDatabaseContext() {
  return useContext(DatabaseContext);
}

export function DatabaseContextWrapper({ children }) {
  const [userProjects, setUserProjects] = useState([]);
  const { currentUser } = useAuthContext();

  async function addANewProjectToDatabase(owner) {
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
      });
  }
  async function getAllUserProjects(owner) {
    const docRef = collection(db, "projects");
    const queryData = query(docRef, where("projectOwner", "==", owner));
    const querySnapshot = await getDocs(queryData);
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
    // setUserProjects(data);
  }
  async function getProjectById(id, userId) {
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
  async function getChaptersByProjectId(id) {
    const docRef = collection(db, "projects/" + id + "/chapters");
    const queryData = query(
      docRef,
      where("projectID", "==", id)
      // orderBy("chapterNumber", "asc")
    );
    try {
      const querySnapshot = await getDocs(queryData);
      const data = querySnapshot.docs.map((doc) => doc.data());
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function createChapter(projectId) {
    const docId = uuidv4();
    const newChapter = doc(db, `projects/${projectId}/chapters/${docId}`);
    const data = {
      uid: docId,
      projectID: projectId,
      chapterTitle: "New Chapter",
      createdAt: serverTimestamp(),
    };
    await setDoc(newChapter, data, { merge: true })
      .then(() => {
        console.log("chapter created");
        return 1;
      })
      .catch((error) => {
        console.log(error);
      });
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
