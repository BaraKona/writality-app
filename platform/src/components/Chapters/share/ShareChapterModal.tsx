import { CopyButton, Modal, Space } from "@mantine/core";
import React, { FC } from "react";
import { modalStyles } from "../../../styles/modalStyles";
import { BlueButton } from "../../buttons/BlueButton";
import { IconCopy, IconCopyCheck, IconShare } from "@tabler/icons-react";
import { useThemeContext } from "../../../Providers/ThemeProvider";
import { IChapter } from "../../../interfaces/IChapter";
import { useCreateSharedChapter } from "../../../hooks/chapter/useCreateSharedChapter";
import { useParams } from "react-router-dom";
import { ButtonWrapper } from "../../buttons/ButtonWrapper";

export const ShareChapterModal: FC<{
  opened: boolean;
  setShareChapterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chapter: IChapter;
}> = ({ opened, setShareChapterModalOpen, chapter: currentChapter }) => {
  const { project, chapter } = useParams();

  const { mutate: createSharedChapter, isLoading } = useCreateSharedChapter(
    project as string,
    chapter as string,
  );

  const { theme } = useThemeContext();

  return (
    <>
      <Modal
        size="lg"
        opened={opened}
        styles={() => modalStyles(theme)}
        className="text-sm text-coolGrey-7"
        scrollAreaComponent={Modal.NativeScrollArea}
        onClose={() => setShareChapterModalOpen(false)}
        title={`Do you want to share a readable ${currentChapter?.title} ?`}
      >
        <p className="text-center">
          You can share your chapter with anyone. They will be able to read it and leave comments.
          However, they will not be able to edit it.
        </p>
        <Space h="md" />
        {currentChapter?.shared?.token && currentChapter.shared?.access ? (
          <div className="flex flex-col items-center px-2">
            <p className="text-green-400 dark:text-orange-600">Your shared link is ready!</p>
            <Space h="md" />
            <div className="relative flex overflow-hidden">
              <div className="max-w-xl text-ellipsis text-wrap rounded-md border border-coolGrey-4 bg-coolGrey-6 p-1 px-2 text-coolGrey-4 underline dark:border-borderDark dark:bg-baseDarker dark:text-coolGrey-6">
                {import.meta.env.VITE_API_APP_URL}/shared/{currentChapter?._id}?token=
                {currentChapter?.shared?.token}
              </div>
              <CopyButton
                value={`${import.meta.env.VITE_API_APP_URL}/shared/${currentChapter?.uid}?token=${currentChapter?.shared?.token}`}
              >
                {({ copied, copy }) => (
                  <ButtonWrapper
                    className="absolute right-2 top-2 border border-border p-1.5 dark:border-borderDark"
                    onClick={copy}
                  >
                    {copied ? (
                      <IconCopyCheck size={18} className="text-green-400" />
                    ) : (
                      <IconCopy size={18} className="text-coolGrey-4 dark:text-coolGrey-6" />
                    )}
                  </ButtonWrapper>
                )}
              </CopyButton>
            </div>
          </div>
        ) : (
          <BlueButton onClick={() => createSharedChapter()} disabled={isLoading}>
            <IconShare size={18} className="mr-2" /> Create a shared link
          </BlueButton>
        )}
      </Modal>
    </>
  );
};
