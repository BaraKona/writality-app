import { FC, ReactNode } from "react";

export const SmallText: FC<{
	children: ReactNode;
	light?: boolean;
	className?: string;
}> = ({ children, light, className }) => {
	return (
		<div
			className={`text-xs ${
				light ? "text-blueTextLight" : "to-blueText"
			} text-blueText font-medium ${className}`}
		>
			{children}
		</div>
	);
};
