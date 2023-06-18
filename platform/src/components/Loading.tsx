import { Loader } from "@mantine/core";
import { FC, ReactNode } from "react";
export const Loading: FC<{
	children?: ReactNode;
	isLoading: boolean;
}> = ({ children, isLoading }) => {
	return (
		<>
			{isLoading ? (
				<div className="flex justify-center items-center h-[calc(100vh-48px)] bg-white rounded-t-md">
					<Loader variant="bars" color="gray" />
				</div>
			) : (
				<>{children}</>
			)}
		</>
	);
};
