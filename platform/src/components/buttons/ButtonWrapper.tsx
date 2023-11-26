import { FC } from "react";

export const ButtonWrapper: FC<{
	children: React.ReactNode;
	onClick?: (item?: any) => void;
	className?: string;
}> = ({ children, onClick, className }) => {
	return (
		<button
			className={`${className} p-0.5 bg-base hover:bg-gray-100 rounded-lg  dark:bg-baseDark dark:hover:bg-hoverDark cursor-pointer transition-all ease-in-out duration-200`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
