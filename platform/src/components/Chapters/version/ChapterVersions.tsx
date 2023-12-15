import { FC } from "react";
import { useTimeFromNow } from "../../../hooks/useTimeFromNow";
import { IChapterVersion } from "../../../interfaces/IChapterVersion";
import { Skeleton, Text } from "@mantine/core";
import { IconFilePencil, IconVersions } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import useChapterVersions from "../../../hooks/chapter/useChapterVersions";

export const ChapterVersions: FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setVersion: React.Dispatch<React.SetStateAction<any>>;
}> = ({ setOpen, setVersion }) => {
  const { chapter } = useParams();

  const { data: versions, isLoading } = useChapterVersions(chapter as string);

  return (
    <div className="">
      {isLoading && (
        <div className="flex grow flex-col gap-1 overflow-y-auto">
          <Skeleton height={25} width="100%" />
          <Skeleton height={25} width="100%" />
          <Skeleton height={25} width="100%" />
        </div>
      )}
      {versions?.length > 0 ? (
        <div className="flex h-[calc(100vh-10rem)] grow flex-col gap-1 overflow-y-auto">
          {versions?.map((version: IChapterVersion, index: number) => (
            <button
              onClick={() => {
                setOpen(true), setVersion(version);
              }}
              key={index}
              className="group flex items-center justify-between gap-2 rounded-md p-2 px-2 py-1 hover:bg-coolGrey-1 dark:hover:bg-hoverDark"
            >
              <div className="flex items-center gap-1 text-xs text-coolGrey-6 transition-all duration-200  ease-in-out dark:text-coolGrey-5">
                <div className="rounded-md p-0.5 text-coolGrey-1 text-teal-800/70 dark:text-teal-500">
                  <IconFilePencil size={18} />
                </div>

                <p className="font-medium">
                  {version.name ? version.name : "Version"}:
                </p>
              </div>
              <Text color="dimmed" size="xs">
                {useTimeFromNow(version.dateCreated?.date)}
              </Text>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2 p-2 text-xs">
          <div className="text-coolGrey-7">
            <IconVersions size={18} />
          </div>
          You do not have any versions saved for this chapter
        </div>
      )}
    </div>
  );
};
