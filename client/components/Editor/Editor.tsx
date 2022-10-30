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
    <div className="text-editor h-[800px] overflow-y-scroll">
      {/* <EditorToolbar /> */}
      <ReactQuill
        theme="snow"
        value={state.value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
      />
      <button onClick={() => console.log(state.value)}>Log</button>
    </div>
  );
};

export default Editor;
