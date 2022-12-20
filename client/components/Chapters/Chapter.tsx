import React, { FC, ReactNode } from "react";
import { IChapter } from "../../interfaces/IChapter";
import { book8 } from "../../assets/icons";
import Image from "next/image";
import { convertDate } from "../../scripts/convertDate";
export const Chapter: FC<{ chapter: IChapter; openChapter: () => void }> = ({
  chapter,
  openChapter,
}) => {
  return (
    <div
      className="flex gap-3 border-b cursor-default hover:bg-baseBorder border-baseBorder py-2 px-8 text-center"
      onClick={openChapter}
    >
      <Image
        src={book8}
        width={20}
        height={20}
        alt={chapter?.chapterNumber?.toString()}
      />
      <h4>
        {chapter.title} <span>{chapter.dateCreated.date.toString()}</span>
      </h4>
    </div>
  );
};
