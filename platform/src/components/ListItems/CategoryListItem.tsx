import React, { FC, ReactNode } from "react";
import { Loader } from "@mantine/core";
import { IconSquareRoundedPlus } from "@tabler/icons";
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
					className={`flex justify-between items-center ml-0.5 ${mt} font-normal text-xs rounded-normal`}
				>
					{name}
					<p
						onClick={onClick}
						className="text-blueText font-bold cursor-pointer hover:font-semibold hover:text-black"
					>
						{button ? <IconSquareRoundedPlus size={18} /> : ""}
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
