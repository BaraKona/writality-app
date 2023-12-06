import { IProject, ProjectType } from "../../interfaces/IProject";
// @ts-ignore
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { IconAtom2, IconBook2 } from "@tabler/icons-react";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { SmallText } from "../texts/SmallText";
import { Divider } from "@mantine/core";

export const GridProjects = ({
  project,
  onClick,
  size,
}: {
  project: IProject;
  onClick?: () => void;
  size?: string;
}) => {
  const editor = useBlockNote(
    {
      initialContent: project?.description
        ? JSON.parse(project.description)
        : null,
      onEditorContentChange: (editor) => {
        console.log(editor.topLevelBlocks);
      },
      editable: false,

      domAttributes: {
        blockContainer: {
          class: "text-xs -mx-12 dark:!text-coolGrey-4 !text-coolGrey-6",
        },
        editor: {
          class: "!bg-transparent",
        },
      },
    },
    [project],
  );

  return (
    <div
      className={`${
        size ? size : "basis-[15.4rem]"
      } cursor-pointer gap-2 self-start rounded-lg border border-border p-4 pt-3 transition-all duration-200 ease-in-out hover:border-coolGrey-3 hover:shadow-md dark:border-borderDark dark:hover:border-coolGrey-5 dark:hover:shadow-none`}
      onClick={onClick}
      key={project.uid}
    >
      <div className="flex items-center justify-between py-2">
        {project.type === ProjectType.standard ? (
          <IconBook2
            size={20}
            className="text-neutral-600 dark:text-stone-500"
          />
        ) : (
          <IconAtom2 size={20} className="text-cyan-800" />
        )}
        <SmallText light>
          {useTimeFromNow(
            project.dateUpdated?.date || project.dateCreated.date,
          )}
        </SmallText>
      </div>

      <div className="flex flex-col">
        <div className="text-lg font-bold">{project.title}</div>
        <Divider
          my="xs"
          className="!border-coolGrey-1 dark:!border-borderDark"
        />
        <div className="line-clamp-6 max-h-44 w-full text-xs text-gray-500">
          {project.description ? (
            <BlockNoteView editor={editor} />
          ) : (
            "This project has no description. Adding a description will help people understand what your project is about and help you locate collaborators."
          )}
        </div>
      </div>
    </div>
  );
};
