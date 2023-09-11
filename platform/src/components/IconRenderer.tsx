import React from "react";
import {
	IconAtom,
	IconAtom2,
	IconBook,
	IconBook2,
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
					<IconAtom size={18} />
				) : (
					<IconAtom2 size={18} />
				)
			) : open ? (
				<IconBook size={18} />
			) : (
				<IconBook2 size={18} />
			)}
		</div>
	);
}
