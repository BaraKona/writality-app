import { FC, ReactNode } from "react";
import { Divider, Flex, Skeleton } from "@mantine/core";
import { IconAtom, IconBook } from "@tabler/icons";

import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { Text } from "@mantine/core";
import { IProject } from "../../interfaces/IProject";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { ProjectWrapperHeights } from "../../styles/ProjectWrapperHeights";

export const ChapterWrapper: FC<{
	children: ReactNode;
	project: IProject;
	isLoading: boolean;
}> = ({ children, project, isLoading }) => {
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
			path: "/projects",
			icon: project ? (
				project.type === "standard" ? (
					<IconBook size={18} />
				) : (
					<IconAtom size={18} />
				)
			) : (
				<Skeleton height={18} width={18} />
			),
		},
	];

	return (
		<div
			className={`flex flex-col bg-white px-3 py-3 gap-2 rounded-normal ${ProjectWrapperHeights}`}
		>
			<div className=" flex font-medium gap-2 bg-white text-blueText items-center">
				<Flex>{breadcrumbs && <Breadcrumbs items={breadcrumbs} />}</Flex>
				<Text
					className="text-center my-auto font-medium text-xs  ml-auto mr-3"
					color="dimmed"
				>
					{project?.dateUpdated?.date
						? "Last updated: " + useTimeFromNow(project.dateUpdated.date + "")
						: "No updates yet"}
				</Text>
			</div>
			<Divider className=" border-lightBorder" />
			<div className="flex">{children}</div>
		</div>
	);
};
