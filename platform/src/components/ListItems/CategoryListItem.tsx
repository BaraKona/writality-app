import React, { FC, ReactNode } from "react";
import { Loader } from "@mantine/core";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
export const CategoryListItem: FC<{
	children?: ReactNode;
	loading?: boolean;
	button?: boolean;
	className?: string;
}> = ({ children, button, loading, className }) => {
	return (
		<ul className={`p-1.5 ${className}`}>
			<li>
				<h2
					className={`flex justify-between items-center ml-0.5 font-normal text-xs rounded-normal`}
				>
					<p className="text-blueText font-bold cursor-pointer hover:font-semibold hover:text-black">
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
