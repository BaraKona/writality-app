import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { FC, useState } from "react";
import { IChapterContent } from "../../interfaces/IChapterContent";
import { Skeleton, TextInput, Textarea } from "@mantine/core";
import { inputStyles } from "../../styles/inputStyles";

export const BlockEditor: FC<{
	setEditorContent: React.Dispatch<React.SetStateAction<string>>;
	content: IChapterContent;
	editor: BlockNoteEditor | null;
	isLoading: boolean;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	isEditable?: boolean;
}> = ({
	setEditorContent,
	content,
	isLoading,
	setTitle,
	isEditable,
	editor,
}) => {
	const [t, setT] = useState(0);

	if (isLoading || !editor || !content)
		return (
			<div className="h-[calc(100vh-7.5rem)] w-full border bg-base border-border rounded-normal">
				<Skeleton height="calc(100vh-7.5rem)" />
			</div>
		);

	editor.isEditable = isEditable ? isEditable : false;

	if (!isLoading && t == 0) {
		editor.replaceBlocks(editor?.topLevelBlocks, JSON.parse(content?.content));
		console.log("replaced");
		setT(t + 1);
	}

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
