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
import { useDatabaseContext } from "../../contexts/DatabaseContext";
import { useRouter } from "next/router";
import { IChapterContent } from "../../interfaces/IChapterContent";
import { toast } from "react-hot-toast";

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
}> = ({ text, setText }) => {
  const {
    updateChapterContent,
    currentChapterContent,
    setCurrentChapterContent,
    getChapterContent,
    updateChapterBranch,
  } = useDatabaseContext();
  const [counter, setCounter] = useState(0);
  // const [text, setText] = useState(currentChapterContent?.content || "");
  const [baseText, setBaseText] = useState(text);
  const router = useRouter();
  const textChangeHandler = (e: any) => {
    setText(e);
  };

  useEffect(() => {
    console.log(baseText);
    console.log(text);
    if (currentChapterContent?.content && counter === 0) {
      setCounter(1);
      setText(currentChapterContent.content);
    }
    console.log(currentChapterContent.type);
    // if (text !== baseText) checkText(text);
  }, [text, currentChapterContent]);
  /**
   * @description Runs this function when the text changes every 3seconds
   */

  // const checkText = useCallback(
  //   debounce(async (text: string) => {
  //     if (router.query && currentChapterContent) {
  //       // console.log(router);
  //       const projectId = router.query.project;
  //       const chapterId = router.query.chapter;
  //       const contentId = currentChapterContent.uid;
  //       // const contentId = currentChapterContent.uid;
  //       console.log("debounced");
  //       console.log(projectId, chapterId, contentId);
  //       if (projectId && chapterId && contentId) {
  //         try {
  //           const isUpdated = await updateChapterContent(
  //             projectId,
  //             chapterId,
  //             contentId,
  //             text
  //           );
  //           console.log(isUpdated);
  //           if (isUpdated) {
  //             // console.log("Chapter content updated");
  //             toast.success("Saved", {
  //               style: {
  //                 borderRadius: "10px",
  //                 background: "#333350",
  //                 color: "#fff",
  //               },
  //             });
  //             setText(text);
  //           }
  //         } catch (err) {
  //           console.log(err);
  //         }
  //       }
  //       console.log("Checking text...", text);
  //     }
  //   }, 5000),
  //   [router.query]
  // );

  return (
    <div className="text-editor flex-grow max-h-[790px] w-auto overflow-y-auto px-5">
      <div className="max-w-[875px] m-auto ">
        <ReactQuill
          modules={modules}
          theme="snow"
          value={text}
          onChange={(e) => textChangeHandler(e)}
          placeholder="Content goes here..."
          className="border placeholder-slate-50"
        />
      </div>
    </div>
  );
};

export default Editor;
