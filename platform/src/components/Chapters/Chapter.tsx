import React, { FC, ReactNode } from "react";
import { IChapter } from "../../interfaces/IChapter";
import { book8 } from "../../assets/icons";
import { convertDate } from "../../scripts/convertDate";
import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
export const Chapter: FC<{
  chapter: IChapter;
  openChapter: () => void;
  openChapterModal: () => void;
}> = ({ chapter, openChapter, openChapterModal }) => {
  return (
    <div className="flex gap-3 border-b cursor-default  border-baseBorder py-2 px-8 text-center">
      <div
        className="flex w-9/12 gap-3 cursor-pointer text-center hover:text-blue-400"
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
      <div className=" ml-auto flex align-middle">
        <p className="mr-2">{convertDate(chapter.dateCreated.date)}</p>
        <IconTrash
          onClick={openChapterModal}
          className=" hover:text-red-500"
          color="pink"
          cursor={"pointer"}
          size={20}
        />
      </div>
    </div>
  );
};
