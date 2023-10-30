import { FC, ReactNode } from "react";
import { Divider, Flex, Skeleton } from "@mantine/core";
import { IconAtom, IconBook } from "@tabler/icons-react";

import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { Text } from "@mantine/core";
import { IProject } from "../../interfaces/IProject";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { ProjectWrapperHeights } from "../../styles/ProjectWrapperHeights";
import { BannerImage } from "../BannerImage";

export const ChapterWrapper: FC<{
	children: ReactNode;
	className: string;
	project: IProject;
	isLoading: boolean;
}> = ({ children, project, isLoading, className }) => {
	if (isLoading) {
		return (
			<div
				className={`flex flex-col pt-5 bg-base dark:bg-baseDark px-7  gap-2 rounded-normal h-[calc(100vh-20px)] w-full`}
			>
				<div className="flex justify-between">
					<Skeleton height={20} mt={6} width={100} />
					<Skeleton height={20} mt={6} width={200} />
				</div>
				<Divider className="!border-coolGrey-1 dark:!border-borderDark" />
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
			className={`flex flex-col bg-base dark:bg-baseDark gap-2 rounded-normal h-[calc(100vh-50px)] overflow-y-auto ${className}`}
		>
			{/* <div className=" flex font-medium gap-2 bg-base text-coolGrey-7 items-center">
		<Flex>{breadcrumbs && <Breadcrumbs items={breadcrumbs} />}</Flex>
		<Text size="xs" color="dimmed" ml="auto" mr={3}>
		{project?.dateUpdated?.date
		? "Last updated: " + useTimeFromNow(project.dateUpdated.date + "")
		: "No updates yet"}
		</Text>
		</div>
		<Divider className="!border-coolGrey-1 dark:!border-borderDark" /> */}
			<BannerImage
				image={
					"https://images.unsplash.com/photo-1463143296037-46790ff95a7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
				}
				alt="Banner by Jez Timms on Unsplash"
				height="h-32"
			/>
			<div className="flex">{children}</div>
		</div>
	);
};
