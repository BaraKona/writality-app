import { FC } from "react";
import { Text } from "@mantine/core";

export const NotificationActions: FC<{
	onClick: (item: any) => void;
}> = ({ onClick }) => {
	return (
		<div className="flex gap-2">
			<button className="ml-auto  flex items-center gap-2 text-coolGrey-4 dark:text-coolGrey-4 text-sm rounded-lg border border-border dark:border-borderDark p-1 px-3 dark:hover:bg-rose-700/50 dark:hover:border-rose-700 hover:bg-rose-400 hover:text-coolGrey-0 hover:border-rose-400  transition-colors ease-in-out duration-300">
				<Text>Decline</Text>
			</button>
			<button
				className="flex items-center gap-2 text-coolGrey-4 dark:text-coolGrey-4 text-sm rounded-lg border border-border dark:border-borderDark p-1 px-3 hover:bg-coolGrey-2/40 dark:hover:bg-hoverDark transition-colors ease-in-out duration-300"
				onClick={onClick}
			>
				<Text>Accept</Text>
			</button>
		</div>
	);
};
