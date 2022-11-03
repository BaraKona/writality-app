import dynamic from "next/dynamic";
import React, {
  useState,
  FC,
  useCallback,
  SetStateAction,
  useEffect,
} from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import debounce from "lodash.debounce";

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

export const Editor: FC = () => {
  const [text, setText] = useState("");
  const textChangeHandler = (e: any) => {
    setText(e);
  };

  useEffect(() => {
    checkText(text);
  }, [text]);
  /**
   * @description Runs this function when the text changes every 3seconds
   */
  const checkText = useCallback(
    debounce(async (text: string) => {
      console.log("Checking text...", text);
    }, 3000),
    []
  );

  return (
    <div className="text-editor flex w-full">
      <div className="text-editor flex-grow h-[790px] w-auto overflow-y-scroll px-5">
        <div className="max-w-[875px] m-auto ">
          <ReactQuill
            modules={modules}
            theme="snow"
            onChange={(e) => textChangeHandler(e)}
            placeholder="Content goes here..."
            className="border placeholder-slate-50"
          />
        </div>
      </div>
      <div className="min-w-auto flex-grow  border-l border-baseBorder px-5"></div>
    </div>
  );
};

export default Editor;
