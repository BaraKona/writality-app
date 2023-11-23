import { FC, ReactNode } from "react";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import {
	IconCloudUpload,
	Icon3dCubeSphere,
	IconDeviceFloppy,
	IconFileText,
	IconGitBranch,
} from "@tabler/icons-react";
import { Divider, Flex, Skeleton, Text, Tooltip } from "@mantine/core";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { useSingleProject } from "../../hooks/projects/useSingleProject";
import { IconBook2, IconGitMerge } from "@tabler/icons-react";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { useLocation, useSearchParams } from "react-router-dom";

export const EditorWrapper: FC<{
	children: ReactNode;
	content: IChapterVersion;
	save: () => void;
}> = ({ children, content, save }) => {
	const { data: project, isLoading } = useSingleProject(content?.projectId);
	const [searchParams] = useSearchParams();
	const location = useLocation();
	const merge = searchParams.get("merge");
	const branch = searchParams.get("branch");

	if (isLoading || !content) {
		return (
			<div className="flex flex-col bg-base dark:bg-baseDark px-3 py-3.5 h-[calc(100dvh-3.2rem)] gap-2 rounded-lg border-border dark:border-borderDark border">
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
			label: "[main] " + content.title || "[main] Untitled Chapter",
			path: location.pathname,
			icon: <IconFileText size={18} />,
			isLoading: isLoading,
		},
	];

	if (branch) {
		breadcrumbs.push({
			label: "[" + content?.type + "] " + (content.name || "Untitled Chapter"),
			path: location.pathname + "?branch=" + branch,
			icon: <IconGitBranch size={18} />,
			isLoading: isLoading,
		});
	}

	if (merge === "replace") {
		breadcrumbs.push({
			label: "Replace main with " + content.name,
			path: location.pathname + "?merge=" + merge,
			icon: <IconGitMerge size={18} />,
			isLoading: isLoading,
		});
	}

	if (merge === "into") {
		breadcrumbs.push({
			label: "Merge " + content.name + " into main",
			path: location.pathname + "?merge=" + merge,
			icon: <IconGitMerge size={18} />,
			isLoading: isLoading,
		});
	}

	return (
		<div className="flex flex-col bg-base dark:bg-baseDark px-3 py-3 h-[calc(100dvh-3.2rem)] gap-2 rounded-lg border-border dark:border-t dark:border-none dark:border-baseDark border">
			<div className=" flex font-medium gap-2  text-coolGrey-7 items-center">
				<Flex>{breadcrumbs && <Breadcrumbs items={breadcrumbs} />}</Flex>
				<Text
					size="xs"
					color="dimmed"
					ml="auto"
					mr={3}
					className="flex items-center"
				>
					<IconCloudUpload size={16} className="mr-1" />
					{content?.dateUpdated?.date
						? "Last updated: " + useTimeFromNow(content.dateUpdated.date + "")
						: "No updates yet"}
				</Text>

				<div
					className="border-l border-border dark:border-borderDark group"
					onClick={save}
				>
					<Tooltip
						label="Save"
						position="left"
						withArrow
						styles={tooltipStyles}
					>
						<div className="ml-3 p-1.5 border-border dark:border-borderDark border rounded-lg cursor-pointer hover:bg-base hover:shadow transition-all ease-in-out duration-300">
							<IconDeviceFloppy
								size={18}
								className="text-coolGrey-7 group-hover:text-black dark:hover:text-coolGrey-1"
							/>
						</div>
					</Tooltip>
				</div>
			</div>
			<Divider className="!border-coolGrey-1 dark:!border-borderDark" />
			<div className=" overflow-y-hidden ">
				<div className="text-editor flex justify-between align-middle">
					{children}
				</div>
			</div>
		</div>
	);
};
