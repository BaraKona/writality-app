import { IChapter } from "../../interfaces/IChapter";
import React, { FC, ReactNode } from "react";
import { book8 } from "../../assets/icons";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { Button, Menu, Text } from "@mantine/core";
import {
	IconDotsVertical,
	IconFileText,
	IconGripVertical,
	IconTrash,
} from "@tabler/icons-react";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import { useDraggable } from "@dnd-kit/core";
import { useDraggableContext } from "../DragAndDrop/DraggableProvider";

export const Chapter: FC<{
	chapter: IChapter;
	openChapter: () => void;
	openChapterModal: () => void;
	disabled: boolean;
	listenerId?: string;
}> = ({ chapter, openChapter, openChapterModal, disabled, listenerId }) => {
	const { Draggable } = useDraggableContext();

	const { attributes, listeners, setNodeRef, style } = Draggable({
		id: listenerId || "",
	});

	return (
		<div
			className="flex gap-3 border rounded-normal border-border bg-white cursor-default py-1 px-2.5 items-center"
			{...attributes}
			ref={setNodeRef}
			style={style}
		>
			<div
				className=" text-coolGrey-7 flex place-items-center gap-3 cursor-pointer  group"
				onClick={openChapter}
			>
				<IconFileText size={18} className="group-hover:text-black" />
				<p className="text-gray-400 text-xs font-medium group-hover:text-coolGrey-7">
					{chapter.content.title || "Untitled Chapter"}
				</p>
			</div>
			<div className="ml-auto flex gap-2 items-center">
				<Text color="dimmed" size="xs">
					{useTimeFromNow(chapter?.dateUpdated.date.toString()) ||
						useTimeFromNow(chapter?.dateCreated.date.toString())}
				</Text>

				<IconTrash
					size={18}
					onClick={openChapterModal}
					className="text-coolGrey-7 hover:text-red-900 cursor-pointer"
				/>

				<ButtonWrapper>
					<IconDotsVertical size={14} />
				</ButtonWrapper>
				{listenerId && (
					<ButtonWrapper>
						<IconGripVertical
							size={14}
							{...listeners}
							className="text-coolGrey-4 cursor-pointer"
						/>
					</ButtonWrapper>
				)}
			</div>
		</div>
	);
};
