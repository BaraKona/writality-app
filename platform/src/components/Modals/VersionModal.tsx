import { Modal } from "@mantine/core";
import React, { FC } from "react";
import { IconTrash, IconReplace } from "@tabler/icons-react";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { modalStyles } from "../../styles/modalStyles";
// @ts-ignore
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { useThemeContext } from "../../Providers/ThemeProvider";

export const VersionModal: FC<{
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  deleteVersion: () => void;
  version: IChapterVersion;
  setText: React.Dispatch<React.SetStateAction<string>>;
  currentContent: IChapterVersion;
}> = ({
  opened,
  setOpened,
  deleteVersion,
  version,
  currentContent,
  setText,
}) => {
  const { theme } = useThemeContext();
  const editor = useBlockNote(
    {
      initialContent: version?.content ? JSON.parse(version?.content) : null,
      editable: false,
      domAttributes: {
        blockContainer: {
          class: "text-sm -mx-16 !pr-2 dark:!text-coolGrey-4 !text-coolGrey-6",
        },
        editor: {
          class: "dark:!bg-transparent !bg-base",
        },
      },
    },
    [version?.content],
  );

  const editor2 = useBlockNote(
    {
      initialContent: currentContent?.content
        ? JSON.parse(currentContent?.content)
        : null,
      editable: false,
      domAttributes: {
        blockContainer: {
          class: "text-sm -mx-16 !pr-2 dark:!text-coolGrey-4 !text-coolGrey-6",
        },
        editor: {
          class: "dark:!bg-transparent !bg-base",
        },
      },
    },
    [currentContent?.content],
  );

  if (!version) {
    return null;
  }
  return (
    <>
      <Modal
        size="100rem"
        opened={opened}
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
        styles={() => modalStyles(theme)}
        scrollAreaComponent={Modal.NativeScrollArea}
        onClose={() => setOpened(false)}
        className="!rounded-lg !border-none text-sm text-coolGrey-7 dark:!bg-baseDark dark:!text-coolGrey-4"
        title="Version"
      >
        <div className="mx-auto flex flex-wrap text-coolGrey-7 dark:text-coolGrey-4">
          <div className="mx-auto w-1/2 shrink grow border-r border-border px-5 dark:border-borderDark">
            <h2 className="text-md my-2 font-medium text-gray-700 dark:text-coolGrey-4">
              {"[Main] " + currentContent?.title}
            </h2>
            <div className="h-[calc(100dvh-300px)] min-w-[300px] overflow-y-auto px-3 text-xs text-coolGrey-7">
              <BlockNoteView editor={editor2} />
            </div>
          </div>
          <div className="mx-auto w-1/2 shrink grow  border-l border-border px-5 dark:border-borderDark">
            <h2 className="text-md my-2 font-medium text-gray-700 dark:text-coolGrey-4">
              [Version] {version?.title || version.name}
            </h2>
            <div className="h-[calc(100dvh-300px)] min-w-[300px] overflow-y-auto px-3 text-xs text-coolGrey-7 dark:text-coolGrey-4">
              <BlockNoteView editor={editor} className="!px-0" />
            </div>
          </div>
        </div>
        <div className="mt-5 flex">
          <button
            className="ml-auto mr-2 cursor-pointer rounded-md p-1.5 hover:bg-coolGrey-1 dark:hover:bg-hoverDark"
            onClick={deleteVersion}
          >
            <IconTrash size={18} />
          </button>
          <button
            className="flex cursor-pointer gap-2 rounded-md p-1.5 hover:bg-coolGrey-1 dark:hover:bg-hoverDark"
            onClick={() => {
              setText(version?.content as string);
              setOpened(false);
            }}
          >
            <IconReplace size={18} />
          </button>
        </div>
      </Modal>
    </>
  );
};
