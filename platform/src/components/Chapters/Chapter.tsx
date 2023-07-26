import React, { FC, ReactNode } from "react";
import { IChapter } from "../../interfaces/IChapter";
import { book8 } from "../../assets/icons";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { Button, Text } from "@mantine/core";
import { IconFileText, IconTrash } from "@tabler/icons";
export const Chapter: FC<{
	chapter: IChapter;
	openChapter: () => void;
	openChapterModal: () => void;
	disabled: boolean;
}> = ({ chapter, openChapter, openChapterModal, disabled }) => {
	return (
		<div className="flex gap-3 border-b border-border cursor-default py-1 px-2">
			<div
				className=" text-blueText flex place-items-center gap-3 cursor-pointer  group"
				onClick={openChapter}
			>
				<IconFileText size={18} className="group-hover:text-black" />
				<p className="text-gray-400 text-xs font-medium group-hover:text-blueText">
					{chapter.content.title || "Untitled Chapter"}
				</p>
			</div>
			<div className="ml-auto flex gap-2">
				<Text color="dimmed" size="xs">
					{useTimeFromNow(chapter?.dateUpdated.date.toString()) ||
						useTimeFromNow(chapter?.dateCreated.date.toString())}
				</Text>

				<IconTrash
					size={18}
					onClick={openChapterModal}
					className="text-blueText hover:text-red-900 cursor-pointer"
				/>
			</div>
		</div>
	);
};
