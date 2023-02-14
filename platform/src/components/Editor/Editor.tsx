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
import { UpdateContentModal } from "../Modals";

export const Editor: FC<{
	text: string;
	setText: React.Dispatch<React.SetStateAction<string>>;
	chapterContent: IChapterContent;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ text, setText, chapterContent, setOpen }) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
		],
		content: text || chapterContent?.content,
	});

	const [value, setValue] = useLocalStorage({
		key: chapterContent?.uid,
		defaultValue: { text, date: new Date() },
	});

	const html = editor?.getHTML();
	useEffect(() => {
		if (value?.text) {
			if (
				value.date > new Date(chapterContent?.dateUpdated.date) &&
				value.text !== chapterContent?.content
			) {
				setOpen(true);
			} else {
				console.log(value.date.toISOString(), chapterContent?.dateUpdated.date);
			}
		}
		setText(chapterContent?.content);
		editor?.commands.setContent(chapterContent?.content);
	}, [chapterContent]);

	useEffect(() => {
		setText(editor?.getHTML() || "");
		setValue({ text: editor?.getHTML() || "", date: new Date() });
	}, [html]);

	// useEffect(() => {
	// 	editor?.commands.setContent(text);
	// 	console.log(text);
	// }, [text]);

	return (
		<>
			<RichTextEditor
				editor={editor}
				style={{
					margin: "auto",
					border: "none",
					maxWidth: "850px",
					paddingRight: "20px",
				}}
				styles={{
					toolbar: {
						top: 0,
						backgroundColor: "transparent",
					},
				}}
			>
				<RichTextEditor.Toolbar
					sticky
					stickyOffset={10}
					style={{
						margin: "0 auto",
					}}
				>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Bold />
						<RichTextEditor.Italic />
						<RichTextEditor.Underline />
						<RichTextEditor.Strikethrough />
						<RichTextEditor.ClearFormatting />
						<RichTextEditor.Highlight />
						<RichTextEditor.Code />
					</RichTextEditor.ControlsGroup>

					{/* <RichTextEditor.ControlsGroup>
						<RichTextEditor.H1 />
						<RichTextEditor.H2 />
						<RichTextEditor.H3 />
						<RichTextEditor.H4 />
					</RichTextEditor.ControlsGroup> */}

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Blockquote />
						<RichTextEditor.Hr />
						<RichTextEditor.BulletList />
						<RichTextEditor.OrderedList />
						<RichTextEditor.Subscript />
						<RichTextEditor.Superscript />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Link />
						<RichTextEditor.Unlink />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.AlignLeft />
						<RichTextEditor.AlignCenter />
						<RichTextEditor.AlignJustify />
						<RichTextEditor.AlignRight />
					</RichTextEditor.ControlsGroup>
				</RichTextEditor.Toolbar>

				<RichTextEditor.Content
					style={{
						overflowY: "auto",
						height: "800px",
						backgroundColor: "transparent",
						border: "none",
					}}
				/>
			</RichTextEditor>
		</>
	);
};
