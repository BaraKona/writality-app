import { FC } from "react";
import { IProject, ProjectType } from "../../interfaces/IProject";
import { IconBook2, IconAtom } from "@tabler/icons-react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Divider, Skeleton } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { EmptyItem } from "../Chapters/EmptyItem";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { SmallText } from "../texts/SmallText";

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
			<div className="border-border border rounded-normal h-[calc(100vh-39rem)] flex content-center items-center">
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
			<div className="text-md font-medium my-5">Your Projects</div>
			<div className=" flex flex-row flex-wrap gap-3">
				{projects.map((project) => (
					<div
						className="gap-2 rounded-normal basis-[15.4rem] pt-3 p-4 border border-border hover:border-coolGrey-3 hover:shadow-md cursor-pointer transition-all duration-200 ease-in-out"
						onClick={() => navigate(`/project/${project.uid}/home`)}
						key={project.uid}
					>
						<div className="flex justify-between items-center py-2">
							{project.type === ProjectType.standard ? (
								<IconBook2 size={20} className="w-5" />
							) : (
								<IconAtom size={20} className="w-5" />
							)}
							<SmallText light>
								{useTimeFromNow(project.dateCreated.date)}
							</SmallText>
						</div>

						<div className="flex flex-col">
							<div className="text-lg font-bold">{project.title}</div>
							<Divider my="xs" color="grey.0" />
							<div className="text-xs line-clamp-6 text-gray-500 w-full">
								{project.description ||
									"This project has no description. Adding a description will help people understand what your project is about and help you locate collaborators."}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
