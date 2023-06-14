import { FC, useEffect } from "react";
import { IProject } from "../../interfaces/IProject";
import { BaseEditor } from "../Editor";
import { Button } from "@mantine/core";
export const ProjectDescription: FC<{
	project: IProject;
	editor: any;
	updateDescription: (description: string) => void;
	user: string;
}> = ({ project, editor, updateDescription, user }) => {
	useEffect(() => {
		if (editor) editor.commands.setContent(project?.description);
	}, [project]);

	return (
		<div className="flex flex-col flex-grow px-3 mx-auto w-80 bg-white">
			<div className="">
				<h3 className="text-center font-semibold shadow-lg">
					Project Description{" "}
				</h3>
			</div>

			<BaseEditor editor={editor} height="650px" />
			{user === project.owner && (
				<>
					{project.description !== editor.getHTML() && (
						<Button
							className="mt-auto"
							variant="default"
							onClick={() => updateDescription(editor.getHTML())}
						>
							Save
						</Button>
					)}
				</>
			)}
		</div>
	);
};
