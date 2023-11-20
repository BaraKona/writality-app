import { IChapter } from "../../interfaces/IChapter";
import { FC } from "react";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { Text } from "@mantine/core";
import { IconFileText, IconGripVertical, IconTrash } from "@tabler/icons-react";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
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
			className="flex gap-3 dark:hover:bg-hoverDark hover:bg-coolGrey-1 rounded-md border-border bg-base dark:bg-baseDark dark:border-borderDark cursor-default py-1 px-2.5 items-center"
			{...attributes}
			ref={setNodeRef}
			style={style}
		>
			<div
				className=" text-coolGrey-7 dark:text-coolGrey-5 flex place-items-center gap-1 cursor-pointer group grow"
				onClick={openChapter}
			>
				<IconFileText
					size={16}
					className="group-hover:text-black dark:group-hover:text-coolGrey-3 dark:hover:text-coolGrey-1"
				/>
				<p className="text-gray-400 text-xs font-medium group-hover:text-coolGrey-7 dark:group-hover:text-coolGrey-3">
					{chapter.content.title || chapter.title || "Untitled Chapter"}
				</p>
			</div>
			<div className="ml-auto flex gap-2 items-center">
				<Text color="dimmed" size="xs">
					{useTimeFromNow(chapter?.dateUpdated.date) ||
						useTimeFromNow(chapter?.dateCreated.date)}
				</Text>

				<IconTrash
					size={16}
					onClick={openChapterModal}
					className="text-coolGrey-7 hover:text-red-900 cursor-pointer"
				/>

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
