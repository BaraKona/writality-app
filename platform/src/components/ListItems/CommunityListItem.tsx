import React, { ReactNode, FC } from "react";
import { useLocation } from "react-router-dom";
export const CommunityListItem: FC<{
	children: ReactNode;
	name: string;
	onClick?: () => void;
}> = ({ name, onClick, children }) => {
	const { pathname } = useLocation();
	const path = pathname.split("/")[2];
	console.log(path);
	return (
		<li onClick={onClick} className="cursor-default">
			<a
				className={`p-1.5 flex mb-1 text-sm font-medium rounded-md  ${
					path.includes(name.toLowerCase())
						? "text-lack bg-white font-medium"
						: "text-blueText"
				} hover:bg-white`}
			>
				{children}
				<span className={`ml-2 `}>{name}</span>
			</a>
		</li>
	);
};
