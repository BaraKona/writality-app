import { FC, ReactNode } from "react";
import "chart.js/auto";
import { Skeleton } from "@mantine/core";
import { useGetProjectWordCount } from "../../hooks/analytics/useGetProjectWordCount";
import { useParams } from "react-router-dom";

type analyticsType = {
  wordCount: number;
  chapterCount: number;
  branchCount: number;
  versionCount: number;
  userCount: number;
  chapterWithMostWords: string;
};

export const ProjectAnalytics: FC<{}> = ({}) => {
  const { project } = useParams();
  const { data: chapterAnalytics, isLoading } = useGetProjectWordCount(
    project as string,
  );

  return (
    <div className="col-span-3 row-span-2 flex max-h-96 flex-col items-center overflow-y-hidden rounded-lg">
      <div className="w-full">
        {isLoading ? (
          <div className="flex max-h-[18rem] flex-wrap gap-2">
            <Skeleton height={112} width={115} />
            <Skeleton height={112} width={115} />
            <Skeleton height={112} width={115} />
            <Skeleton height={112} width={115} />
            <Skeleton height={112} width={115} />
            <Skeleton height={112} width={115} />
          </div>
        ) : (
          <div className="flex max-h-[18rem] flex-wrap gap-2 overflow-y-auto dark:text-orange-500">
            <ListItem title="Words">{chapterAnalytics?.wordCount}</ListItem>
            <ListItem title="Chapters">
              {chapterAnalytics?.chapterCount}
            </ListItem>
            <ListItem title="Branches">
              {chapterAnalytics?.branchCount}
            </ListItem>
            <ListItem title="Versions">
              {chapterAnalytics?.versionCount}
            </ListItem>
            <ListItem title="Contributors">
              {chapterAnalytics?.userCount}
            </ListItem>
            <ListItem title="Largest chapter">
              {chapterAnalytics?.chapterWithMostWords || "-"}
            </ListItem>
          </div>
        )}
      </div>
    </div>
  );
};

const ListItem: FC<{ children: ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <div className="flex h-28 flex-shrink-0 flex-grow basis-24 flex-col items-center rounded-lg border border-border p-1 dark:border-borderDark">
      <p className=" flex h-[2.3rem] w-full items-center justify-center border-b border-border text-center text-xs text-gray-500 dark:border-borderDark dark:text-coolGrey-4">
        {title}
      </p>
      <p className="text-center text-lg font-bold">{children}</p>
    </div>
  );
};
