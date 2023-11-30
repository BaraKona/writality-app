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
  IconClipboard,
} from "@tabler/icons-react";
import { SmallText } from "../texts/SmallText";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useOpenNotification } from "../../hooks/notification/useOpenNotification";
import { useAcceptProjectInvitation } from "../../hooks/notification/useAcceptProjectInvitation";
import { NotificationActions } from "./NotificationActions";
import { useAcceptFriendRequest } from "../../hooks/notification/useAcceptFriendRequest";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import { useNavigate } from "react-router-dom";
export const Notifications: FC<{
  notification: IUser["inbox"];
}> = ({ notification }) => {
  const { currentUser } = useAuthContext();

  const { mutate: openNotification } = useOpenNotification();
  const { mutate: acceptProjectInvitation } = useAcceptProjectInvitation();
  const { mutate: acceptFriendRequest } = useAcceptFriendRequest();

  const [parent] = useAutoAnimate();
  const navigate = useNavigate();

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
    "post-comment": (
      <IconClipboard
        size={18}
        className="text-purple-600 dark:text-purple-400"
      />
    ),
  };

  return (
    <section ref={parent}>
      <Divider className="!mb-2 !border-coolGrey-1 dark:!border-borderDark" />
      <div className="flex h-[calc(100dvh-6.5rem)] flex-col gap-1 overflow-y-auto">
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
                className={`group flex cursor-pointer gap-1 rounded-md p-2 py-1.5 text-xs font-medium transition-all duration-500 ease-in-out hover:bg-coolGrey-1 dark:hover:bg-hoverDark`}
              >
                <div className="flex w-full items-center justify-between gap-1">
                  <div className="flex gap-2">
                    {icons[notification.notificationType]}
                    <span className=" w-[12rem] overflow-hidden text-ellipsis whitespace-nowrap">
                      {notification.notificationTitle}
                    </span>
                  </div>
                </div>
                {notification?.notificationRead === false && (
                  <span className=" h-2 w-2 rounded-full bg-fuchsia-500" />
                )}
              </li>
            </Popover.Target>
            <Popover.Dropdown className="!right-0 !border-border !bg-base !text-coolGrey-6 dark:!border-borderDark dark:!bg-baseDark dark:!text-coolGrey-4">
              <div className="flex flex-col gap-2 p-4 text-coolGrey-6 dark:text-coolGrey-4">
                <p className=" flex items-center gap-4">
                  {icons[notification.notificationType]}
                  {notification.notificationTitle}
                </p>
                <Divider className="!mb-2 !border-coolGrey-1 dark:!border-borderDark" />
                <p className="text-sm">{notification.notification}</p>
                <div className="flex items-center gap-2">
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
                {notification?.notificationType === "post-comment" &&
                  notification.active && (
                    <ButtonWrapper
                      className="ml-auto bg-coolGrey-1 p-2 px-4 text-xs hover:!bg-coolGrey-2 dark:bg-baseDarker   "
                      onClick={() => navigate(`/posts/${notification.ctaId}`)}
                    >
                      View Post
                    </ButtonWrapper>
                  )}
              </div>
            </Popover.Dropdown>
          </Popover>
        ))}

        {currentUser && currentUser?.inbox?.length === 0 && (
          <div className="flex flex-col  items-center justify-center gap-4 text-center text-xs font-normal text-blueTextLight">
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
