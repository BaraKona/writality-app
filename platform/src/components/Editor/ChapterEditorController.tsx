import React, { FC, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { BaseEditor } from "../Editor";
import { IChapter } from "../../interfaces/IChapter";

export const ChapterEditorController: FC<{
	setText: React.Dispatch<React.SetStateAction<string>>;
	editor: any;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	content: string;
	chapterContent: IChapter;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setText, editor, setOpen, content, chapterContent, setTitle }) => {
	const html = editor?.getHTML();
	useEffect(() => {
		editor.commands.setContent(content);
	}, [content]);

	useEffect(() => {
		if (html === content) {
			return;
		}
		setText(html || "");
	});

	return (
		<BaseEditor
			editor={editor}
			height="800px"
			minWidth="calc(100vw - 900px)"
			chapterTitle={chapterContent.content.title}
			setTitle={setTitle}
			isTitle={true}
		/>
	);
};
