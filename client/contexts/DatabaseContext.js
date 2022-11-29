import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import {
  addNewProjectToDatabase,
  getUserProjects,
  updateUserProjectTitle,
  getSingleProjectById,
  addNewCollaborativeProject,
  getUserCollaborativeProjects,
  getSingleCollaborativeProjectById,
} from "./database/Projects";
import {
  getUserChaptersByProjectId,
  createSingleUserChapter,
  updateUserChapterContent,
  getSingleChapterContent,
  createSingleChapterBranch,
  getAllChapterBranches,
  updateSingleChapterBranch,
  getAllChapterVersions,
  createSingleChapterVersion,
} from "./database/Chapters";
import {
  mergeBranchAndReplaceMain,
  mergeBranchOntoMain,
} from "./database/Merge";
import { useToast } from "../hooks/useToast";
const DatabaseContext = createContext();

export function useDatabaseContext() {
  return useContext(DatabaseContext);
}

export function DatabaseContextWrapper({ children }) {
  const [userProjects, setUserProjects] = useState([]);
  const [userCollaborativeProjects, setUserCollaborativeProjects] = useState(
    []
  );
  const [projectChapters, setProjectChapters] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [currentChapterContent, setCurrentChapterContent] = useState({});
  const [currentChapterBranch, setCurrentChapterBranch] = useState({});
  const [currentChapterBranches, setCurrentChapterBranches] = useState([]);
  const [currentChapterVersions, setCurrentChapterVersions] = useState([]);
  const [mainChapterContent, setMainChapterContent] = useState({});
  const { currentUser } = useAuthContext();

  async function addANewProjectToDatabase(owner) {
    await addNewProjectToDatabase(owner).then(() => {
      getUserProjects(currentUser.uid)
        .then((projects) => {
          setUserProjects(projects);
          useToast("success", "Project created successfully");
        })
        .catch((error) => {
          useToast("error", "Ooops... something has gone wrong!");
        });
    });
  }
  async function getAllUserProjects(owner) {
    await getUserProjects(owner).then((projects) => {
      setUserProjects(projects);
    });
  }
  async function addANewCollaborativeProject(owner) {
    return await addNewCollaborativeProject(owner).then(() => {
      getUserCollaborativeProjects(currentUser.uid)
        .then((projects) => {
          setUserCollaborativeProjects(projects);
          useToast("success", "Project created successfully");
        })
        .catch((error) => {
          useToast("error", "Ooops... something has gone wrong!");
        });
    });
  }
  async function getAllUserCollaborativeProjects(owner) {
    await getUserCollaborativeProjects(owner).then((projects) => {
      setUserCollaborativeProjects(projects);
    });
  }
  async function getCollaborativeProjectById(id, userId) {
    return await getSingleCollaborativeProjectById(id, userId);
  }
  async function updateProjectTitle(id, title) {
    return await updateUserProjectTitle(id, title);
  }
  async function getProjectById(id, userId) {
    return await getSingleProjectById(id, userId);
  }
  async function createChapter(projectId, userId) {
    return await createSingleUserChapter(projectId, userId);
  }
  async function getChaptersByProjectId(projectId, userId) {
    return await getUserChaptersByProjectId(projectId, userId);
  }
  async function updateChapterContent(
    projectId,
    chapterId,
    contentId,
    content
  ) {
    return await updateUserChapterContent(
      projectId,
      chapterId,
      contentId,
      content
    );
  }
  async function getChapterContent(projectId, chapterId) {
    const chapterContent = await getSingleChapterContent(projectId, chapterId);
    setMainChapterContent(chapterContent);
    return chapterContent;
  }
  async function createChapterBranch(
    projectId,
    chapterId,
    chapter,
    branchName
  ) {
    return await createSingleChapterBranch(
      projectId,
      chapterId,
      chapter,
      branchName
    );
  }
  async function getChapterBranches(projectId, chapterId) {
    return await getAllChapterBranches(projectId, chapterId);
  }
  async function updateChapterBranch(projectId, chapterId, branchId, content) {
    await updateSingleChapterBranch(
      projectId,
      chapterId,
      branchId,
      content
    ).then(async () => {
      setCurrentChapterBranches(
        await getAllChapterBranches(projectId, chapterId)
      );
    });
  }
  async function getChapterVersions(projectId, chapterId) {
    return await getAllChapterVersions(projectId, chapterId);
  }
  async function createChapterVersion(projectId, chapterId, content) {
    await createSingleChapterVersion(projectId, chapterId, content).then(
      async () => {
        setCurrentChapterVersions(
          await getChapterVersions(projectId, chapterId)
        );
      }
    );
  }
  async function mergeBranchReplaceMain(
    projectId,
    chapterId,
    mainChapterContentID,
    branchContent
  ) {
    await mergeBranchAndReplaceMain(
      projectId,
      chapterId,
      mainChapterContentID,
      branchContent,
      currentChapterContent.content
    );
  }
  async function mergeBranchIntoMain(
    projectId,
    chapterId,
    mainChapterContentID,
    branchContent,
    position
  ) {
    return await mergeBranchOntoMain(
      projectId,
      chapterId,
      mainChapterContentID,
      branchContent,
      position,
      currentChapterContent.content
    );
  }
  // useEffect(() => {
  // async function getUserProjects() {
  //   if (currentUser) {
  //     console.log();
  //     try {
  //       const fetchedProjects = await getAllUserProjects(currentUser.uid);
  //       setUserProjects(fetchedProjects);
  //       console.log("fetched", fetchedProjects);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }
  // getUserProjects();
  // }, []);
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
    getChapterContent,
    currentChapterContent,
    setCurrentChapterContent,
    createChapterBranch,
    getChapterBranches,
    currentChapterBranch,
    setCurrentChapterBranch,
    currentChapterBranches,
    setCurrentChapterBranches,
    updateChapterBranch,
    createChapterVersion,
    getChapterVersions,
    mainChapterContent,
    setMainChapterContent,
    currentChapterVersions,
    setCurrentChapterVersions,
    mergeBranchReplaceMain,
    mergeBranchIntoMain,
    addANewCollaborativeProject,
    getAllUserCollaborativeProjects,
    userCollaborativeProjects,
    setUserCollaborativeProjects,
    getCollaborativeProjectById,
  };
  return (
    <DatabaseContext.Provider value={sharedState}>
      {children}
    </DatabaseContext.Provider>
  );
}
