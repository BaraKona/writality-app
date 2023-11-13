import { FC } from "react";

export const CancelButton: FC<{
	onClick?: () => void;
}> = ({ onClick }) => {
	return (
		<button
			onClick={onClick}
			className="text-coolGrey-7 font-medium text-xs flex cursor-pointer items-center gap-1 group hover:text-black dark:hover:text-coolGrey-1 hover:bg-gray-100 rounded-md py-1 px-3"
		>
			Cancel
		</button>
	);
};
