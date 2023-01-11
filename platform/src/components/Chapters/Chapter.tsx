import React, { FC, ReactNode } from "react";
import { IChapter } from "../../interfaces/IChapter";
import { book8 } from "../../assets/icons";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
export const Chapter: FC<{
  chapter: IChapter;
  openChapter: () => void;
  openChapterModal: () => void;
  disabled: boolean;
}> = ({ chapter, openChapter, openChapterModal, disabled }) => {
  return (
    <div className="flex gap-3 border-b cursor-default  border-baseBorder  px-8 text-center">
      <div
        className="flex place-items-center gap-3 cursor-pointer text-center hover:text-blue-400"
        onClick={openChapter}
      >
        <img
          src={book8}
          width={20}
          height={20}
          alt={chapter?.chapterNumber?.toString()}
        />
        <h4>{chapter.title}</h4>
      </div>
      <div className="ml-auto flex ">
        <p className="mr-2">
          {useTimeFromNow(chapter?.dateUpdated.date.toString()) ||
            useTimeFromNow(chapter?.dateCreated.date.toString())}
        </p>

        <Button
          variant="light"
          onClick={openChapterModal}
          disabled={disabled}
          color="red"
          size="xs"
        >
          <IconTrash size={18} />
        </Button>
      </div>
    </div>
  );
};
