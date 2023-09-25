import {
	IconChevronDown,
	IconChevronRight,
	IconFileText,
} from "@tabler/icons-react";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconRenderer } from "../IconRenderer";
import { useLocalStorage } from "@mantine/hooks";
import { IProject } from "../../interfaces/IProject";
import { FolderListItem } from "./FolderListItem";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import { SmallText } from "../texts/SmallText";
import { IChapter } from "../../interfaces/IChapter";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const ProjectListItem: FC<{
	name: string;
	projectId: string;
	projectFolders: IProject["folders"];
	chapters: IChapter[];
	onClick?: () => void;
	type: "standard" | "collaboration";
}> = ({ name, onClick, projectId, type, projectFolders, chapters }) => {
	const [parent] = useAutoAnimate();
	const { project, chapter: chapterId } = useParams();

	const [sidebarProjectOpen, setSidebarProjectOpen] = useLocalStorage({
		key: `sidebarProjectOpen-${projectId}`,
		defaultValue: localStorage.getItem(`sidebarProjectOpen-${projectId}`) || "",
	});

	const navigate = useNavigate();

	return (
		<div
			className={`transition-all ease-in-out duration-500 ${
				sidebarProjectOpen ? "" : "mb-1"
			} `}
		>
			<li
				onClick={onClick}
				className={`px-1.5 py-1 transition-all ease-in-out duration-500 cursor-pointer flex flex-col text-xs font-medium group hover:bg-coolGrey-1  rounded-normal border border-border
				${project === projectId ? "bg-coolGrey-1" : "bg-white"}`}
			>
				<div className="gap-1 flex justify-between items-center">
					<div className="flex gap-1 items-center">
						<IconRenderer type={type} open={Boolean(sidebarProjectOpen)} />
						<span className=" whitespace-nowrap w-[12rem] text-ellipsis overflow-hidden">
							{name}
						</span>
					</div>
					<ButtonWrapper>
						{sidebarProjectOpen ? (
							<IconChevronDown
								className="text-coolGrey-4"
								size={16}
								onClick={(e) => {
									e.stopPropagation(),
										setSidebarProjectOpen(
											sidebarProjectOpen === projectId ? "" : projectId
										);
								}}
							/>
						) : (
							<IconChevronRight
								className="text-coolGrey-4"
								size={16}
								onClick={(e) => {
									e.stopPropagation(),
										setSidebarProjectOpen(
											sidebarProjectOpen === projectId ? "" : projectId
										);
								}}
							/>
						)}
					</ButtonWrapper>
				</div>
			</li>
			<div ref={parent}>
				{sidebarProjectOpen && (
					<>
						{projectFolders.length > 0 ? (
							<div className="ml-4 pl-2 pt-2 border-l border-border ">
								{projectFolders.map((folder) => {
									return (
										<FolderListItem
											folder={folder}
											folderChapters={folder.chapters}
											small
											projectId={projectId}
											className="rounded-normal"
											location="sidebar"
										/>
									);
								})}
							</div>
						) : (
							<div className="ml-4 pl-2 pt-2  border-l border-border "> </div>
						)}
					</>
				)}
			</div>
			<div ref={parent}>
				{sidebarProjectOpen && chapters?.length !== 0 && (
					<div className="ml-4 pb-1 border-l border-border">
						{chapters?.map((chapter: IChapter) => (
							<SmallText
								className={`flex items-center justify-between pl-1 p-0.5 ml-2 my-0.5 cursor-pointer rounded-normal hover:bg-coolGrey-1 transition-all ease-in-out duration-300 ${
									chapterId === chapter.uid ? "bg-coolGrey-1" : ""
								}`}
								onClick={() =>
									navigate(`project/${projectId}/chapter/${chapter.uid}`)
								}
							>
								<span className="flex gap-1.5 items-start">
									<IconFileText size={16} className="flex-shrink-0" />
									{chapter.content.title || "Untitled Chapter"}
								</span>
							</SmallText>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
