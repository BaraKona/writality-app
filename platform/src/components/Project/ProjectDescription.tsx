import { FC, useEffect } from "react";
import { IProject } from "../../interfaces/IProject";
import { Button, Skeleton, Tooltip } from "@mantine/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { IconDeviceFloppy, IconFileDescription } from "@tabler/icons-react";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { useThemeContext } from "../../Providers/ThemeProvider";
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

	const { theme } = useThemeContext();

	const editor = useBlockNote(
		{
			initialContent: project?.description
				? JSON.parse(project.description)
				: null,
			onEditorContentChange: (editor) => {
				console.log(editor.topLevelBlocks);
			},

			domAttributes: {
				blockContainer: {
					class: "text-xs -mr-10",
				},
			},
		},
		[project]
	);

	return (
		<div className=" flex flex-col flex-grow p-1  bg-base border border-border dark:border-borderDark rounded-normal w-96 h-[calc(100vh-3.2rem)]">
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
						className="bg-base p-2 hover:bg-gray-100 rounded-normal border border-border dark:border-borderDark"
						onClick={() => {
							updateDescription(JSON.stringify(editor.topLevelBlocks) || "");
						}}
					>
						<IconDeviceFloppy size={18} />
					</button>
				</Tooltip>
			</div>
			<div className="overflow-y-auto">
				<BlockNoteView editor={editor} theme={theme} />
			</div>
		</div>
	);
};
