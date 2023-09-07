import React, { FC } from "react";
import { useDroppable } from "@dnd-kit/core";

export const Droppable: FC<{
	children: React.ReactNode;
	id: string | number;
	type?: string;
}> = ({ children, id, type }) => {
	const { isOver, setNodeRef } = useDroppable({
		id,
		data: { type },
	});
	const style = {
		color: isOver ? "green" : undefined,
	};

	return (
		<div ref={setNodeRef} style={style}>
			{children}
		</div>
	);
};
