// @ts-ignore
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { FC, useState } from "react";
import { IChapterContent } from "../../interfaces/IChapterContent";
import { Divider, Skeleton, Textarea } from "@mantine/core";
import { inputStyles } from "../../styles/inputStyles";
import { SmallText } from "../texts/SmallText";
import { BlockNoteEditor } from "@blocknote/core";
import { useThemeContext } from "../../Providers/ThemeProvider";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import debounce from "lodash.debounce";
import { useAuthContext } from "../../contexts/AuthContext";

export const BlockEditor: FC<{
  content: IChapterContent["content"];
  isLoading: boolean;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  isEditable?: boolean;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  editorContent: string;
  setWordCount: React.Dispatch<React.SetStateAction<number>>;
  wordCount: number;
  createBranch?: () => void;
  title: string;
  save: ({
    content,
    wordCount,
  }: {
    content: string;
    wordCount: number;
  }) => void | Promise<void>;
}> = ({
  content,
  isLoading,
  setTitle,
  isEditable,
  setContent,
  editorContent,
  setWordCount,
  wordCount,
  createBranch,
  save,
  title,
}) => {
  const [close, setClose] = useState(false);
  const { currentUser } = useAuthContext();

  const editor = useBlockNote(
    {
      initialContent: content ? JSON.parse(content) : null,
      onEditorReady: (editor) => {
        setContent(JSON.stringify(editor.topLevelBlocks));
        setWordCount(countWordsFromTopLevelBlocks(editor.topLevelBlocks));
      },
      onEditorContentChange: (editor) => {
        const editedId = editor.getTextCursorPosition().block.id;
        const block = editor.getBlock(editedId);

        // @ts-ignore
        block.userId = currentUser?._id;
        // @ts-ignore
        block.dateUpdated = new Date().toISOString();

        setContent(JSON.stringify(editor.topLevelBlocks));
        setWordCount(countWordsFromTopLevelBlocks(editor.topLevelBlocks));
        saveDoc();
      },

      domAttributes: {
        blockContainer: {
          class: "dark:!text-coolGrey-3 !text-coolGrey-7",
        },
        editor: {
          class: "!bg-transparent",
        },
      },
      editable: isEditable,
    },
    [content, isEditable],
  );

  const saveDoc = debounce(() => {
    save({
      content: JSON.stringify(editor.topLevelBlocks),
      wordCount: countWordsFromTopLevelBlocks(editor.topLevelBlocks),
    });
    const text = JSON.stringify(editor.topLevelBlocks);

    console.log({
      text,
    });
  }, 500);

  const { theme } = useThemeContext();

  function countWordsFromTopLevelBlocks(
    topLevelBlocks: BlockNoteEditor["topLevelBlocks"],
  ) {
    let wordCount = 0;

    function countWordsInText(text: string) {
      const words = text.trim().split(/\s+/);
      return words.length;
    }

    topLevelBlocks.forEach((block) => {
      if (
        block.type === "paragraph" ||
        block.type === "heading" ||
        block.type === "numberedListItem" ||
        block.type === "bulletListItem"
      ) {
        wordCount += block.content.reduce((acc: any, content: any) => {
          if (content.type === "text") {
            return acc + countWordsInText(content.text);
          }
          return acc;
        }, 0);
      }

      if (block.children && block.children.length > 0) {
        wordCount += countWordsFromTopLevelBlocks(block.children);
      }
    });

    return wordCount;
  }

  if (isLoading || !editor)
    return (
      <div className="relative w-full grow rounded-lg border border-border dark:border-borderDark">
        <div className="mx-auto h-[calc(100dvh-7.5rem)] max-w-screen-md overflow-y-auto p-9">
          <Skeleton height={75} width="100%" radius="sm" mb={10} mt={20} />
          <Skeleton height={15} width="25%" radius="sm" mb={10} mt={20} />
          <Skeleton height={30} width="100%" radius="sm" mb={3} />
          <Skeleton height={30} width="80%" radius="sm" mb={3} />
          <Skeleton height={30} width="95%" radius="sm" mb={3} />
          <Skeleton height={30} width="65%" radius="sm" mb={3} />
          <Skeleton height={15} width="85%" radius="sm" mb={10} mt={20} />
          <Skeleton height={30} width="70%" radius="sm" mb={3} />
          <Skeleton height={30} width="90%" radius="sm" mb={3} />
          <Skeleton height={30} width="90%" radius="sm" mb={3} />
        </div>
      </div>
    );

  // editor.isEditable = isEditable ? isEditable : false;

  return (
    <div className="relative w-full grow rounded-lg">
      {!isEditable && !close && (
        <div className="absolute left-0 right-0 top-40 z-10 mx-auto flex max-w-sm flex-col rounded-lg bg-coolGrey-1 p-4 text-sm shadow-md dark:bg-baseDarker">
          <p>
            As you are working on a collaborative project, you cannot edit the
            main directly. To update the main content, create a branch and merge
            it with the main.
          </p>
          <Divider className="!my-4 !border-border dark:!border-borderDark" />
          <p>
            Owner or admin can change this behaviour in the project settings.
          </p>

          <div className="ml-auto mt-4 flex gap-2">
            <ButtonWrapper className=" px-4 py-1" onClick={createBranch}>
              Create branch
            </ButtonWrapper>
            <ButtonWrapper onClick={() => setClose(true)} className="px-2">
              close
            </ButtonWrapper>
          </div>
        </div>
      )}
      <div className="mx-auto h-[calc(100dvh-8.7rem)] max-w-4xl overflow-y-auto pt-9">
        <Textarea
          placeholder="Title"
          defaultValue={title}
          onChange={(e) => {
            setTitle ? setTitle(e.target.value) : null;
          }}
          onBlur={saveDoc}
          readOnly={!isEditable}
          autosize
          minRows={1}
          styles={{
            ...inputStyles(),
            input: {
              ...inputStyles().input,
              fontSize: "2.7rem !important",
              fontWeight: 800,
              padding: "0 3rem !important",
              lineHeight: "2.8rem !important",
              height: "auto",
              minHeight: "4rem",
              border: "none",
              color: theme === "dark" ? "#ddd" : "#374151",
              margin: "0.5rem auto",
              overflow: "hidden",
            },
          }}
        />
        <BlockNoteView editor={editor} />
        <SmallText className="absolute right-5 top-3 z-50 cursor-default rounded-lg border border-border bg-base p-2 text-fuchsia-700 shadow-sm dark:border-hoverDark dark:bg-hoverDark">
          {wordCount} Words
        </SmallText>
      </div>
    </div>
  );
};
