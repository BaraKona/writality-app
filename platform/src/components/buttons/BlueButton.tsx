import { FC, ReactNode } from "react";

export const BlueButton: FC<{
	onClick?: () => void;
	children: ReactNode;
}> = ({ onClick, children }) => {
	return (
		<button
			type="submit"
			onClick={onClick}
			className="text-[#f2f2f2] font-medium text-xs flex cursor-pointer w-full  hover:bg-gray-600 rounded-normal py-2 bg-blueText active:bg-gray-700 "
		>
			<span className="mx-auto flex items-center gap-2">{children}</span>
		</button>
	);
};
