import { IProject, ProjectType } from "../../interfaces/IProject";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { IconAtom2, IconBook2 } from "@tabler/icons-react";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { SmallText } from "../texts/SmallText";
import { Divider } from "@mantine/core";

export const GridProjects = ({
	project,
	onClick,
}: {
	project: IProject;
	onClick?: () => void;
}) => {
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
					class: "text-xs -mx-12 dark:!text-coolGrey-4 !text-coolGrey-6",
				},
				editor: {
					class: "dark:!bg-transparent !bg-base",
				},
			},
		},
		[project]
	);

	return (
		<div
			className="gap-2 rounded-lg basis-[15.4rem] pt-3 p-4 border border-border dark:border-borderDark hover:border-coolGrey-3 dark:hover:shadow-none dark:hover:border-coolGrey-5 hover:shadow-md cursor-pointer transition-all duration-200 ease-in-out"
			onClick={onClick}
			key={project.uid}
		>
			<div className="flex justify-between items-center py-2">
				{project.type === ProjectType.standard ? (
					<IconBook2
						size={20}
						className="text-neutral-600 dark:text-stone-500"
					/>
				) : (
					<IconAtom2 size={20} className="text-cyan-800" />
				)}
				<SmallText light>
					{useTimeFromNow(
						project.dateUpdated?.date || project.dateCreated.date
					)}
				</SmallText>
			</div>

			<div className="flex flex-col">
				<div className="text-lg font-bold">{project.title}</div>
				<Divider
					my="xs"
					className="!border-coolGrey-1 dark:!border-borderDark"
				/>
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
