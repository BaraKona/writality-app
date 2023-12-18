import { BlockNoteEditor } from "@blocknote/core";
// @ts-ignore
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { FC } from "react";
import { IChapterContent } from "../../interfaces/IChapterContent";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { useSearchParams } from "react-router-dom";
import { inputStyles } from "../../styles/inputStyles";
import { Skeleton, Textarea } from "@mantine/core";
import { useThemeContext } from "../../Providers/ThemeProvider";
import { useAuthContext } from "../../contexts/AuthContext";
const emptyContent = JSON.stringify([
  {
    id: "77388834-76ac-4d3c-9477-c6b92a71e260",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "",
        styles: {},
      },
    ],
    children: [],
  },
]);

export const MergeBlockEditor: FC<{
  branch: IChapterVersion;
  main: IChapterContent;
}> = ({ main, branch }) => {
  const { theme } = useThemeContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useAuthContext();
  // const [initialContent, setInitialContent] = useState<string | null>(null);
  const merge = searchParams.get("merge");

  const compareBlocks = (
    originalBlocks: BlockNoteEditor["topLevelBlocks"],
    editedBlocks: BlockNoteEditor["topLevelBlocks"],
  ): BlockNoteEditor["topLevelBlocks"] => {
    /** @ts-ignore*/
    return originalBlocks.map((block) => {
      const editedBlock = editedBlocks.find(
        (b) =>
          b.id === block.id &&
          // @ts-ignore
          (Date.parse(b.dateUpdated) > Date.parse(block.dateUpdated) ||
            // @ts-ignore
            (b?.userId !== block?.userId && block.content !== b.content)),
      );

      const deletedBlock = originalBlocks.find(
        (b) => b.id === block.id && !editedBlocks.find((eb) => eb.id === b.id),
      );

      if (deletedBlock) {
        return {
          ...block,
          content: "-",
          props: {
            ...block.props,
            textColor: "red",
            styles: {
              strike: true,
            },
          },
        };
      }

      if (!editedBlock) {
        return block;
      }

      if (editedBlock.content !== block.content) {
        return {
          ...block,
          props: {
            ...block.props,
            textColor: "red",
            styles: {
              strike: true,
            },
          },
        };
      }

      return block;
    });
  };

  const initialContent: string | null =
    merge === "replace"
      ? branch?.content
      : JSON.stringify(
          compareBlocks(JSON.parse(main?.content || emptyContent), JSON.parse(branch?.content)),
        );
  const editor: BlockNoteEditor | null = useBlockNote(
    {
      initialContent: initialContent ? JSON.parse(initialContent) : undefined,
      onEditorReady(editor) {
        merge === "replace"
          ? editor?.topLevelBlocks.forEach((block) => {
              editor.updateBlock(block?.id, {
                props: {
                  ...block.props,
                  textColor: "blue",
                },
              });
            })
          : null;
      },
      onTextCursorPositionChange(editor) {
        console.log("changed");
        console.log(editor.getTextCursorPosition());
      },
      domAttributes: {
        blockContainer: {
          // class: "dark:!text-coolGrey-3 !text-coolGrey-7",
        },
        editor: {
          class: "!bg-transparent",
        },
      },

      editable: false,
    },
    [merge, initialContent, branch],
  );
  interface RichTextBlock {
    id: string;
    type: string;
    props: { [key: string]: any };
    content: string[];
    children: any[];
  }

  if (!merge || !editor || !branch || !main || !initialContent)
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

  return (
    <div className="relative w-full grow rounded-lg">
      <div className="mx-auto h-[calc(100dvh-8.7rem)] max-w-4xl overflow-y-auto pt-9">
        <Textarea
          placeholder="Title"
          defaultValue={branch.title}
          // onChange={(e) => (setTitle ? setTitle(e.target.value) : null)}
          autosize
          // minRows={1}
          styles={{
            ...inputStyles(),
            input: {
              ...inputStyles().input,
              fontSize: "2.7rem !important",
              fontWeight: 800,
              padding: "0 3rem !important",
              lineHeight: "2.8rem !important",
              height: "auto !important",
              minHeight: "5rem",
              border: "none",
              color: theme === "dark" ? "#ddd" : "#374151",
              margin: "0.5rem auto",
              overflow: "hidden",
            },
          }}
        />
        <BlockNoteView editor={editor} />
      </div>
    </div>
  );
};
