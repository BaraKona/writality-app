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
			className={`transition-all ease-in-out duration-500 text-coolGrey-7 ${
				sidebarProjectOpen ? "" : "mb-1"
			} `}
		>
			<div className="flex gap-1">
				<ButtonWrapper
					className="border border-border hover:bg-coolGrey-0"
					onClick={() =>
						setSidebarProjectOpen(
							sidebarProjectOpen === projectId ? "" : projectId
						)
					}
				>
					{sidebarProjectOpen ? (
						<IconChevronDown className="text-coolGrey-5" size={14} />
					) : (
						<IconChevronRight className="text-coolGrey-5" size={14} />
					)}
				</ButtonWrapper>
				<li
					onClick={onClick}
					className={`px-1.5 py-1 transition-all ease-in-out duration-500 cursor-pointer flex flex-col text-xs font-medium group hover:bg-coolGrey-1 rounded-normal border border-border
				${project === projectId ? "bg-coolGrey-1" : "bg-white"}`}
				>
					<div className="gap-1 flex justify-between items-center">
						<div className="flex gap-1 items-center">
							<IconRenderer type={type} open={Boolean(sidebarProjectOpen)} />
							<span className=" whitespace-nowrap w-[12rem] text-ellipsis overflow-hidden">
								{name}
							</span>
						</div>
					</div>
				</li>
			</div>
			<div className="border-l ml-2.5">
				<div ref={parent}>
					{sidebarProjectOpen && (
						<>
							{projectFolders.length > 0 ? (
								<div className="pl-[1.05rem] pt-2 border-border">
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
								<div className="pl-2 pt-2  border-border "> </div>
							)}
						</>
					)}
				</div>
				<div ref={parent}>
					{sidebarProjectOpen && chapters?.length !== 0 && (
						<div className="pb-1 border-border">
							{chapters?.map((chapter: IChapter) => (
								<SmallText
									className={`flex items-center justify-between pl-[0.8rem] p-0.5 ml-2 my-0.5 cursor-pointer rounded-normal hover:bg-coolGrey-1 transition-all ease-in-out duration-300 ${
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
		</div>
	);
};
