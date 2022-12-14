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
  addCollaborativeProjectCollaborator,
  getUserCollaborations,
  getSingleCollaborativeProjectByIdForCollaborator,
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
  createSingleCollaborativeChapter,
  getCollaborativeChaptersByProjectId,
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
  const [userCollaborations, setUserCollaborations] = useState([]);
  const [collaboration, setCollaboration] = useState({});
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
          useToast("error", "Oops... something has gone wrong!");
        });
    });
  }
  async function getAllCollabChaptersByProjectId(id) {
    await getCollaborativeChaptersByProjectId(id).then((chapters) => {
      setProjectChapters(chapters);
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
          useToast("error", "Oops... something has gone wrong!");
        });
    });
  }
  async function createCollabChapter(projectId) {
    return await createSingleCollaborativeChapter(
      projectId,
      currentUser.uid
    ).then(() => {
      getAllCollabChaptersByProjectId(projectId);
      useToast("success", "Chapter created successfully");
    });
  }
  async function getAllUserCollaborativeProjects(owner) {
    await getUserCollaborativeProjects(owner).then((projects) => {
      setUserCollaborativeProjects(projects);
    });
  }
  async function getAllUserCollaborations(owner) {
    await getUserCollaborations(owner).then((projects) => {
      setUserCollaborations(projects);
    });
  }
  async function addACollaborativeProjectCollaborator(
    projectId,
    collaboratorId
  ) {
    await addCollaborativeProjectCollaborator(projectId, collaboratorId)
      .then(() => {
        getAllUserCollaborativeProjects(currentUser.uid);
        useToast("success", "Collaborator added successfully");
      })
      .catch((error) => {
        console.log(error);
        useToast(
          "error",
          "Ooops... something has gone wrong! Collaborator not added 😞"
        );
      });
  }
  async function getCollaborativeProjectById(id, userId) {
    await getSingleCollaborativeProjectById(id, userId).then((project) => {
      if (project) {
        setCollaboration(project);
      }
    });
  }
  async function getASingleCollaborativeProjectByIdForCollaborator(
    projectId,
    userId
  ) {
    await getSingleCollaborativeProjectByIdForCollaborator(
      projectId,
      userId
    ).then((project) => {
      if (project) {
        setCollaboration(project);
      }
    });
  }
  async function updateProjectTitle(id, title) {
    return await updateUserProjectTitle(id, title);
  }
  async function getProjectById(id, userId) {
    await getSingleProjectById(id, userId).then(async (project) => {
      getChaptersByProjectId(id, userId);
      setCurrentProject(project);
    });
  }
  async function createChapter(projectId, userId) {
    await createSingleUserChapter(projectId, userId).then(() => {
      getChaptersByProjectId(projectId, userId);
      useToast("success", "Chapter added successfully");
    });
  }
  async function getChaptersByProjectId(projectId, userId) {
    await getUserChaptersByProjectId(projectId, userId).then((chapters) => {
      setProjectChapters(chapters);
    });
  }
  async function updateChapterContent(
    projectId,
    chapterId,
    contentId,
    content
  ) {
    await updateUserChapterContent(projectId, chapterId, contentId, content)
      .then(async () => {
        setCurrentChapterContent(await getChapterContent(projectId, chapterId));
        useToast("success", "Chapter content saved");
      })
      .catch((error) => {
        console.log(error);
        useToast("error", "Chapter content not saved");
      });
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
    await updateSingleChapterBranch(projectId, chapterId, branchId, content)
      .then(async () => {
        setCurrentChapterBranches(
          await getAllChapterBranches(projectId, chapterId)
        );
        useToast("success", "Chapter branch content saved");
      })
      .catch((error) => {
        console.log(error);
        useToast("error", "Chapter branch content not saved");
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
    )
      .then(async () => {
        setCurrentChapterContent(await getChapterContent(projectId, chapterId));
        setCurrentChapterVersions(
          await getChapterVersions(projectId, chapterId)
        );
        setMergeOpened(false);
        useToast("success", "Branch merged into main");
      })
      .catch((error) => {
        console.log(error);
        useToast("error", "Branch not merged into main");
      });
  }
  async function mergeBranchIntoMain(
    projectId,
    chapterId,
    mainChapterContentID,
    branchContent,
    position
  ) {
    console.log("onSomething ", currentChapterContent.content, branchContent);
    await mergeBranchOntoMain(
      projectId,
      chapterId,
      mainChapterContentID,
      branchContent,
      position,
      currentChapterContent.content
    )
      .then(async () => {
        setCurrentChapterContent(await getChapterContent(projectId, chapterId));
        setCurrentChapterVersions(
          await getChapterVersions(projectId, chapterId)
        );
        useToast("success", "Branch merged into main");
      })
      .catch((error) => {
        console.log(error);
        useToast("error", "Branch not merged into main");
      });
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
    addACollaborativeProjectCollaborator,
    getAllUserCollaborations,
    userCollaborations,
    getASingleCollaborativeProjectByIdForCollaborator,
    getAllCollabChaptersByProjectId,
    createCollabChapter,
    collaboration,
    setCollaboration,
  };
  return (
    <DatabaseContext.Provider value={sharedState}>
      {children}
    </DatabaseContext.Provider>
  );
}
