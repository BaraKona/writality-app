import { FC, ReactNode } from "react";

export const AuthTitle: FC<{
	title: string;
	subtitle: string;
	children: ReactNode;
}> = ({ title, subtitle, children }) => {
	return (
		<div className="max-w-sm mx-auto">
			<div className="text-center">
				<h2 className="text-xl font-bold text-blueText">{title}</h2>
				<p className="text-sm text-gray-400 mb-4">{subtitle}</p>
			</div>
			{children}
		</div>
	);
};
