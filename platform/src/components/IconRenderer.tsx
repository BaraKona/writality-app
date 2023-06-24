import React from "react";
import {
	IconAtom,
	IconAtom2,
	IconBook,
	IconBook2,
	IconUsers,
} from "@tabler/icons";
import { HiOutlineUserGroup, HiUserGroup } from "react-icons/hi";
export function IconRenderer({
	type,
	open,
}: {
	type: "standard" | "collaboration";
	open: boolean;
}) {
	return (
		<>
			{type === "collaboration" ? (
				open ? (
					<IconAtom size={23} />
				) : (
					<IconAtom2 size={23} />
				)
			) : open ? (
				<IconBook size={23} />
			) : (
				<IconBook2 size={23} />
			)}
		</>
	);
}
