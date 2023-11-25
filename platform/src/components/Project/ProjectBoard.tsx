import { FC } from "react";
import { IProject } from "../../interfaces/IProject";
import { Tooltip } from "@mantine/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import {
	IconChalkboard,
	IconClipboard,
	IconDeviceFloppy,
} from "@tabler/icons-react";
import { tooltipStyles } from "../../styles/tooltipStyles";

export const ProjectBoard: FC<{
	project: IProject;
	updateBoard: (description: string) => void;
}> = ({ project, updateBoard }) => {
	const defaultProjectDescription = [
		{
			type: "paragraph",
			content: [
				{
					type: "text",
					text: "This is your project description. You can edit it by clicking the save button below.",
				},
			],
		},
	];

	const editor = useBlockNote(
		{
			initialContent: project?.board ? JSON.parse(project.board) : null,
			domAttributes: {
				blockContainer: {
					class: "dark:!text-coolGrey-3 !text-coolGrey-7",
				},
				editor: {
					class: "dark:!bg-baseDark !bg-base",
				},
			},
		},
		[project]
	);

	return (
		<div className="flex flex-col flex-grow p-1 border border-border dark:border-borderDark rounded-lg">
			<div className="flex justify-between items-center">
				<h3 className=" text-coolGrey-7 dark:text-coolGrey-4 font-medium text-sm flex gap-2 px-4">
					<IconChalkboard size={20} />
					Whiteboard
				</h3>
				<Tooltip
					label="Save Description"
					position="left"
					withArrow
					styles={tooltipStyles}
				>
					<button
						className="p-2 hover:bg-gray-100 dark:hover:bg-hoverDark dark:text-coolGrey-4 rounded-lg border border-border dark:border-borderDark"
						onClick={() => updateBoard(JSON.stringify(editor.topLevelBlocks))}
					>
						<IconDeviceFloppy size={18} />
					</button>
				</Tooltip>
			</div>
			<div className="overflow-y-auto h-[calc(100dvh-10.8rem)]">
				<BlockNoteView editor={editor} />
			</div>
		</div>
	);
};
