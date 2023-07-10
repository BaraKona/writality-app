import { FC } from "react";
import { IProject, ProjectType } from "../../interfaces/IProject";
import {
	IconBook2,
	IconAtom,
	IconPlus,
	IconHeartPlus,
	IconHearts,
} from "@tabler/icons";
import { useAuthContext } from "../../contexts/AuthContext";
export const LibraryProjects: FC<{
	projects: IProject[];
	addFavourite: (projectId: string) => void;
	createProject: () => void;
}> = ({ projects, createProject, addFavourite }) => {
	const { currentUser } = useAuthContext();

	return (
		<div>
			<div className="text-sm font-medium mb-2">Your Projects</div>
			<div className="flex flex-row flex-wrap gap-4">
				{projects.map((project) => (
					<div
						className="flex flex-col basis-64 border border-gray-200 rounded-md px-4 py-2 hover:shadow-sm cursor-default group"
						key={project.uid}
					>
						<div className="flex flex-row items-start gap-2">
							{project.type === ProjectType.standard ? (
								<IconBook2 size={24} />
							) : (
								<IconAtom size={24} />
							)}
							<div className="flex flex-col">
								<div className="text-sm font-bold">{project.title}</div>
								<div className="text-xs">{project.description}</div>
							</div>
							{currentUser.favouriteProjects.includes(project.uid) ? (
								<div className="ml-auto cursor-pointer hover:text-black  transition-all ease-in-out duration-300">
									<IconHearts size={16} />
								</div>
							) : (
								<div className="ml-auto cursor-pointer hover:text-black invisible group-hover:visible transition-all ease-in-out duration-300">
									<IconHeartPlus
										size={16}
										onClick={() => addFavourite(project.uid)}
									/>
								</div>
							)}
						</div>
					</div>
				))}
				<div
					className="flex flex-col border border-gray-200 rounded-md px-4 py-2 hover:shadow-sm cursor-pointer basis-40"
					onClick={createProject}
				>
					<div className="flex flex-col items-center gap-2">
						<IconPlus size={24} />
						<div className="flex flex-col text-center">
							<div className="text-xs">Click here to create a new project.</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
