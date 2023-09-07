import React, { FC, useState } from "react";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverlay,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./SortableItems";
import { IChapter } from "../../interfaces/IChapter";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

export const DragAndDropWrapper: FC<{
	children: React.ReactNode;
	items: IChapter[];
	handleDrop: ({
		chapterId,
		folderId,
	}: {
		chapterId: string;
		folderId: string;
	}) => void;
}> = ({ children, items, handleDrop }) => {
	if (!items) return null;

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			{/* <DragOverlay> */}
			{/* <SortableContext
				items={items.map((item) => item.uid)}
				strategy={verticalListSortingStrategy}
			> */}

			{children}
			{/* </SortableContext> */}
			{/* </DragOverlay> */}
		</DndContext>
	);

	function handleDragEnd(event: { active: any; over: any }) {
		const { active, over } = event;

		if (active.id !== over.id) {
			console.log(over.data.type);
			if (over.data.current.type === "folder") {
				handleDrop({
					chapterId: active.id,
					folderId: over.id,
				});
			}
		}
	}
};
