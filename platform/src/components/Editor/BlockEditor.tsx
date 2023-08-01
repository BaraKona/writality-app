import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { FC } from "react";
import { IChapterContent } from "../../interfaces/IChapterContent";
import { Skeleton, TextInput, Textarea } from "@mantine/core";
import { inputStyles } from "../../styles/inputStyles";

export const BlockEditor: FC<{
	setEditorContent: React.Dispatch<React.SetStateAction<string>>;
	content: IChapterContent;
	isLoading: boolean;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	isEditable?: boolean;
}> = ({ setEditorContent, content, isLoading, setTitle, isEditable }) => {
	if (isLoading)
		return (
			<div className="h-[calc(100vh-7.5rem)] w-full border bg-base border-border rounded-normal">
				<Skeleton height="calc(100vh-7.5rem)" />
			</div>
		);

	const initialContent: string | null = content
		? content.content
		: localStorage.getItem("editorContent");

	const editor: BlockNoteEditor | null = useBlockNote({
		initialContent: initialContent ? JSON.parse(initialContent) : undefined,
		onEditorContentChange: (editor) => {
			setEditorContent(JSON.stringify(editor.topLevelBlocks));
		},
		onEditorReady() {
			setEditorContent(initialContent ? initialContent : "");
		},
		editable: isEditable,

	});


	return (
		<div className="h-[calc(100vh-7.3rem)] w-full border bg-base border-border rounded-normal">
			<div className="max-w-4xl mx-auto py-10 h-[calc(100vh-7.5rem)] overflow-y-auto">
				<Textarea
					placeholder="Title"
					defaultValue={content.title}
					onChange={(e) => (setTitle ? setTitle(e.target.value) : null)}
					readOnly={!isEditable}
					minRows={1}
					maxRows={4}
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
						},
					}}
				/>
				<BlockNoteView editor={editor} />
			</div>
		</div>
	);
};
