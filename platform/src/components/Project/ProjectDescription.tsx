import { FC } from "react";
import { IProject } from "../../interfaces/IProject";
import { Divider, Tooltip } from "@mantine/core";
// @ts-ignore
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { IconDeviceFloppy, IconFileDescription } from "@tabler/icons-react";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { useThemeContext } from "../../Providers/ThemeProvider";
export const ProjectDescription: FC<{
  project: IProject;
  updateDescription: (description: string) => void;
}> = ({ project, updateDescription }) => {
  const defaultProjectDescription = [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This is your project description. You can edit it by clicking the save button below.",
        },
      ],
    },
  ];

  const { theme } = useThemeContext();

  const editor = useBlockNote(
    {
      initialContent: project?.description
        ? JSON.parse(project.description)
        : null,
      onEditorContentChange: (editor) => {
        console.log(editor.topLevelBlocks);
      },

      domAttributes: {
        blockContainer: {
          class: "text-xs -mr-10",
        },
        editor: {
          class: "dark:!bg-baseDark !bg-base",
        },
      },
    },
    [project],
  );

  return (
    <div className=" flex h-[calc(100dvh-12rem)] w-[28rem] flex-grow flex-col rounded-lg border border-border p-1 dark:border-borderDark">
      <div className="flex items-center justify-between">
        <h3 className=" flex items-center gap-2 px-2 text-xs font-medium text-coolGrey-7 dark:text-coolGrey-4">
          <IconFileDescription size={18} />
          Project Description
        </h3>
        <Tooltip
          label="Save Description"
          position="left"
          withArrow
          styles={tooltipStyles}
        >
          <button
            className="rounded-lg bg-base p-1.5 hover:bg-gray-100  dark:bg-baseDark dark:hover:bg-hoverDark"
            onClick={() => {
              updateDescription(JSON.stringify(editor.topLevelBlocks) || "");
            }}
          >
            <IconDeviceFloppy size={18} />
          </button>
        </Tooltip>
      </div>
      <Divider className="!my-2 !border-coolGrey-1 dark:!border-borderDark" />
      <div className="overflow-y-auto">
        <BlockNoteView editor={editor} theme={theme} />
      </div>
    </div>
  );
};
