import React, { FC, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { BaseEditor } from "../Editor";
import { IChapter } from "../../interfaces/IChapter";

export const ChapterEditorController: FC<{
	editor: any;
	content: string;
	chapterContent: IChapter;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
}> = ({ editor, content, chapterContent, setTitle }) => {
	return (
		<BaseEditor
			editor={editor}
			height="calc(100vh - 200px)"
			chapterTitle={chapterContent.content.title}
			setTitle={setTitle}
			isTitle={true}
			content={content}
		/>
	);
};
