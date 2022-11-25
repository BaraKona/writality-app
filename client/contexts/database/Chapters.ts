import { db } from "../../api/firebase";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  where,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { IChapterContent } from "../../interfaces/IChapterContent";
import { IChapter } from "../../interfaces/IChapter";
import { IChapterVersion } from "../../interfaces/IChapterVersion";

export async function getUserChaptersByProjectId(
  projectId: string,
  userId: string
) {
  const docRef = collection(db, "projects/" + projectId + "/chapters");
  const queryData = query(
    docRef,
    where("projectID", "==", projectId),
    where("chapterOwner", "==", userId)
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
export async function createSingleUserChapter(
  projectId: string,
  userId: string
) {
  const docId = uuidv4();
  const newChapter = doc(db, `projects/${projectId}/chapters/${docId}`);
  const data = {
    uid: docId,
    // chapterNumber: count + 1,
    projectID: projectId,
    chapterTitle: "New Chapter",
    chapterOwner: userId,
    createdAt: serverTimestamp(),
  };
  await setDoc(newChapter, data, { merge: true })
    .then(() => {
      createSingleChapterContent(docId, projectId);
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
}
async function createSingleChapterContent(
  chapterId: string,
  projectId: string
) {
  const contentId = uuidv4();
  const docRef = doc(
    db,
    `projects/${projectId}/chapters/${chapterId}/content/${contentId}`
  );
  const data = {
    uid: contentId,
    chapterId,
    projectId,
    createdAt: serverTimestamp(),
    content: "",
    type: "main",
  };
  await setDoc(docRef, data, { merge: true })
    .then(() => {
      return;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}
export async function updateUserChapterContent(
  projectId: string,
  chapterId: string,
  contentId: string,
  content: IChapterContent
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
export async function getSingleChapterContent(
  projectId: string,
  chapterId: string
) {
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
export async function createSingleChapterBranch(
  projectId: string,
  chapterId: string,
  chapter: IChapter,
  branchName: string
) {
  const branchId = uuidv4();
  const docRef = doc(
    db,
    `projects/${projectId}/chapters/${chapterId}/branches/${branchId}`
  );
  const data = {
    uid: branchId,
    name: branchName,
    chapterId: chapterId,
    projectId: projectId,
    content: chapter.content,
    type: "branch",
    createdAt: serverTimestamp(),
  };
  await setDoc(docRef, data, { merge: true })
    .then(() => {
      console.log("branch created");
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function getAllChapterBranches(
  projectId: string,
  chapterId: string
) {
  const docRef = collection(
    db,
    `projects/${projectId}/chapters/${chapterId}/branches/`
  );
  const queryData = query(
    docRef,
    where("chapterId", "==", chapterId),
    orderBy("createdAt", "asc")
  );
  try {
    const querySnapshot = await getDocs(queryData);
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export async function updateSingleChapterBranch(
  projectId: string,
  chapterId: string,
  branchId: string,
  content: IChapterContent
) {
  const docRef = doc(
    db,
    `projects/${projectId}/chapters/${chapterId}/branches/${branchId}`
  );
  await updateDoc(docRef, {
    content: content,
    lastUpdated: serverTimestamp(),
  })
    .then(async () => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
export async function getAllChapterVersions(
  projectId: string,
  chapterId: string
) {
  const docRef = collection(
    db,
    `projects/${projectId}/chapters/${chapterId}/versions/`
  );
  const queryData = query(
    docRef,
    where("chapterId", "==", chapterId),
    orderBy("createdAt", "asc")
  );
  try {
    const querySnapshot = await getDocs(queryData);
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export async function createSingleChapterVersion(
  projectId: string,
  chapterId: string,
  content: IChapterVersion
) {
  const versionId = uuidv4();
  const docRef = doc(
    db,
    `projects/${projectId}/chapters/${chapterId}/versions/${versionId}`
  );
  console.log("content", content);
  const data = {
    uid: versionId,
    chapterId: chapterId,
    projectId: projectId,
    content: content,
    name: content.name || "Version",
    type: "version",
    createdAt: serverTimestamp(),
  };
  await setDoc(docRef, data, { merge: true })
    .then(async () => {
      console.log("version created");
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
}
