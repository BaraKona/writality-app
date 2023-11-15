import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { FC } from "react";
import { IChapterContent } from "../../interfaces/IChapterContent";
import { Skeleton, Textarea } from "@mantine/core";
import { inputStyles } from "../../styles/inputStyles";
import { SmallText } from "../texts/SmallText";
import { BlockNoteEditor } from "@blocknote/core";
import { useThemeContext } from "../../Providers/ThemeProvider";

export const BlockEditor: FC<{
	content: IChapterContent;
	isLoading: boolean;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	isEditable?: boolean;
	setContent: React.Dispatch<React.SetStateAction<string>>;
	editorContent: string;
	setWordCount: React.Dispatch<React.SetStateAction<number>>;
	wordCount: number;
}> = ({
	content,
	isLoading,
	setTitle,
	isEditable,
	setContent,
	editorContent,
	setWordCount,
	wordCount,
}) => {
	const editor = useBlockNote(
		{
			initialContent: content?.content ? JSON.parse(content?.content) : null,
			onEditorReady: (editor) => {
				setContent(JSON.stringify(editor.topLevelBlocks));
				setWordCount(countWordsFromTopLevelBlocks(editor.topLevelBlocks));
			},
			onEditorContentChange: (editor) => {
				setContent(JSON.stringify(editor.topLevelBlocks));
				setWordCount(countWordsFromTopLevelBlocks(editor.topLevelBlocks));
			},

			domAttributes: {
				blockContainer: {
					class: "dark:!text-coolGrey-3 !text-coolGrey-7",
				},
				editor: {
					class: "dark:!bg-baseDark !bg-base",
				},
			},
		},
		[content]
	);

	const { theme } = useThemeContext();

	function countWordsFromTopLevelBlocks(
		topLevelBlocks: BlockNoteEditor["topLevelBlocks"]
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
				wordCount += block.content.reduce((acc, content) => {
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

	if (isLoading || !editor || !content)
		return (
			<div className="h-[calc(100vh-8.5rem)] w-full border border-border dark:border-borderDark rounded-lg relative">
				<div className="max-w-screen-md mx-auto p-9 h-[calc(100vh-7.5rem)] overflow-y-auto">
					<Skeleton height={50} width="100%" radius="sm" mb={10} mt={20} />
					<Skeleton height={10} width="100%" radius="sm" mb={10} mt={20} />
					<Skeleton height={20} width="100%" radius="sm" mb={3} />
					<Skeleton height={20} width="100%" radius="sm" mb={3} />
					<Skeleton height={20} width="100%" radius="sm" mb={3} />
					<Skeleton height={20} width="100%" radius="sm" mb={3} />
					<Skeleton height={10} width="100%" radius="sm" mb={10} mt={15} />
					<Skeleton height={20} width="100%" radius="sm" mb={3} />
					<Skeleton height={20} width="100%" radius="sm" mb={3} />
					<Skeleton height={20} width="100%" radius="sm" mb={3} />
				</div>
			</div>
		);

	editor.isEditable = isEditable ? isEditable : false;

	return (
		<div className="h-[calc(100vh-8.5rem)] w-full border border-border dark:border-baseDark  rounded-lg relative">
			<div className="max-w-4xl mx-auto pt-9 h-[calc(100vh-8.7rem)] overflow-y-auto">
				<Textarea
					placeholder="Title"
					defaultValue={content.title}
					onChange={(e) => (setTitle ? setTitle(e.target.value) : null)}
					readOnly={!isEditable}
					autosize
					minRows={1}
					styles={{
						...inputStyles,
						input: {
							...inputStyles.input,
							fontSize: "2.7rem !important",
							fontWeight: 800,
							padding: "0 3rem !important",
							lineHeight: "2.8rem !important",
							height: "auto",
							border: "none",
							backgroundColor: "transparent",
							color: theme === "dark" ? "#ddd" : "#374151",
							margin: "0.5rem auto",
							overflow: "hidden",
						},
					}}
				/>
				<BlockNoteView editor={editor} />
				<SmallText className="absolute top-3 right-5 bg-base dark:bg-hoverDark rounded-lg shadow-sm border border-border dark:border-hoverDark text-fuchsia-700 cursor-default p-2 z-50">
					{wordCount} Words
				</SmallText>
			</div>
		</div>
	);
};
