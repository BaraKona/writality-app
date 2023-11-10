import { FC } from "react";
import { IUser } from "../../interfaces/IUser";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mantine/core";
import { IconCubePlus, IconInbox } from "@tabler/icons-react";
import { SmallText } from "../texts/SmallText";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { notificationType } from "../../interfaces/IUser";

export const Notifications: FC<{
	notification: IUser["inbox"];
}> = ({ notification }) => {
	const { currentUser } = useAuthContext();
	const navigate = useNavigate();

	const [parent] = useAutoAnimate();
	// icons type = notificationType: reactNode

	const icons: any = {
		"project-invitation": <IconCubePlus size={16} />,
	};

	return (
		<section ref={parent}>
			<Divider className="!border-coolGrey-1 dark:!border-borderDark !mb-2" />
			{notification?.map((notification: any, index: number) => (
				<li
					onClick={() => navigate(`/notifications/${notification.uid}`)}
					className={`px-1.5 py-1 transition-all ease-in-out duration-500 flex text-xs font-medium mb-0.5 group border border-border dark:bg-baseDark dark:hover:bg-hoverDark dark:border-baseDark rounded-normal hover:bg-coolGrey-1 cursor-pointer `}
				>
					<div className="gap-1 flex items-center justify-between w-full">
						<div className="flex gap-2">
							{icons[notification.notificationType]}
							<span className=" whitespace-nowrap w-[12rem] text-ellipsis overflow-hidden">
								{notification.notificationTitle}
							</span>
						</div>
					</div>
				</li>
			))}

			{currentUser && currentUser?.inbox?.length === 0 && (
				<div className="text-blueTextLight text-center text-xs font-normal flex gap-4">
					<IconInbox size={16} className="mx-auto mt-2" />
					<SmallText className="text-center" light>
						Your inbox is empty. You will receive notifications and messages
						here.
					</SmallText>
				</div>
			)}
		</section>
	);
};
