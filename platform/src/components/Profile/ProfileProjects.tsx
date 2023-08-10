import { FC } from "react";
import { IProject, ProjectType } from "../../interfaces/IProject";
import {
	IconBook2,
	IconAtom,
	IconPlus,
	IconBookmarkPlus,
	IconBookmarkMinus,
	IconBookmarkFilled,
} from "@tabler/icons-react";
import { TbHeartFilled } from "react-icons/tb";
import { useAuthContext } from "../../contexts/AuthContext";
import { TypographyStylesProvider, Skeleton, Divider } from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";
import { useLocation, useNavigate } from "react-router-dom";
import { NoChapters } from "../Chapters";

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
	const { currentUser } = useAuthContext();
	const navigate = useNavigate();
	const path = useLocation().pathname;
	if (isLoading) {
		return (
			<div>
				<div className="text-xs font-medium mb-2">Your Posts</div>
				<div className="flex gap-2">
					{[...Array(5)].map((_, i) => (
						<Skeleton key={i} height={150} width={250} />
					))}
				</div>
			</div>
		);
	}

	if (projects.length === 0) {
		return (
			<div className="border-border border h-[calc(100vh-9rem)] rounded-normal">
				<NoChapters
					title="Projects"
					p1="You do not current have any projects. You may wish to work with other people or create your own project."
					p2="Create your first project to get started"
					createNewChapter={createProject}
				/>
			</div>
		);
	}

	return (
		<div className="rounded-normal border border-border bg-base p-2">
			<div className="text-xs font-medium">Your Projects</div>
			<Divider color="grey.0" mt={4} />
			<div className="h-[calc(100vh-11rem)] overflow-y-auto flex flex-col gap-2">
				{projects.map((project) => (
					<div
						className="flex gap-2 border border-border rounded md basis-52 p-2"
						onClick={() => navigate(`/project/${project.uid}/home`)}
					>
						{project.type === ProjectType.standard ? (
							<IconBook2 size={20} className="w-5" />
						) : (
							<IconAtom size={20} className="w-5" />
						)}
						<div className="flex flex-col">
							<div className="text-sm font-bold">{project.title}</div>
							<TypographyStylesProvider>
								<div
									dangerouslySetInnerHTML={{
										__html: project.description,
									}}
									className="text-xs line-clamp-6 text-gray-500 w-full"
								/>
							</TypographyStylesProvider>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
