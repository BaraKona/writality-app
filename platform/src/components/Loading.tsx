import { Loader } from "@mantine/core";
import { FC, ReactNode } from "react";
export const Loading: FC<{
	children?: ReactNode;
	isLoading: boolean;
}> = ({ children, isLoading }) => {
	return (
		<>
			{isLoading ? (
				<div className="flex justify-center items-center h-[calc(100vh-42px)] bg-base rounded-md">
					<Loader variant="bars" color="gray" />
				</div>
			) : (
				<>{children}</>
			)}
		</>
	);
};
