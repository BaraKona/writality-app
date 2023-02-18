import React, { FC, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { IChapterContent } from "../../interfaces/IChapterContent";
import { useLocalStorage } from "@mantine/hooks";

// export default Editor;
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { BaseEditor } from "../Editor";
import { UpdateContentModal } from "../Modals";
import { useMemo } from "react";
export const ChapterEditorController: FC<{
	setText: React.Dispatch<React.SetStateAction<string>>;
	editor: any;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	content: string;
}> = ({ setText, editor, setOpen, content }) => {
	// if (!chapterContent) {
	// 	return null;
	// }
	// const [content, setContent] = useLocalStorage<{
	// 	text: string;
	// 	date: Date;
	// }>({
	// 	key: chapterContent?.uid,
	// });

	// console.log(content?.date, new Date(chapterContent.dateUpdated.date));
	// if ((content && content.date) > new Date(chapterContent.dateUpdated.date)) {
	// 	if (content.text !== chapterContent.content) {
	// 		setOpen(true);
	// 	}
	// }
	const html = editor?.getHTML();
	useEffect(() => {
		editor.commands.clearContent(true);
		editor.commands.setContent(content);
	}, [content]);

	useEffect(() => {
		if (html === content) {
			return;
		}
		setText(html || "");
	});

	// const html = editor?.getHTML();
	// useEffect(() => {
	// 	if (html === chapterContent.content) {
	// 		return;
	// 	}
	// 	setText(html || "");
	// 	setContent({
	// 		text: html || "",
	// 		date: new Date(),
	// 	});
	// }, [html]);
	return <BaseEditor editor={editor} height="800px" />;
};
