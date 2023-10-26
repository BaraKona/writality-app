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
			<div className="text-md font-medium my-5 flex items-center justify-between">
				Your Projects
				<div className="flex gap-1">
					<button
						className={`border rounded-normal p-2 ${
							layout === "grid"
								? "border-transparent bg-coolGrey-1"
								: "border-coolGrey-2 hover:border-coolGrey-3 cursor-pointer transition-all ease-in-out duration-300 hover:shadow"
						}`}
						onClick={() => setLayout("grid")}
					>
						<IconLayoutGrid size={16} />
					</button>
					<button
						className={`border rounded-normal p-2 ${
							layout === "list"
								? "border-transparent bg-coolGrey-1"
								: "border-coolGrey-2 hover:border-coolGrey-3 cursor-pointer transition-all ease-in-out duration-300 hover:shadow"
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
						<GridProjects project={project} />
					))}
				</div>
			) : (
				<ListProjects projects={projects} />
			)}
		</div>
	);
};

const ListProjects = ({ projects }: { projects: IProject[] }) => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col gap-1.5">
			{projects.map((project) => (
				<div
					className="gap-2 rounded-normal p-2 border border-border hover:border-coolGrey-3 hover:shadow-sm cursor-pointer transition-all duration-200 ease-in-out"
					onClick={() => navigate(`/project/${project.uid}/home`)}
					key={project.uid}
				>
					<div className="flex justify-between items-center ">
						<div className="flex gap-2 items-center">
							{project.type === ProjectType.standard ? (
								<IconBook2 size={20} className="text-neutral-600" />
							) : (
								<IconAtom2 size={20} className="text-violet-900" />
							)}
							<div className="text-sm font-semibold">{project.title}</div>
						</div>
						<SmallText light>
							{useTimeFromNow(project.dateCreated.date)}
						</SmallText>
					</div>
				</div>
			))}
		</div>
	);
};

const GridProjects = ({ project }: { project: IProject }) => {
	const navigate = useNavigate();
	const editor = useBlockNote(
		{
			initialContent: project?.description
				? JSON.parse(project.description)
				: null,
			onEditorContentChange: (editor) => {
				console.log(editor.topLevelBlocks);
			},
			editable: false,

			domAttributes: {
				blockContainer: {
					class: "text-xs -mx-12",
				},
			},
		},
		[project]
	);

	return (
		<div
			className="gap-2 rounded-normal basis-[15.4rem] pt-3 p-4 border border-border hover:border-coolGrey-3 hover:shadow-md cursor-pointer transition-all duration-200 ease-in-out"
			onClick={() => navigate(`/project/${project.uid}/home`)}
			key={project.uid}
		>
			<div className="flex justify-between items-center py-2">
				{project.type === ProjectType.standard ? (
					<IconBook2 size={20} className="text-neutral-600" />
				) : (
					<IconAtom2 size={20} className="text-violet-900" />
				)}
				<SmallText light>{useTimeFromNow(project.dateCreated.date)}</SmallText>
			</div>

			<div className="flex flex-col">
				<div className="text-lg font-bold">{project.title}</div>
				<Divider my="xs" color="grey.0" />
				<div className="text-xs line-clamp-6 text-gray-500 w-full max-h-44">
					{project.description ? (
						<BlockNoteView editor={editor} />
					) : (
						"This project has no description. Adding a description will help people understand what your project is about and help you locate collaborators."
					)}
				</div>
			</div>
		</div>
	);
};
