import React, { FC, ReactNode } from "react";
import { IChapter } from "../../interfaces/IChapter";
import { book8 } from "../../assets/icons";
import Image from "next/image";

export const Chapter: FC<{ chapter: IChapter }> = ({ chapter }) => {
  return (
    <div className="flex gap-3 border-b border-stone-800 py-2 px-8 text-center">
      <Image
        src={book8}
        width={20}
        height={20}
        alt={chapter.chapterNumber.toString()}
      />
      <h3>{chapter.chapterTitle}</h3>
    </div>
  );
};
