import { FC, ReactNode } from "react";
import { CreateChapterButton } from "../buttons";
import { Divider, Flex } from "@mantine/core";
import { IconAtom, IconBook, IconFilePlus } from "@tabler/icons";
import { type } from "os";
import { IconRenderer } from "../IconRenderer";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { Text } from "@mantine/core";
import { IProject } from "../../interfaces/IProject";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";

export const ChapterWrapper: FC<{
	children: ReactNode;
	updateProjectTitle: (title: string) => void;
	project: IProject;
}> = ({ children, updateProjectTitle, project }) => {
	const breadcrumbs = [
		{
			label: project?.title,
			path: "/projects",
			icon:
				project.type === "standard" ? (
					<IconBook size={18} />
				) : (
					<IconAtom size={18} />
				),
		},
	];

	return (
		<div className="flex flex-col bg-white px-7 h-[calc(100vh-48px)] gap-2 rounded-t-md">
			<div className=" flex font-medium gap-2 bg-white text-blueText pt-6 items-center">
				<Flex>{breadcrumbs && <Breadcrumbs items={breadcrumbs} />}</Flex>
				<Text
					className="text-center my-auto font-medium text-xs  ml-auto mr-3"
					color="dimmed"
				>
					{project?.dateUpdated?.date
						? "Last updated: " + useTimeFromNow(project.dateUpdated.date + "")
						: "No updates yet"}
				</Text>
				{/* <IconRenderer type={type} open={true} /> */}
				{/* <input
					key={title}
					type="text"
					onBlur={(e) =>
						title !== e.target.value ? updateProjectTitle(e.target.value) : null
					}
					placeholder={title}
					style={{
						width: title.length > 0 ? `${title.length + 1}ch` : "10rem",
					}}
					defaultValue={title}
					className={
						"text-blueText font-medium text-xs p-0 bg-transparent border-none focus:ring-0 items-center "
					}
				/> */}
			</div>
			<Divider className=" border-lightBorder" />
			<div className="flex">{children}</div>
		</div>
	);
};
