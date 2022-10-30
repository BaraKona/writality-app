import React from "react";
// import EditorToolbar, { modules, formats } from "./EditorToolbar";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
// import "./styles.css";

export const Editor = () => {
  const [state, setState] = React.useState({ value: undefined });
  const handleChange = (value: any) => {
    setState({ value });
  };
  return (
    <div className="text-editor flex w-full">
      {/* <EditorToolbar /> */}
      <div className="text-editor flex-grow h-[790px] w-auto overflow-y-scroll px-5">
        <div className="max-w-[875px] m-auto">
          <ReactQuill
            theme="snow"
            value={state.value}
            onChange={handleChange}
            placeholder={"Write something awesome..."}
          />
        </div>
      </div>
      <div className="min-w-auto flex-grow  border-l border-baseBorder px-5"></div>
      {/* <button onClick={() => console.log(state.value)}>Log</button> */}
    </div>
  );
};

export default Editor;
