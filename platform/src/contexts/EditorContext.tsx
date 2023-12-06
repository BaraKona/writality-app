import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { BlockNoteEditor } from "@blocknote/core";
// @ts-ignore
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

type editorContextType = {
  editor: BlockNoteEditor | null;
  setEditor: any;
  content: string;
  setContent: (content: string) => void;
};

const editorContextDefaultValues: editorContextType = {
  editor: null,
  setEditor: () => {},
  content: "",
  setContent: () => {},
};

const EditorContext = createContext<editorContextType>(
  editorContextDefaultValues,
);

export function useEditorContext() {
  return useContext(EditorContext);
}

const emptyContent = JSON.stringify([
  {
    id: "77388834-76ac-4d3c-9477-c6b92a71e260",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "",
        styles: {},
      },
    ],
    children: [],
  },
]);

export function EditorContextWrapper({ children }: { children: ReactNode }) {
  const [editor, setEditor] = useState<BlockNoteEditor | null>(
    blockEditor(emptyContent),
  );
  const [content, setContent] = useState<string>(emptyContent);

  useEffect(() => {
    // console.log('editor')
    // console.log(content)
    editor?.replaceBlocks(editor.topLevelBlocks, JSON.parse(content));
  }, [content]);

  return (
    <EditorContext.Provider
      value={{
        editor,
        setEditor,
        content,
        setContent,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

const blockEditor = (content: string) => {
  const editor = useBlockNote({
    initialContent: JSON.parse(content),
  });
  return editor;
};
