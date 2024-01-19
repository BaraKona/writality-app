import { useSharedChapter } from "../../hooks/chapter/useSharedChapter";
import { useParams } from "react-router-dom";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { BlockNoteEditor } from "@blocknote/core";
import { Textarea } from "@mantine/core";
import { inputStyles } from "../../styles/inputStyles";
import { useThemeContext } from "../../Providers/ThemeProvider";
import { SmallText } from "../../components/texts/SmallText";
import { useState } from "react";

export const SharedChapter = () => {
  const [wordCount, setWordCount] = useState(0);

  const { chapterId, token } = useParams<{ chapterId: string; token: string }>();

  const { theme } = useThemeContext();
  const { data: chapter } = useSharedChapter(chapterId as string, token as string);

  const editor = useBlockNote(
    {
      initialContent: chapter?.content?.content ? JSON.parse(chapter?.content?.content) : null,
      onEditorReady: (editor) => {
        setWordCount(countWordsFromTopLevelBlocks(editor.topLevelBlocks));
      },
      domAttributes: {
        blockContainer: {
          class: "dark:!text-coolGrey-3 !text-coolGrey-7",
        },
        editor: {
          class: "!bg-transparent",
        },
      },
      editable: false,
    },
    [chapter],
  );

  function countWordsFromTopLevelBlocks(topLevelBlocks: BlockNoteEditor["topLevelBlocks"]) {
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

  return (
    <section className="relative mx-auto flex h-[calc(100vh-3.5rem)] max-w-screen-md grow flex-col items-center justify-center rounded-lg border border-border bg-base dark:border-borderDark dark:bg-baseDark">
      <div className="mx-auto max-w-4xl grow overflow-y-auto pt-9">
        <Textarea
          placeholder="Title"
          value={chapter?.title}
          readOnly={true}
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
    </section>
  );
};
