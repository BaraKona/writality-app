import { Button } from "@mantine/core";
import { FC, ReactNode } from "react";

export const BlueButton: FC<{
	onClick?: () => void;
	disabled?: boolean;
	children: ReactNode;
}> = ({ onClick, children, disabled }) => {
	// if (disabled)
	// 	return (
	// 		<Button
	// 			disabled={disabled}
	// 			type="submit"
	// 			className="text-[#f2f2f2] font-medium text-xs flex cursor-pointer w-full  hover:bg-zinc-500 rounded-normal py-2 bg-zinc-500 active:bg-zinc-500 "
	// 		>
	// 			<span className="mx-auto flex items-center gap-2">{children}</span>
	// 		</Button>
	// 	);

	return (
		<Button
			disabled={disabled}
			type="submit"
			onClick={onClick}
			className="w-full"
			size="xs"
			w="100%"
			variant="filled"
			color="grey-blue"
		>
			{children}
		</Button>
	);
};
