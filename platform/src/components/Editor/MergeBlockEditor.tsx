import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { FC, useState } from "react";
import { IChapterContent } from "../../interfaces/IChapterContent";
import { Skeleton, TextInput, Textarea } from "@mantine/core";
import { inputStyles } from "../../styles/inputStyles";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { highlightDifferences } from "../../utils/textDiffMatch";

export const MergeBlockEditor: FC<{
	branch: IChapterVersion;
	main: IChapterContent;
}> = ({ main, branch }) => {
	if (!main || !branch) return null;

	const initialContent: string | null = JSON.stringify(
		highlightDifferences(JSON.parse(main?.content), JSON.parse(branch?.content))
	);

	console.log("initialContent", JSON.parse(initialContent));
	console.log("main", JSON.parse(branch?.content));
	const editor: BlockNoteEditor | null = useBlockNote({
		initialContent: initialContent ? JSON.parse(initialContent) : undefined,

		onEditorReady(editor) {
			console.log("editor", editor);
		},
	});

	return (
		<div className="h-[calc(100vh-7.3rem)] w-full border bg-base border-border rounded-normal">
			<div className="max-w-4xl mx-auto py-10 h-[calc(100vh-7.5rem)] overflow-y-auto">
				{/* <Textarea
					placeholder="Title"
					defaultValue={content.title}
					onChange={(e) => (setTitle ? setTitle(e.target.value) : null)}
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
				/> */}
				<BlockNoteView editor={editor} />
			</div>
		</div>
	);
};
