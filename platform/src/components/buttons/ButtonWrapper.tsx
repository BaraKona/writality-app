import { FC } from "react";

export const ButtonWrapper: FC<{
	children: React.ReactNode;
	onClick?: (item?: any) => void;
	className?: string;
}> = ({ children, onClick, className }) => {
	return (
		<button
			className={`${className} p-0.5 rounded-lg group hover:bg-gray-200 dark:hover:bg-hoverDark dark:border-borderDark cursor-pointer`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
