import React, { FC, ReactNode } from "react";
import { IChapter } from "../../interfaces/IChapter";
import { book8 } from "../../assets/icons";
import Image from "next/image";

export const Chapter: FC<{ chapter: IChapter; openChapter: () => void }> = ({
  chapter,
  openChapter,
}) => {
  return (
    <button
      className="flex gap-3 border-b cursor-default hover:bg-stone-700 border-stone-800 py-2 px-8 text-center"
      onClick={openChapter}
    >
      <Image
        src={book8}
        width={20}
        height={20}
        alt={chapter?.chapterNumber?.toString()}
      />
      <h3>
        {chapter.chapterTitle} <span>{chapter.chapterNumber}</span>
      </h3>
    </button>
  );
};
