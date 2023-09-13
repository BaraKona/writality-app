import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { FC, useState } from "react";
import { IChapterContent } from "../../interfaces/IChapterContent";
import { Skeleton, Textarea } from "@mantine/core";
import { inputStyles } from "../../styles/inputStyles";
import { SmallText } from "../texts/SmallText";
import {
	BlockNoteEditor,
	BlockSchema,
	DefaultBlockSchema,
} from "@blocknote/core";

export const BlockEditor: FC<{
	content: IChapterContent;
	isLoading: boolean;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	isEditable?: boolean;
	setContent: React.Dispatch<React.SetStateAction<string>>;
}> = ({ content, isLoading, setTitle, isEditable, setContent }) => {
	const editor = useBlockNote(
		{
			initialContent: content?.content ? JSON.parse(content?.content) : null,
			onEditorReady: (editor) => {
				setContent(JSON.stringify(editor.topLevelBlocks));
			},
			onEditorContentChange: (editor) => {
				setContent(JSON.stringify(editor.topLevelBlocks));
			},
		},
		[content]
	);

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
			<div className="h-[calc(100vh-7.5rem)] w-full border bg-base border-border rounded-normal">
				<Skeleton height="calc(100vh-7.5rem)" />
			</div>
		);

	editor.isEditable = isEditable ? isEditable : false;

	return (
		<div className="h-[calc(100vh-7.3rem)] w-full border bg-base border-border rounded-normal relative">
			<div className="max-w-4xl mx-auto py-10 h-[calc(100vh-7.5rem)] overflow-y-auto">
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
							fontSize: "3rem !important",
							fontWeight: 800,
							padding: "0 3rem",
							height: "auto",
							border: "none",
							backgroundColor: "transparent",
							color: "#25262b",
							margin: "1rem auto",
							overflow: "hidden",
						},
					}}
				/>
				{/* <div contentEditable>{content.title}</div> */}
				<BlockNoteView editor={editor} theme="light" />
				<SmallText className="absolute top-4 right-5 bg-white rounded-normal shadow-sm border border-border p-2 z-50">
					{countWordsFromTopLevelBlocks(editor.topLevelBlocks)} Words
				</SmallText>
			</div>
		</div>
	);
};
