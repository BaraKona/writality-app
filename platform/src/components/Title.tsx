import { FC, ReactNode } from "react";

export const Title: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<h1 className="text-md my-8 font-bold text-coolGrey-800">{children}</h1>
	);
};
