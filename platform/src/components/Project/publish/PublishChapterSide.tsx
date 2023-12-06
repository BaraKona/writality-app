import { FC } from "react";
import { BlockNoteEditor } from "@blocknote/core";
// @ts-ignore
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { Textarea } from "@mantine/core";
import { inputStyles } from "../../../styles/inputStyles";
import { IChapter } from "../../../interfaces/IChapter";
import { circle1 } from "../../../assets/icons";

export const PublishChapterSide: FC<{
  chapter: IChapter;
  editor: BlockNoteEditor | null;
}> = ({ chapter, editor }) => {
  if (!chapter || !editor)
    return (
      <div className="mx-auto flex w-80 flex-grow flex-col rounded-lg border border-border bg-base px-3 dark:border-borderDark">
        <div className="flex h-[calc(100dvh-13rem)] items-center">
          <div className=" m-auto flex flex-col flex-wrap items-center gap-5">
            <div className="my-auto">
              <img src={circle1} alt="circle1" width={200} height={200} />
            </div>
            <div>
              <h3 className="text-md mb-2 font-semibold ">
                {" "}
                Publish chapters{" "}
              </h3>
              <p className="mb-3 w-72 text-sm text-coolGrey-4 dark:text-coolGrey-6">
                Select a chapter to publish to review and publish it. Published
                chapters will be available to read by the public.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  editor.isEditable = false;
  return (
    <div className="mx-auto flex w-80  flex-grow flex-col rounded-lg border border-border bg-base dark:border-borderDark">
      <div className="mx-auto h-[calc(100dvh-7.5rem)] max-w-4xl overflow-y-auto py-10">
        <Textarea
          placeholder="Title"
          defaultValue={chapter.content.title}
          readOnly={true}
          minRows={1}
          maxRows={4}
          styles={{
            ...inputStyles(),
            input: {
              ...inputStyles().input,
              fontSize: "3rem !important",
              fontWeight: 800,
              padding: "0 3rem",
              height: "auto",
              border: "none",
              backgroundColor: "transparent",
              color: "#25262b",
              margin: "1rem auto",
            },
          }}
        />
        <BlockNoteView editor={editor} />
      </div>
    </div>
  );
};
