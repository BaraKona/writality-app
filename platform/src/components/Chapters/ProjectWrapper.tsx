import { FC, ReactNode } from "react";
import { BannerImage } from "../BannerImage";

export const ProjectWrapper: FC<{
	children: ReactNode;
	tab: string;
}> = ({ children, tab }) => {
	return (
		<div
			className={`flex flex-col bg-base dark:bg-baseDark gap-2 rounded-md w-full transition-all ease-in-out duration-200"`}
		>
			<BannerImage
				image={
					"https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				}
				alt="Banner by Jez Timms on Unsplash"
				height={`h-48 ${
					tab === "overview" ? "" : "!h-0"
				} transition-all ease-in-out duration-400`}
			/>
			<div className="flex">{children}</div>
		</div>
	);
};
