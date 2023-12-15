import { FC, ReactNode } from "react";

export const ChapterSidebarWrapper: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div className="min-w-auto flex w-72 grow flex-col rounded-lg border border-border dark:border-borderDark">
      {children}
    </div>
  );
};
