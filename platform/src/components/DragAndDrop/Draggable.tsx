import React, { FC } from "react";
import { useDraggable } from "@dnd-kit/core";

export const Draggable: FC<{
	children: React.ReactNode;
	id: string | number;
}> = ({ children, id }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id,
	});
	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined;

	return (
		<button ref={setNodeRef} style={style} {...attributes} className="w-full">
			{children}
		</button>
	);
};
