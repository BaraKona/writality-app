import React, { ReactNode, FC } from "react";
import { useLocation } from "react-router-dom";
export const CommunityListItem: FC<{
	children: ReactNode;
	name: string;
	onClick?: () => void;
}> = ({ name, onClick, children }) => {
	const { pathname } = useLocation();

	return (
		<li onClick={onClick} className="cursor-default">
			<a
				className={`ml-3 flex text-md font-normal rounded  ${
					pathname.includes(name.toLowerCase())
						? "text-purple-300 bg-base border border-baseBorderDark"
						: "text-stone-300"
				} hover:bg-base`}
			>
				{children}
				<span className={`ml-3 `}>{name}</span>
			</a>
		</li>
	);
};
