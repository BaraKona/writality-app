import { FC, ReactNode } from "react";

export const ChapterWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="w-full flex flex-col gap-2 ">{children}</div>;
};
