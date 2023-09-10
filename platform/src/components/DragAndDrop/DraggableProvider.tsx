// context provider for the dnd toolkit

import React, { FC, ReactNode, useContext, createContext } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";

type DraggableContextType = {
	Draggable: ({ id }: { id: string | number }) => {
		attributes: any;
		listeners: any;
		setNodeRef: any;
		style: any;
	};
};

const draggbleContextDefaultValues: DraggableContextType = {
	Draggable: () => {
		return {
			attributes: {},
			listeners: {},
			setNodeRef: () => {},
			style: {},
		};
	},
};

const DragContext = createContext<DraggableContextType>(
	draggbleContextDefaultValues
);

export function useDraggableContext() {
	return useContext(DragContext);
}

export const DraggableProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	function Draggable({ id }: { id: string | number }) {
		const { attributes, listeners, setNodeRef, transform } = useDraggable({
			id,
		});
		const style = transform
			? {
					transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
			  }
			: undefined;

		return {
			attributes,
			listeners,
			setNodeRef,
			style,
		};
	}

	const value = {
		Draggable,
	};

	return (
		<DndContext>
			<DragContext.Provider value={value}>{children}</DragContext.Provider>
		</DndContext>
	);
};
