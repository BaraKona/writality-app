import { useState } from "react";
import { Editor, EditorWrapper } from "../../../../../components/Editor";
import { Sidebar } from "../../../../../components/Navigation";
import Header from "../../../../../components/Navigation/Header";

export const collaborationChapter = () => {
  const [text, setText] = useState("");
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Header header="Chapter" />
      <Sidebar>
        {/* <EditorWrapper
          backToProject={backButton}
          createVersion={createVersion}
          openBranchModal={() => setOpened(true)}
          save={save}
          chapter={currentChapter}
        >
          <Editor text={text} setText={setText} /> */}
        {/* <div className="min-w-[350px] h-[calc(100vh-100px)] border-l border-baseBorder px-5"> */}
        {/* <ChapterBranches
              openMergeModal={() => setMergeOpened(true)}
              checkoutBranch={checkoutBranch}
            />
            <ChapterVersions
              openMergeModal={() => setMergeOpened(true)}
              checkoutBranch={checkoutBranch}
            /> */}
        {/* </div> */}
        {/* </EditorWrapper> */}
      </Sidebar>
    </>
  );
};
