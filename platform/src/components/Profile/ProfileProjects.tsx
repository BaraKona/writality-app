import { FC } from "react";
import { IProject, ProjectType } from "../../interfaces/IProject";
import { IconBook2, IconAtom } from "@tabler/icons-react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Skeleton } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { EmptyItem } from "../Chapters/EmptyItem";

export const ProfileProjects: FC<{
	projects: {
		standard: IProject[];
		collaboration: IProject[];
	};
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

	if (isLoading) {
		return (
			<div>
				<div className="text-xs font-medium mb-2 text-coolGrey-7">
					Your projects
				</div>
				<div className="flex gap-2">
					{[...Array(5)].map((_, i) => (
						<Skeleton key={i} height={150} width={250} />
					))}
				</div>
			</div>
		);
	}

	if (projects?.standard?.length === 0 || !projects) {
		return (
			<div className="border-border border rounded-normal h-[calc(100vh-39rem)] flex content-center items-center text-coolGrey-7">
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
			<div className="text-xs font-medium text-coolGrey-7">Your projects</div>
			<div className=" overflow-y-auto flex flex-row flex-wrap gap-3">
				{projects.standard.map((project) => (
					<div
						className="flex gap-2 rounded-normal basis-60 p-2 border border-border text-coolGrey-7"
						onClick={() => navigate(`/project/${project.uid}/home`)}
					>
						{project.type === ProjectType.standard ? (
							<IconBook2 size={20} className="w-5" />
						) : (
							<IconAtom size={20} className="w-5" />
						)}
						<div className="flex flex-col">
							<div className="text-sm font-bold">{project.title}</div>
							{/* <TypographyStylesProvider> */}
							<div className="text-xs line-clamp-6 text-gray-500 w-full">
								{project.description}
							</div>
							{/* </TypographyStylesProvider> */}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
