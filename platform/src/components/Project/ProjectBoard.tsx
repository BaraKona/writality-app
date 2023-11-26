import { FC } from "react";
import { IProject } from "../../interfaces/IProject";
import { Divider, Tooltip } from "@mantine/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import {
	IconChalkboard,
	IconClipboard,
	IconDeviceFloppy,
} from "@tabler/icons-react";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { ButtonWrapper } from "../buttons/ButtonWrapper";

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
			<div className="flex justify-between items-center px-2">
				<h3 className=" text-coolGrey-7 dark:text-coolGrey-4 font-medium text-sm flex gap-2 ">
					<IconChalkboard size={20} />
					Whiteboard
				</h3>
				<Tooltip
					label="Save Description"
					position="left"
					withArrow
					styles={tooltipStyles}
				>
					<ButtonWrapper
						className="p-2"
						onClick={() => updateBoard(JSON.stringify(editor.topLevelBlocks))}
					>
						<IconDeviceFloppy size={18} />
					</ButtonWrapper>
				</Tooltip>
			</div>
			<Divider className="!my-1 dark:!border-borderDark !border-border" />
			<div className="overflow-y-auto h-[calc(100dvh-12rem)]">
				<BlockNoteView editor={editor} />
			</div>
		</div>
	);
};
