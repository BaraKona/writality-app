import React, { FC } from "react";
import { BaseEditor } from "./BaseEditor";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { IChapterContent } from "../../interfaces/IChapterContent";
import { Divider, Skeleton } from "@mantine/core";
import { useEditor } from "@tiptap/react";
import { extensions } from "./utils/editorExtensions";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import { BlueButton } from "../buttons/BlueButton";
import { IconGitMerge } from "@tabler/icons";
export const MergeEditor: FC<{
	branch: IChapterVersion;
	main: IChapterContent;
	editor: any;
	mergeReplace: () => void;
}> = ({ branch, main, editor, mergeReplace }) => {
	if (!editor) {
		return (
			<div className="flex gap-2 h-[calc(100vh-400px)]">
				<Skeleton height={400} mt={6} width={400} />
				<Skeleton height={400} mt={6} width={400} />
			</div>
		);
	}

	// take main content richtext and add strikethrough to it and make colour red

	const removedContent = main.content.replace(
		/<p([^>]*)>(.*?)<\/p>/gs,
		"<p $1><span style='color:red;text-decoration:line-through;background-color:#f2f;'>$2</span></p>"
	);

	return (
		<div className="flex gap-2 flex-col w-full h-[calc(100vh-180px)]">
			<BaseEditor
				editor={editor}
				chapterTitle={main.title}
				setTitle={() => console.log("setTitle")}
				isTitle={true}
				content={removedContent + branch.content}
				height="calc(100vh - 220px)"
				noCounter
				noBack
				noBar2
			/>
			<div>
				<Divider className="border-lightBorder" />
				<div className="w-64 p-1 ml-auto">
					<BlueButton onClick={mergeReplace}>
						<IconGitMerge size={18} />
						Accept changes and merge
					</BlueButton>
				</div>
			</div>
		</div>
	);
};
