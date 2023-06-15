import React, { FC, ReactNode } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { Loading } from "../Loading";
import { Loader } from "@mantine/core";
import { IconPlus, IconSquareRoundedPlus } from "@tabler/icons";
export const CategoryListItem: FC<{
	children?: ReactNode;
	mt: string;
	loading?: boolean;
	onClick?: () => void;
	name: string;
	button?: boolean;
}> = ({ children, mt, onClick, name, button, loading }) => {
	return (
		<ul>
			<li>
				<h2
					className={`flex justify-between items-center ml-1 ${mt} font-[600] text-sm rounded-lg`}
				>
					{name}
					<p
						onClick={onClick}
						className="text-blueText font-bold cursor-pointer hover:font-semibold hover:text-black"
					>
						{button ? <IconSquareRoundedPlus size={20} /> : ""}
					</p>
				</h2>
			</li>
			{loading ? (
				<Loader
					variant="bars"
					color="gray"
					className="mx-auto my-2"
					size={25}
				/>
			) : (
				<>{children}</>
			)}
		</ul>
	);
};
