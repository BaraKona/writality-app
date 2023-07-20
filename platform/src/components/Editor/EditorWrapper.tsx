import { FC, ReactNode, useState } from "react";
import { CgClose } from "react-icons/cg";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { IconDeviceFloppy, IconFileText } from "@tabler/icons";
import {
	Divider,
	Flex,
	Input,
	Skeleton,
	Text,
	TextInput,
	Tooltip,
} from "@mantine/core";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { useSingleProject } from "../../hooks/projects/useSingleProject";
import { IconBook2 } from "@tabler/icons";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { ProjectWrapperHeights } from "../../styles/ProjectWrapperHeights";

export const EditorWrapper: FC<{
	children: ReactNode;
	content: IChapterVersion;
	save: () => void;
}> = ({ children, content, save }) => {
	const { data: project, isLoading } = useSingleProject(content?.projectId);

	if (isLoading) {
		return (
			<div
				className={`flex flex-col pt-5 bg-white px-7  gap-2 rounded-normal ${ProjectWrapperHeights}`}
			>
				<div className="flex justify-between">
					<Skeleton height={20} mt={6} width={100} />
					<Skeleton height={20} mt={6} width={200} />
				</div>
				<Divider className=" border-lightBorder" />
				<div className="flex">{children}</div>
			</div>
		);
	}
	const breadcrumbs = [
		{
			label: project?.title,
			path: "/project/" + project?.uid + "/home",
			icon: <IconBook2 size={18} />,
			isLoading: isLoading,
		},
		{
			label: "[" + content?.type + "] " + (content.title || content.name || "Untitled Chapter"),
			path: "/projects",
			icon: <IconFileText size={18} />,
			isLoading: isLoading,
		},
	];

	return (
		<div className="flex flex-col bg-white px-7 h-[calc(100vh-42px)] gap-2 rounded-normal">
			<div className=" flex font-medium gap-2 bg-white text-blueText pt-6 items-center">
				<Flex>{breadcrumbs && <Breadcrumbs items={breadcrumbs} />}</Flex>
				<Text
					className="text-center my-auto font-medium text-xs  ml-auto mr-3"
					color="dimmed"
				>
					{content?.dateUpdated?.date
						? "Last updated: " + useTimeFromNow(content.dateUpdated.date + "")
						: "No updates yet"}
				</Text>

				<div className="border-l border-lightBorder group" onClick={save}>
					<Tooltip
						label="Save"
						position="left"
						withArrow
						styles={tooltipStyles}
					>
						<div className="ml-3 p-2 border rounded-normal ">
							<IconDeviceFloppy
								size={20}
								className="text-blueText group-hover:text-black"
							/>
						</div>
					</Tooltip>
				</div>
			</div>
			<Divider className="border-lightBorder" />
			<div className="h-[calc(100vh-120px)] overflow-y-hidden bg-white">
				<div className="text-editor flex justify-between align-middle">
					{children}
				</div>
			</div>
		</div>
	);
};
