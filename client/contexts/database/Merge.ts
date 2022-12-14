import { db } from "../../api/firebase";
import {
  createSingleChapterVersion,
  getSingleChapterContent,
} from "./Chapters";
import { IChapterContent } from "../../interfaces/IChapterContent";
import {
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

export async function mergeBranchAndReplaceMain(
  projectId: string,
  chapterId: string,
  mainChapterContentID: string,
  branchContent: IChapterContent,
  currentContent: IChapterContent
) {
  await createSingleChapterVersion(projectId, chapterId, currentContent).then(
    async () => {
      const docRef = doc(
        db,
        `projects/${projectId}/chapters/${chapterId}/content/${mainChapterContentID}`
      );
      await updateDoc(docRef, {
        content: branchContent.content,
        lastUpdated: serverTimestamp(),
      }).then(async () => {
        await getSingleChapterContent(projectId, chapterId);
        return true;
      });
    }
  );
}
export async function mergeBranchOntoMain(
  projectId: string,
  chapterId: string,
  mainChapterContentID: string,
  branchContent: IChapterContent,
  position: string,
  currentChapterContent: IChapterContent
) {
  await createSingleChapterVersion(
    projectId,
    chapterId,
    currentChapterContent
  ).then(async () => {
    const docRef = doc(
      db,
      `projects/${projectId}/chapters/${chapterId}/content/${mainChapterContentID}`
    );
    if (position === "top") {
      await updateDoc(docRef, {
        content: branchContent.content + currentChapterContent,
        lastUpdated: serverTimestamp(),
      }).then(async () => {
        await getSingleChapterContent(projectId, chapterId);
        return true;
      });
    } else if (position === "bottom") {
      await updateDoc(docRef, {
        content: currentChapterContent + branchContent.content,
        lastUpdated: serverTimestamp(),
      }).then(async () => {
        await getSingleChapterContent(projectId, chapterId);
        return true;
      });
    }
  });
}
