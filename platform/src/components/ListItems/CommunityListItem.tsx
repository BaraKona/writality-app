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
				className={`p-1.5 flex mb-1 text-sm font-normal rounded-md  ${
					pathname.includes(name.toLowerCase())
						? "text-black bg-white"
						: "text-black"
				} hover:bg-white`}
			>
				{children}
				<span className={`ml-3 `}>{name}</span>
			</a>
		</li>
	);
};
