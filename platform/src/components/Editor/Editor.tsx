import React, { FC, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IChapterContent } from "../../interfaces/IChapterContent";
import { useLocalStorage } from "@mantine/hooks";
import debounce from "lodash.debounce";
// ignore typescript error
// @ts-ignore
import Countable from "countable";
import { ScrollArea } from "@mantine/core";

// const modules = {
//   toolbar: [
//     [{ font: [] }],
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],
//     ["bold", "italic", "underline", "strike"],
//     [{ color: [] }, { background: [] }],
//     [{ script: "sub" }, { script: "super" }],
//     ["blockquote", "code-block"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
//     ["clean"],
//   ],
// };

// export const Editor: FC<{
//   text: string;
//   setText: React.Dispatch<React.SetStateAction<string>>;
//   chapterContent: IChapterContent;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }> = ({ text, setText, chapterContent, setOpen }) => {
//   const [value, setValue] = useLocalStorage({
//     key: chapterContent?.uid,
//     defaultValue: { text, date: new Date() },
//   });
//   const quillRef = useRef<ReactQuill>(null);
//   useEffect(() => {
//     if (localStorage.getItem(chapterContent?.uid)!) {
//       if (
//         JSON.parse(localStorage.getItem(chapterContent?.uid)!).date >
//           chapterContent?.dateUpdated.date &&
//         JSON.parse(localStorage.getItem(chapterContent?.uid)!).text !==
//           chapterContent?.content
//       ) {
//         setOpen(true);
//       }
//     }

//     setText(chapterContent?.content);
//   }, [chapterContent]);

//   return (
//     // <div className="text-editor flex-grow h-[100vh] w-auto px-5">
//     <ScrollArea
//       style={{
//         height: "calc(100vh - 7.5rem)",
//         maxWidth: "875px",
//         margin: "0 auto",
//         padding: "0 5px",
//       }}
//       offsetScrollbars
//       scrollbarSize={6}
//     >
//       <ReactQuill
//         ref={quillRef}
//         modules={modules}
//         theme="snow"
//         value={text}
//         onChange={(e) => {
//           setText(e);
//           setValue({ text: e, date: new Date() });
//         }}
//         placeholder="Content goes here..."
//         className="placeholder-slate-50 "
//       />
//       {/* <p>{Countable.count(quillRef, (counter) => console.log(counter))}</p> */}
//     </ScrollArea>
//     // </div>
//   );
// };

// export default Editor;
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";

const content =
	'<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

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
		content,
	});
	const [value, setValue] = useLocalStorage({
		key: chapterContent?.uid,
		defaultValue: { text, date: new Date() },
	});

	const html = editor?.getHTML();
	useEffect(() => {
		if (localStorage.getItem(chapterContent?.uid)!) {
			if (
				JSON.parse(localStorage.getItem(chapterContent?.uid)!).date >
					chapterContent?.dateUpdated.date &&
				JSON.parse(localStorage.getItem(chapterContent?.uid)!).text !==
					chapterContent?.content
			) {
				setOpen(true);
			}
		}
		setText(chapterContent?.content);
	}, [chapterContent]);
	useEffect(() => {
		setText(editor?.getHTML() || "");
		setValue({ text: editor?.getHTML() || "", date: new Date() });
		console.log(editor?.getHTML());
	}, [html]);
	return (
		<RichTextEditor
			editor={editor}
			styles={{
				toolbar: {
					top: 0,
				},
			}}
		>
			<RichTextEditor.Toolbar sticky stickyOffset={60}>
				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Bold />
					<RichTextEditor.Italic />
					<RichTextEditor.Underline />
					<RichTextEditor.Strikethrough />
					<RichTextEditor.ClearFormatting />
					<RichTextEditor.Highlight />
					<RichTextEditor.Code />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.H1 />
					<RichTextEditor.H2 />
					<RichTextEditor.H3 />
					<RichTextEditor.H4 />
				</RichTextEditor.ControlsGroup>

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
				}}
			/>
		</RichTextEditor>
	);
};
