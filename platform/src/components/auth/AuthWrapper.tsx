import { FC, ReactNode } from "react";

export const AuthWrapper: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className="bg-base dark:bg-baseDark">
			<div className="h-screen flex flex-col max-w-5xl mx-auto gap-1 items-center justify-center">
				{children}
			</div>
		</div>
	);
};
