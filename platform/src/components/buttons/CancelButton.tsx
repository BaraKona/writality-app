import { FC } from "react";

export const CancelButton: FC<{
	onClick?: () => void;
}> = ({ onClick }) => {
	return (
		<button
			onClick={onClick}
			className="text-blueText font-medium text-sm flex cursor-pointer items-center gap-1 group hover:text-black hover:bg-gray-100 rounded-md py-1 px-3"
		>
			Cancel
		</button>
	);
};
