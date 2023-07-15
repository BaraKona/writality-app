import { FC } from "react";

export const ButtonWrapper: FC<{
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
}> = ({ children, onClick, className }) => {
	return (
		<button
			className={`${className} p-0.5 rounded-normal group hover:bg-gray-200 cursor-pointer`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
