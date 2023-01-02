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
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ text, setText, chapterContent, setOpen }) => {
  const [value, setValue] = useLocalStorage({
    key: chapterContent.uid,
    defaultValue: { text, date: new Date() },
  });
  const quillRef = useRef<ReactQuill>(null);
  useEffect(() => {
    if (localStorage.getItem(chapterContent.uid)!) {
      if (
        JSON.parse(localStorage.getItem(chapterContent.uid)!).date >
        chapterContent?.dateUpdated.date
      ) {
        setOpen(true);
      }
    }

    setText(chapterContent.content);
    console.log(chapterContent);
  }, [chapterContent]);

  return (
    // <div className="text-editor flex-grow h-[100vh] w-auto px-5">
    <ScrollArea
      style={{
        height: "calc(100vh - 7.5rem)",
        maxWidth: "875px",
        margin: "0 auto",
        padding: "0 5px",
      }}
      offsetScrollbars
      scrollbarSize={6}
    >
      <ReactQuill
        ref={quillRef}
        modules={modules}
        theme="snow"
        value={text}
        onChange={(e) => {
          setText(e);
          setValue({ text: e, date: new Date() });
        }}
        placeholder="Content goes here..."
        className="placeholder-slate-50 "
      />
      {/* <p>{Countable.count(quillRef, (counter) => console.log(counter))}</p> */}
    </ScrollArea>
    // </div>
  );
};

export default Editor;
