import { FC, ReactNode } from "react";

export const Title: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<h1 className="text-4xl my-8 font-bold text-coolGrey-8 dark:text-coolGrey-2">
			{children}
		</h1>
	);
};
