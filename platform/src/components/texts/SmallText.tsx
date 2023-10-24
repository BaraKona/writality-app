import { FC, ReactNode } from "react";

export const SmallText: FC<{
	children: ReactNode;
	light?: boolean;
	onClick?: () => void;
	className?: string;
}> = ({ children, light, className, onClick }) => {
	return (
		<div
			onClick={onClick}
			className={`text-xs ${
				light ? "text-blueTextLight" : "text-coolGrey-7"
			}  font-medium ${className}`}
		>
			{children}
		</div>
	);
};
