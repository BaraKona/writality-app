import { FC } from "react";
import { IUser } from "../../interfaces/IUser";
import { useAuthContext } from "../../contexts/AuthContext";
import { Divider, Popover } from "@mantine/core";
import {
	Icon3dCubeSphere,
	IconCubeOff,
	IconCubePlus,
	IconInbox,
	IconUserHeart,
	IconUserPlus,
} from "@tabler/icons-react";
import { SmallText } from "../texts/SmallText";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useOpenNotification } from "../../hooks/notification/useOpenNotification";
import { useAcceptProjectInvitation } from "../../hooks/notification/useAcceptProjectInvitation";
import { NotificationActions } from "./NotificationActions";
import { useAcceptFriendRequest } from "../../hooks/notification/useAcceptFriendRequest";
export const Notifications: FC<{
	notification: IUser["inbox"];
}> = ({ notification }) => {
	const { currentUser } = useAuthContext();

	const { mutate: openNotification } = useOpenNotification();
	const { mutate: acceptProjectInvitation } = useAcceptProjectInvitation();
	const { mutate: acceptFriendRequest } = useAcceptFriendRequest();

	const [parent] = useAutoAnimate();

	const icons: any = {
		"project-invitation": (
			<IconCubePlus size={18} className="text-green-600 dark:text-green-400" />
		),
		"project-invitation-revoke": (
			<IconCubeOff size={18} className="text-rose-600 dark:text-rose-400" />
		),
		"project-invitation-accept": (
			<Icon3dCubeSphere
				size={18}
				className="text-blue-600 dark:text-blue-400"
			/>
		),
		"friend-request": (
			<IconUserPlus size={18} className="text-lime-600 dark:text-lime-400" />
		),
		"friend-accept": (
			<IconUserHeart
				size={18}
				className="text-emerald-600 dark:text-emerald-400"
			/>
		),
	};

	return (
		<section ref={parent}>
			<Divider className="!border-coolGrey-1 dark:!border-borderDark !mb-2" />
			<div className="h-[calc(100dvh-6.5rem)] overflow-y-auto flex flex-col gap-1">
				{notification?.map((notification: any, index: number) => (
					<Popover
						key={index}
						width={300}
						withArrow
						zIndex={1000}
						shadow="md"
						onOpen={() => {
							!notification.notificationRead
								? openNotification(notification._id)
								: null;
						}}
					>
						<Popover.Target>
							<li
								className={`p-2 py-1.5 gap-1 transition-all ease-in-out duration-500 cursor-pointer flex text-xs font-medium group hover:bg-coolGrey-1 dark:hover:bg-hoverDark rounded-md`}
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
						<Popover.Dropdown className="!bg-base dark:!bg-baseDark !border-border dark:!border-borderDark !text-coolGrey-6 dark:!text-coolGrey-4 !right-0">
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
								{notification?.notificationType === "project-invitation" &&
									notification.active && (
										<NotificationActions
											onClick={() => {
												acceptProjectInvitation({
													projectId: notification.ctaId,
													notificationId: notification._id,
												});
											}}
										/>
									)}
								{notification?.notificationType === "friend-request" &&
									notification.active && (
										<NotificationActions
											onClick={() => {
												acceptFriendRequest({
													userId: notification.ctaId,
													notificationId: notification._id,
												});
											}}
										/>
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
			</div>
		</section>
	);
};
