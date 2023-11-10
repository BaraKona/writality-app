import React from "react";
import {
	IconBook,
	IconBook2,
	Icon3dCubeSphere,
	IconUsers,
} from "@tabler/icons-react";
import { HiOutlineUserGroup, HiUserGroup } from "react-icons/hi";
import { useAutoAnimate } from "@formkit/auto-animate/react";
export function IconRenderer({
	type,
	open,
}: {
	type: "standard" | "collaboration";
	open: boolean;
}) {
	const [parent] = useAutoAnimate();
	return (
		<div ref={parent}>
			{type === "collaboration" ? (
				open ? (
					<Icon3dCubeSphere size={18} className="text-cyan-800" />
				) : (
					<Icon3dCubeSphere size={18} className="text-cyan-800" />
				)
			) : open ? (
				<IconBook size={18} className="text-neutral-600 dark:text-stone-500" />
			) : (
				<IconBook2 size={18} className="text-neutral-600 dark:text-stone-500" />
			)}
		</div>
	);
}
