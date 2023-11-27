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
			className={`transition-all ease-in-out duration-500 dark:text-coolGrey-4 ${
				sidebarProjectOpen ? "" : ""
			} `}
		>
			<ul className="flex items-center">
				<li
					onClick={onClick}
					className={`p-2 py-1 gap-1 transition-all ease-in-out duration-500 cursor-pointer flex text-xs font-medium group hover:bg-coolGrey-1 dark:hover:bg-hoverDark rounded-md
				${
					project === projectId
						? "bg-coolGrey-1 dark:bg-hoverDark dark:hover:border-hoverDark"
						: "dark:bg-baseDark"
				}`}
				>
					<ButtonWrapper
						className="dark:hover:bg-hoverDark dark:hover:border-hoverDark hover:bg-coolGrey-0 !rounded-md"
						onClick={(e: any) => {
							e.stopPropagation(),
								setSidebarProjectOpen(
									sidebarProjectOpen === projectId ? "" : projectId
								);
						}}
					>
						{sidebarProjectOpen ? (
							<IconChevronDown className="text-coolGrey-5" size={16} />
						) : (
							<IconChevronRight className="text-coolGrey-5" size={16} />
						)}
					</ButtonWrapper>
					<div className="gap-1 flex justify-between items-center">
						<div
							className={`flex gap-1 items-center ${
								type === "standard"
									? "text-stone-500 dark:text-stone-400"
									: "dark:text-cyan-600 text-sky-700"
							}`}
						>
							<IconRenderer type={type} open={Boolean(sidebarProjectOpen)} />
							<span className=" whitespace-nowrap w-[12rem] text-ellipsis overflow-hidden">
								{name}
							</span>
						</div>
					</div>
				</li>
			</ul>
			<div className="ml-3">
				<div ref={parent}>
					{sidebarProjectOpen && (
						<>
							{projectFolders.length > 0 ? (
								<div className="pl-[1.05rem] pt-0.5">
									{projectFolders
										.filter((folder) => !folder.parentId)
										?.map((folder) => {
											return (
												<FolderListItem
													key={`folder_${folder.uid}`}
													folder={folder}
													folderChapters={folder.chapters}
													allFolders={projectFolders}
													small
													projectId={projectId}
													className="rounded-md"
													location="sidebar"
													level={0}
												/>
											);
										})}
								</div>
							) : (
								<div className="pl-2 pt-2"> </div>
							)}
						</>
					)}
				</div>
				<div ref={parent}>
					{sidebarProjectOpen && chapters?.length !== 0 && (
						<div className="pb-1 border-border dark:border-borderDark">
							{chapters?.map((chapter: IChapter) => (
								<SmallText
									key={chapter.uid}
									className={`dark:text-coolGrey-5 ml-2 flex items-center justify-between pl-[0.8rem] p-0.5 ml-2p my-0.5 cursor-pointer rounded hover:bg-coolGrey-1 dark:hover:bg-hoverDark transition-all ease-in-out duration-300 ${
										chapterId === chapter.uid
											? "bg-coolGrey-1 dark:bg-hoverDark"
											: ""
									}`}
									onClick={() =>
										navigate(`project/${projectId}/chapter/${chapter.uid}`)
									}
								>
									<span className="flex gap-1.5 items-start">
										<IconFileText size={16} className="flex-shrink-0" />
										{chapter?.content?.title || "Untitled Chapter"}
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
