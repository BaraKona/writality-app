import { FC } from "react";
import { IProject, ProjectType } from "../../interfaces/IProject";
import {
	IconBook2,
	IconAtom2,
	IconLayoutGrid,
	IconLayoutList,
	IconList,
} from "@tabler/icons-react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Divider, Skeleton } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { EmptyItem } from "../Chapters/EmptyItem";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { SmallText } from "../texts/SmallText";
import { useBlockNote, BlockNoteView } from "@blocknote/react";
import { useLocalStorage } from "@mantine/hooks";
import { GridProjects } from "../Project/GridProjects";
import { ListProjects } from "../Project/ListProjects";

export const ProfileProjects: FC<{
	projects: IProject[];
	addFavourite: ({
		type,
		url,
		name,
	}: {
		type: string;
		url: string;
		name: string;
	}) => void;
	createProject: () => void;
	removeFavourite: (projectId: string) => void;
	isLoading: boolean;
}> = ({
	projects,
	createProject,
	addFavourite,
	removeFavourite,
	isLoading,
}) => {
	const navigate = useNavigate();

	const [layout, setLayout] = useLocalStorage<"grid" | "list">({
		key: "project-layout",
		defaultValue: "grid",
	});

	if (isLoading) {
		return (
			<div>
				<div className="text-xs font-medium mb-2">Your Projects</div>
				<div className="flex gap-2">
					{[...Array(5)].map((_, i) => (
						<Skeleton key={i} height={150} width={250} />
					))}
				</div>
			</div>
		);
	}

	if (!projects || projects.length === 0) {
		return (
			<div className="border-border dark:border-borderDark border rounded-normal h-[calc(100vh-39rem)] flex content-center items-center">
				<EmptyItem
					title="Projects"
					p1="You do not current have any projects. You may wish to work with other people or create your own project."
					p2="Create your first project to get started"
					createNewChapter={createProject}
				/>
			</div>
		);
	}

	return (
		<div className="">
			<div className="text-md font-medium my-5 flex items-center justify-between">
				Your Projects
				<div className="flex gap-1">
					<button
						className={`border rounded-normal p-2 ${
							layout === "grid"
								? "border-transparent bg-coolGrey-1 dark:bg-hoverDark cursor-default"
								: "border-coolGrey-2 dark:border-borderDark dark:hover:bg-hoverDark hover:border-coolGrey-3 cursor-pointer transition-all ease-in-out duration-300 hover:shadow"
						}`}
						onClick={() => setLayout("grid")}
					>
						<IconLayoutGrid size={16} />
					</button>
					<button
						className={`border rounded-normal p-2 ${
							layout === "list"
								? "border-transparent bg-coolGrey-1 dark:bg-hoverDark cursor-default"
								: "border-coolGrey-2 dark:border-borderDark dark:hover:bg-hoverDark hover:border-coolGrey-3 cursor-pointer transition-all ease-in-out duration-300 hover:shadow"
						}`}
						onClick={() => setLayout("list")}
					>
						<IconList size={16} />
					</button>
				</div>
			</div>

			{layout === "grid" ? (
				<div className="flex flex-row flex-wrap gap-3">
					{projects.map((project) => (
						<GridProjects
							project={project}
							onClick={() => navigate(`/project/${project.uid}/home`)}
						/>
					))}
				</div>
			) : (
				<ListProjects projects={projects} />
			)}
		</div>
	);
};
