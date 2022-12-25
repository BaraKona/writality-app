import dynamic from "next/dynamic";
import React, { FC, useEffect } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { IChapterContent } from "../../interfaces/IChapterContent";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["clean"],
  ],
};

export const Editor: FC<{
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  chapterContent: IChapterContent;
}> = ({ text, setText, chapterContent }) => {
  console.log(text);
  return (
    <div className="text-editor flex-grow h-[100vh] w-auto overflow-y-auto px-5">
      <div className="max-w-[875px] m-auto h-[100vh]">
        <ReactQuill
          modules={modules}
          theme="snow"
          value={text}
          onChange={(e) => setText(e)}
          placeholder="Content goes here..."
          className="placeholder-slate-50 h-[calc(100vh-150px)]"
        />
      </div>
    </div>
  );
};

export default Editor;
