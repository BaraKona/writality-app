import { FC, ReactNode, useState } from "react";
import { CgClose } from "react-icons/cg";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { IconDeviceFloppy, IconFileText } from "@tabler/icons";
import { Divider, Flex, Input, Text, TextInput, Tooltip } from "@mantine/core";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { useSingleProject } from "../../hooks/projects/useSingleProject";
import { IconBook2 } from "@tabler/icons";
export const EditorWrapper: FC<{
	children: ReactNode;
	backToProject: () => void;
	content: IChapterVersion;
	save: () => void;
	updateChapterTitle: (title: string) => void;
	title: string;
}> = ({
	children,
	backToProject,
	content,
	save,
	title,
	updateChapterTitle,
}) => {
	const { data: project, isLoading } = useSingleProject(content?.projectId);

	const breadcrumbs = [
		{
			label: project?.title,
			path: "/project/" + project?.uid + "/home",
			icon: <IconBook2 size={18} />,
			isLoading: isLoading,
		},
		{
			label: "[" + content?.type + "] " + title,
			path: "/projects",
			icon: <IconFileText size={18} />,
			isLoading: isLoading,
		},
	];

	return (
		<div className="flex flex-col bg-white px-7 h-[calc(100vh-48px)] gap-2 rounded-normal">
			<div className=" flex font-medium gap-2 bg-white text-blueText pt-6 items-center">
				<Flex>{breadcrumbs && <Breadcrumbs items={breadcrumbs} />}</Flex>
				{/* <button onClick={backToProject}>
					<CgClose size={18} className="text-blueText hover:text-black" />
				</button>
				<div className="align-middle mx-2 my-auto text-xs text-blueText flex gap-2">
					<IconFileText size={20} />
					<div className={`flex `}>
						<div className="text-blue-300 mr-1">
							[
							{content?.type
								? content.type.charAt(0).toUpperCase() + content.type.slice(1)
								: ""}
							{content?.name ? ` - ${content.name}` : ""}]
						</div>
						<input
							type="text"
							onBlur={(e) =>
								title !== e.target.value
									? updateChapterTitle(e.target.value)
									: null
							}
							placeholder={title}
							style={{
								width: title.length > 0 ? `${title.length}ch` : "10rem",
							}}
							defaultValue={title}
							className={
								"text-blueText font-medium text-xs p-0 bg-transparent border-none focus:ring-0"
							}
						/>
					</div>
				</div> */}
				<Text
					className="text-center my-auto font-medium text-xs  ml-auto mr-3"
					color="dimmed"
				>
					{content?.dateUpdated?.date
						? "Last updated: " + useTimeFromNow(content.dateUpdated.date + "")
						: "No updates yet"}
				</Text>

				<div className="border-l border-lightBorder group" onClick={save}>
					<Tooltip label="Save" position="left" withArrow>
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
