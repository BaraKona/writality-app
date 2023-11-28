import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { FC } from "react";
import { IChapterContent } from "../../interfaces/IChapterContent";
import { Divider, Skeleton, Textarea } from "@mantine/core";
import { inputStyles } from "../../styles/inputStyles";
import { SmallText } from "../texts/SmallText";
import { BlockNoteEditor } from "@blocknote/core";
import { useThemeContext } from "../../Providers/ThemeProvider";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import debounce from "lodash.debounce";

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
	const editor = useBlockNote(
		{
			initialContent: content ? JSON.parse(content) : null,
			onEditorReady: (editor) => {
				setContent(JSON.stringify(editor.topLevelBlocks));
				setWordCount(countWordsFromTopLevelBlocks(editor.topLevelBlocks));
			},
			onEditorContentChange: (editor) => {
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
		[content, isEditable]
	);

	const saveDoc = debounce(() => {
		save({
			content: JSON.stringify(editor.topLevelBlocks),
			wordCount: countWordsFromTopLevelBlocks(editor.topLevelBlocks),
		});
	}, 3000);

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
			<div className="h-[calc(100dvh-8.5rem)] w-full border border-border dark:border-borderDark rounded-lg relative">
				<div className="max-w-screen-md mx-auto p-9 h-[calc(100dvh-7.5rem)] overflow-y-auto">
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

	// editor.isEditable = isEditable ? isEditable : false;

	return (
		<div className="h-[calc(100dvh-8.5rem)] w-full rounded-lg relative">
			{!isEditable && (
				<div className="absolute top-40 dark:bg-baseDarker bg-coolGrey-1 rounded-lg max-w-sm z-10 p-4 text-sm mx-auto right-0 left-0 flex flex-col shadow-md">
					<p>
						As you are working on a collaborative project, you cannot edit the
						main directly. To update the main content, create a branch and merge
						it with the main.
					</p>
					<Divider className="!border-border dark:!border-borderDark !my-4" />
					<p>
						Owner or admin can change this behaviour in the project settings.
					</p>

					<ButtonWrapper
						className="mt-4 ml-auto px-4 py-1"
						onClick={createBranch}
					>
						Create branch
					</ButtonWrapper>
				</div>
			)}
			<div className="max-w-4xl mx-auto pt-9 h-[calc(100dvh-8.7rem)] overflow-y-auto">
				<Textarea
					placeholder="Title"
					defaultValue={title}
					onChange={(e) => {
						setTitle ? setTitle(e.target.value) : null, saveDoc();
					}}
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
							border: "none",
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
