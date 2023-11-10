import { FC } from "react";
import { IUser } from "../../interfaces/IUser";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Text, Divider, Popover } from "@mantine/core";
import { IconCubeOff, IconCubePlus, IconInbox } from "@tabler/icons-react";
import { SmallText } from "../texts/SmallText";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { notificationType } from "../../interfaces/IUser";
import { useOpenNotification } from "../../hooks/notification/useOpenNotification";

export const Notifications: FC<{
	notification: IUser["inbox"];
}> = ({ notification }) => {
	const { currentUser } = useAuthContext();

	const navigate = useNavigate();
	const { mutate: openNotification } = useOpenNotification();

	const [parent] = useAutoAnimate();
	// icons type = notificationType: reactNode

	const icons: any = {
		"project-invitation": (
			<IconCubePlus size={16} className="text-green-600 dark:text-green-400" />
		),
		"project-invitation-revoke": (
			<IconCubeOff size={16} className="text-rose-600 dark:text-rose-400" />
		),
	};

	return (
		<section ref={parent}>
			<Divider className="!border-coolGrey-1 dark:!border-borderDark !mb-2" />
			{notification?.map((notification: any, index: number) => (
				<Popover
					width={300}
					trapFocus
					position="bottom"
					withArrow
					shadow="md"
					onOpen={() => openNotification(notification._id)}
				>
					<Popover.Target>
						<li
							className={` items-center justify-between relative px-1.5 py-1 transition-all ease-in-out duration-500 flex text-xs font-medium mb-0.5 group border border-border dark:bg-baseDark dark:hover:bg-hoverDark dark:border-baseDark rounded-normal hover:bg-coolGrey-1 cursor-pointer `}
						>
							<div className="gap-1 flex items-center justify-between w-full">
								<div className="flex gap-2">
									{icons[notification.notificationType]}
									<span className=" whitespace-nowrap w-[12rem] text-ellipsis overflow-hidden">
										{notification.notificationTitle}
									</span>
								</div>
							</div>
							{notification?.notificationRead === false && (
								<span className=" w-2 h-2 bg-fuchsia-500 rounded-full" />
							)}
						</li>
					</Popover.Target>
					<Popover.Dropdown className="!bg-base dark:!bg-baseDark !border-border dark:!border-borderDark !text-coolGrey-6 dark:!text-coolGrey-4">
						<div className="flex flex-col gap-2 p-4 text-coolGrey-6 dark:text-coolGrey-4">
							<p className=" flex gap-4 items-center">
								{icons[notification.notificationType]}
								{notification.notificationTitle}
							</p>
							<Divider className="!border-coolGrey-1 dark:!border-borderDark !mb-2" />
							<p className="text-sm">{notification.notification}</p>
							<div className="flex gap-2 items-center">
								<span className="text-xs font-normal">
									{notification.notificationBody}
								</span>
							</div>
							{notification?.notificationType === "project-invitation" && (
								<div className="flex gap-2">
									<button className="ml-auto  flex items-center gap-2 text-coolGrey-4 dark:text-coolGrey-4 text-sm rounded-normal border border-border dark:border-borderDark p-1 px-3 dark:hover:bg-rose-700/50 dark:hover:border-rose-700 hover:bg-rose-400 hover:text-coolGrey-0 hover:border-rose-400  transition-colors ease-in-out duration-300">
										<Text>Decline</Text>
									</button>
									<button
										className="flex items-center gap-2 text-coolGrey-4 dark:text-coolGrey-4 text-sm rounded-normal border border-border dark:border-borderDark p-1 px-3 hover:bg-coolGrey-2/40 dark:hover:bg-hoverDark transition-colors ease-in-out duration-300"
										onClick={() => console.log("delete")}
									>
										<Text>Accept</Text>
									</button>
								</div>
							)}
						</div>
					</Popover.Dropdown>
				</Popover>
			))}

			{currentUser && currentUser?.inbox?.length === 0 && (
				<div className="text-blueTextLight text-center text-xs font-normal flex flex-col gap-4 items-center justify-center">
					<SmallText className="text-center" light>
						Your inbox is empty. You will receive notifications and messages
						here.
					</SmallText>
					<IconInbox size={16} className="mx-auto mt-2" />
				</div>
			)}
		</section>
	);
};
