import { IconX } from "@tabler/icons-react";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { IconRenderer } from "../IconRenderer";
import { TypographyStylesProvider } from "@mantine/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { BlockNoteEditor } from "@blocknote/core";

export const ProjectListItem: FC<{
	name: string;
	projectId: string;
	description?: string;
	onClick?: () => void;
	removeFavourite?: () => void;
	type: "standard" | "collaboration";
}> = ({ name, onClick, projectId, type, removeFavourite, description }) => {
	const { project } = useParams();
	const [markdown, setMarkdown] = useState<string>("");
	const editor: BlockNoteEditor = useBlockNote({
		initialContent: description ? JSON.parse(description) : null,
		onEditorReady: async (editor) => {
			setMarkdown(await editor.blocksToMarkdown(editor.topLevelBlocks));
		},
	});

	return (
		<li
			onClick={onClick}
			className={`px-1.5 py-1 transition-all ease-in-out duration-500 flex flex-col text-xs font-medium mb-1 group hover:bg-coolGrey-2 rounded-normal cursor-default h-20 ${
				projectId === project
					? "bg-coolGrey-2 text-coolGrey-7 border border-coolGrey-2"
					: "bg-transparent text-coolGrey-5 border border-border"
			}`}
		>
			<div className="gap-1 flex  items-center">
				<IconRenderer type={type} open={projectId === project} />
				<span className=" whitespace-nowrap w-[12rem] text-ellipsis overflow-hidden">
					{name}
				</span>

				{/* <IconX
						onClick={(e) => {
							e.stopPropagation(), removeFavourite ? removeFavourite() : null;
						}}
						size={10}
						stroke={3}
						className="group-hover:visible cursor-pointer invisible hover:black ml-auto text-gray-400"
					/> */}
			</div>
			{/* <TypographyStylesProvider>
				<div
					className={`text-xs text-coolGrey-4 w-[13rem] line-clamp-3 ${
						projectId === project
							? "bg-coolGrey-2 text-coolGrey-7"
							: "bg-transparent text-coolGrey-4"
					}`}
					dangerouslySetInnerHTML={{ __html: description as string }}
				/>
			</TypographyStylesProvider> */}
			<div
				className={`text-xs text-coolGrey-4 w-[13rem] line-clamp-3 ${
					projectId === project
						? "bg-coolGrey-2 text-coolGrey-7"
						: "bg-transparent text-coolGrey-4"
				}`}
			>
				{/* <BlockNoteView editor={editor} theme={"light"} /> */}
				{markdown}
			</div>
		</li>
	);
};
