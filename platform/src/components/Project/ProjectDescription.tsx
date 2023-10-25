import { FC, useEffect } from "react";
import { IProject } from "../../interfaces/IProject";
import { Button, Skeleton, Tooltip } from "@mantine/core";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { IconDeviceFloppy, IconFileDescription } from "@tabler/icons-react";
import { tooltipStyles } from "../../styles/tooltipStyles";

export const ProjectDescription: FC<{
	project: IProject;
	updateDescription: (description: string) => void;
}> = ({ project, updateDescription }) => {
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
			initialContent: project?.description
				? JSON.parse(project.description)
				: null,
			onEditorContentChange: (editor) => {
				console.log(editor.topLevelBlocks);
			},
		},
		[project]
	);

	return (
		<div className=" flex flex-col flex-grow p-1  bg-base border border-border rounded-normal w-72 hover:w-96 transition-all ease-in-out duration-200 h-[calc(100vh-3.2rem)]">
			<div className="flex justify-between items-center">
				<h3 className=" text-coolGrey-7 font-medium text-sm flex gap-2">
					<IconFileDescription size={20} />
					Project Description
				</h3>
				<Tooltip
					label="Save Description"
					position="left"
					withArrow
					styles={tooltipStyles}
				>
					<button
						className="bg-base p-2 hover:bg-gray-100 rounded-normal border border-border"
						onClick={() => {
							updateDescription(JSON.stringify(editor.topLevelBlocks) || "");
						}}
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
