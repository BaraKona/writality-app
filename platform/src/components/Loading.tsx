import { Loader } from "@mantine/core";
import { FC, ReactNode } from "react";
export const Loading: FC<{
	children?: ReactNode;
	isLoading: boolean;
}> = ({ children, isLoading }) => {
	return (
		<>
			{isLoading ? (
				<div className="flex justify-center items-center h-[calc(100vh-42px)] bg-white rounded-normal">
					<Loader variant="bars" color="gray" />
				</div>
			) : (
				<>{children}</>
			)}
		</>
	);
};
