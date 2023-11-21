import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FC, ReactNode } from "react";

export const AuthTitle: FC<{
	title: string;
	subtitle: string;
	children?: ReactNode;
}> = ({ title, subtitle, children }) => {
	const [parent] = useAutoAnimate();
	return (
		<div className="max-w-sm mx-auto" ref={parent}>
			<div className="text-center">
				<h2 className="text-xl font-bold text-coolGrey-7 dark:text-coolGrey-4">
					{title}
				</h2>
				<p className="text-sm text-coolGrey-4 dark:text-coolGrey-6 mb-4">
					{subtitle}
				</p>
			</div>
			{children}
		</div>
	);
};
