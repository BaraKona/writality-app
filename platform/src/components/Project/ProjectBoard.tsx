import { FC, useEffect } from "react";
import { IProject } from "../../interfaces/IProject";
import { Button, Skeleton, Tooltip } from "@mantine/core";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import {
	IconClipboard,
	IconDeviceFloppy,
	IconFileDescription,
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
			onEditorContentChange: (editor) => {
				console.log(editor.topLevelBlocks);
			},
		},
		[project]
	);

	return (
		<div className="lg:row-span-4 lg:col-span-full col-span-full flex flex-col flex-grow p-1  bg-base border border-border dark:border-borderDark rounded-normal">
			<div className="flex justify-between items-center">
				<h3 className=" text-coolGrey-7 font-medium text-sm flex gap-2">
					<IconClipboard size={20} />
					Board
				</h3>
				<Tooltip
					label="Save Description"
					position="left"
					withArrow
					styles={tooltipStyles}
				>
					<button
						className="bg-base p-2 hover:bg-gray-100 rounded-normal border border-border dark:border-borderDark"
						onClick={() => updateBoard(JSON.stringify(editor.topLevelBlocks))}
					>
						<IconDeviceFloppy size={18} />
					</button>
				</Tooltip>
			</div>
			<div className="overflow-y-auto">
				<BlockNoteView editor={editor} theme="light" />
			</div>
		</div>
	);
};
