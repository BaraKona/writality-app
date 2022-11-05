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
  getCountFromServer,
} from "firebase/firestore";
const DatabaseContext = createContext();

export function useDatabaseContext() {
  return useContext(DatabaseContext);
}

export function DatabaseContextWrapper({ children }) {
  const [userProjects, setUserProjects] = useState([]);
  const [projectChapters, setProjectChapters] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [currentChapterContent, setCurrentChapterContent] = useState({});

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
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function createChapter(projectId) {
    const docId = uuidv4();
    const newChapter = doc(db, `projects/${projectId}/chapters/${docId}`);
    // const docRef = collection(db, "projects/" + projectId + "/chapters");
    // const counting = await getCountFromServer(docRef);
    // const count = counting.data().count;
    const data = {
      uid: docId,
      // chapterNumber: count + 1,
      projectID: projectId,
      chapterTitle: "New Chapter",
      createdAt: serverTimestamp(),
    };
    await setDoc(newChapter, data, { merge: true })
      .then(() => {
        createChapterContent(docId, projectId);
        return true;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function updateProjectTitle(id, title) {
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, {
      projectTitle: title,
    }).then((e) => {
      return title;
    });
  }
  async function createChapterContent(id, projectId) {
    const contentId = uuidv4();
    const docRef = doc(
      db,
      `projects/${projectId}/chapters/${id}/content/${contentId}`
    );
    const data = {
      uid: contentId,
      chapterId: id,
      projectId: projectId,
      createdAt: serverTimestamp(),
      content: "",
    };
    await setDoc(docRef, data, { merge: true })
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function updateChapterContent(
    projectId,
    chapterId,
    contentId,
    content
  ) {
    const docRef = doc(
      db,
      `projects/${projectId}/chapters/${chapterId}/content/${contentId}`
    );
    await updateDoc(docRef, {
      content: content,
      lastUpdated: serverTimestamp(),
    }).then((e) => {
      return true;
    });
  }
  async function getChapterContent(projectId, chapterId) {
    const docRef = collection(
      db,
      `projects/${projectId}/chapters/${chapterId}/content`
    );
    const queryData = query(docRef);
    try {
      const querySnapshot = await getDocs(queryData);
      const data = querySnapshot.docs.map((doc) => doc.data());
      return data[0];
    } catch (error) {
      console.log(error);
    }
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
    projectChapters,
    setProjectChapters,
    currentProject,
    setCurrentProject,
    updateProjectTitle,
    updateChapterContent,
    currentChapter,
    setCurrentChapter,
    createChapterContent,
    getChapterContent,
    currentChapterContent,
    setCurrentChapterContent,
  };
  return (
    <DatabaseContext.Provider value={sharedState}>
      {children}
    </DatabaseContext.Provider>
  );
}
