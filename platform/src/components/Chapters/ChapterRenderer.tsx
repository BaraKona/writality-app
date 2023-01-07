import { FC, ReactNode, useEffect, useState } from "react";
import { ScrollArea } from "@mantine/core";

export const ChapterRenderer: FC<{ children: ReactNode }> = ({ children }) => {
  const [height, setHeight] = useState(0);
  // TODO: Fix this!!!
  useEffect(() => {
    const calculateHeight = () => {
      const height = window.innerHeight;
      const headerHeight = 190;
      const chapterHeight = height - headerHeight;
      setHeight(chapterHeight);
    };
    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  return (
    <div
      className={`flex-grow w-72 mx-auto  border-r bg-baseMid border-baseBorder hover:bg-base`}
      style={{ height: window.innerHeight - 190 }}
    >
      <ScrollArea.Autosize
        maxHeight={window.innerHeight - 190}
        offsetScrollbars
        scrollbarSize={6}
      >
        {children}
      </ScrollArea.Autosize>
    </div>
  );
};
