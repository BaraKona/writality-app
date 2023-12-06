import { BlockNoteEditor } from "@blocknote/core";
// @ts-ignore
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { FC } from "react";
import { IChapterContent } from "../../interfaces/IChapterContent";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { highlightDifferences } from "../../utils/textDiffMatch";
import { useSearchParams } from "react-router-dom";
import { inputStyles } from "../../styles/inputStyles";
import { Textarea } from "@mantine/core";
import { useThemeContext } from "../../Providers/ThemeProvider";
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
  // const [initialContent, setInitialContent] = useState<string | null>(null);
  const merge = searchParams.get("merge");

  // if (merge === "replace") {
  // 	const editor: BlockNoteEditor | null = useBlockNote({
  // 		initialContent: JSON.parse(branch?.content),
  // 		onEditorReady(editor) {
  // 			editor?.topLevelBlocks.forEach((block) => {
  // 				editor.updateBlock(block?.id, {
  // 					props: {
  // 						...block.props,
  // 						textColor: "blue",
  // 					},
  // 				});
  // 			});
  // 		},
  // 	});
  // 	return (
  // 		<div className="h-[calc(100dvh-7.3rem)] border bg-base border-border dark:border-borderDark rounded-lg w-full">
  // 			<div className="max-w-4xl mx-auto py-10 h-[calc(100dvh-7.5rem)] overflow-y-auto">
  // 				<Textarea
  // 					placeholder="Title"
  // 					defaultValue={branch.title}
  // 					minRows={1}
  // 					maxRows={4}
  // 					styles={{
  // 						...inputStyles,
  // 						input: {
  // 							...inputStyles.input,
  // 							fontSize: "3rem !important",
  // 							fontWeight: 800,
  // 							padding: "0 3rem",
  // 							height: "auto",
  // 							border: "none",
  // 							backgroundColor: "transparent",
  // 							color: "#25262b",
  // 							margin: "1rem auto",
  // 						},
  // 					}}
  // 				/>
  // 				<BlockNoteView editor={editor} />
  // 			</div>
  // 		</div>
  // 	);
  // }
  const initialContent: string | null =
    merge === "replace"
      ? branch?.content
      : JSON.stringify(
          highlightDifferences(
            JSON.parse(main?.content || emptyContent),
            JSON.parse(branch?.content),
          ),
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
      domAttributes: {
        blockContainer: {
          // class: "dark:!text-coolGrey-3 !text-coolGrey-7",
        },
        editor: {
          class: "!bg-transparent",
        },
      },
    },
    [merge, initialContent],
  );

  return (
    <div className="relative h-[calc(100dvh-8.5rem)]  w-full rounded-lg">
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
