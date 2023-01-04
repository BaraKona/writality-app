import { FC, useState } from "react";
import { Editor, EditorWrapper } from "../../../components/Editor";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleCollabChapter } from "../../../api/collaboration/collabChapters";
import { useQuery } from "react-query";

export const CollaborationChapter: FC = () => {
  const { chapterId, collaborationId } = useParams();
  const [opened, setOpened] = useState(false);
  const [updateContentModalOpen, setUpdateContentModalOpen] = useState(false);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const { data: chapter } = useQuery(
    ["chapter", collaborationId],
    () =>
      getSingleCollabChapter(collaborationId as string, chapterId as string),
    { enabled: !!collaborationId }
  );

  return (
    <EditorWrapper
      backToProject={() =>
        navigate(`/dashboard/collaboration/${collaborationId}`)
      }
      createVersion={() => {}}
      openBranchModal={() => setOpened(true)}
      save={() => {}}
      content={chapter?.content}
      title="hhh"
    >
      <Editor
        text={text}
        setOpen={setUpdateContentModalOpen}
        setText={setText}
        chapterContent={chapter?.content}
      />
    </EditorWrapper>
  );
};
