import { FC, ReactNode } from "react";

export const ChapterSidebarWrapper: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div className="min-w-auto w-72 grow rounded-lg border border-border dark:border-borderDark">
      {children}
    </div>
  );
};
