import { FC, ReactNode } from "react";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import {
  IconCloudUpload,
  Icon3dCubeSphere,
  IconFileText,
  IconGitBranch,
} from "@tabler/icons-react";
import { Divider, Flex, Skeleton, Text } from "@mantine/core";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { useSingleProject } from "../../hooks/projects/useSingleProject";
import { IconBook2, IconGitMerge } from "@tabler/icons-react";
import { useLocation, useSearchParams } from "react-router-dom";

export const EditorWrapper: FC<{
  children: ReactNode;
  mainContent: IChapterVersion;
  branchContent: IChapterVersion;
  // save: () => void;
}> = ({ children, mainContent, branchContent }) => {
  const { data: project, isLoading } = useSingleProject(mainContent?.projectId);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const merge = searchParams.get("merge");
  const branch = searchParams.get("branch");

  if (isLoading || !mainContent || (branch && !branchContent)) {
    return (
      <div className="flex grow flex-col gap-2 rounded-lg border border-border  px-3 py-3.5 dark:border-borderDark dark:bg-baseDark">
        <div className="flex justify-between">
          <Skeleton height={24} mt={6} width={100} />
          <Skeleton height={24} mt={6} width={200} />
        </div>
        <Divider className="!border-coolGrey-1 dark:!border-borderDark" />
        <div className="flex">{children}</div>
      </div>
    );
  }
  const breadcrumbs = [
    {
      label: project?.title,
      path: "/project/" + project?.uid + "/overview",
      icon:
        project?.type === "standard" ? (
          <IconBook2
            size={18}
            className="text-neutral-600 dark:text-stone-500"
          />
        ) : (
          <Icon3dCubeSphere size={18} className="text-cyan-800" />
        ),
      isLoading: isLoading,
    },
    {
      label: "[main] " + mainContent.title || "[main] Untitled Chapter",
      path: location.pathname,
      icon: <IconFileText size={18} />,
      isLoading: isLoading,
    },
  ];

  if (branch) {
    breadcrumbs.push({
      label:
        "[" +
        branchContent?.type +
        "] " +
        (branchContent.name || "Untitled Chapter"),
      path: location.pathname + "?branch=" + branch,
      icon: <IconGitBranch size={18} />,
      isLoading: isLoading,
    });
  }

  if (merge === "replace") {
    breadcrumbs.push({
      label: "Replace main with " + branchContent.name,
      path: location.pathname + "?merge=" + merge,
      icon: <IconGitMerge size={18} />,
      isLoading: isLoading,
    });
  }

  if (merge === "into") {
    breadcrumbs.push({
      label: "Merge " + branchContent.name + " into main",
      path: location.pathname + "?merge=" + merge,
      icon: <IconGitMerge size={18} />,
      isLoading: isLoading,
    });
  }

  return (
    <div className="flex h-full grow flex-col gap-2 rounded-lg py-3 dark:border-t dark:border-none dark:border-baseDark ">
      <div className=" flex items-center gap-2 font-medium text-coolGrey-7">
        <Flex>{breadcrumbs && <Breadcrumbs items={breadcrumbs} />}</Flex>
        <Text
          size="xs"
          color="dimmed"
          ml="auto"
          mr={3}
          className="flex items-center"
        >
          <IconCloudUpload size={18} className="mr-1 text-sky-600" />
          {branch
            ? `Last updated: ${useTimeFromNow(branchContent.dateUpdated.date)}`
            : `Last updated: ${useTimeFromNow(mainContent.dateUpdated.date)}`}
        </Text>
      </div>
      <Divider className="!border-coolGrey-1 dark:!border-borderDark" />
      <div className="grow overflow-y-hidden">
        <div className="text-editor flex justify-between align-middle">
          {children}
        </div>
      </div>
    </div>
  );
};
