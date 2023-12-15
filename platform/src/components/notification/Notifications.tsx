import { FC } from "react";
import { IUser } from "../../interfaces/IUser";
import { Divider, Popover } from "@mantine/core";
import { IconInbox } from "@tabler/icons-react";
import { SmallText } from "../texts/SmallText";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useOpenNotification } from "../../hooks/notification/useOpenNotification";
import { useAcceptProjectInvitation } from "../../hooks/notification/useAcceptProjectInvitation";
import { NotificationActions } from "./NotificationActions";
import { useAcceptFriendRequest } from "../../hooks/notification/useAcceptFriendRequest";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import { useNavigate } from "react-router-dom";
import { NotificationIcons } from "./NotificationIcons";

export const Notifications: FC<{
  notification: IUser["inbox"];
  recent?: boolean;
}> = ({ notification, recent }) => {
  const { mutate: openNotification } = useOpenNotification();
  const { mutate: acceptProjectInvitation } = useAcceptProjectInvitation();
  const { mutate: acceptFriendRequest } = useAcceptFriendRequest();

  const [parent] = useAutoAnimate();
  const navigate = useNavigate();

  return (
    <section ref={parent}>
      <div className={`flex grow flex-col gap-1`}>
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
                    <NotificationIcons notification={notification} />
                    <span className=" w-[12.5rem] overflow-hidden text-ellipsis whitespace-nowrap">
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
                  <NotificationIcons notification={notification} />
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
                      className="ml-auto bg-coolGrey-1 p-2 px-4 text-xs hover:!bg-coolGrey-2 dark:bg-baseDarker"
                      onClick={() => navigate(`/posts/${notification.ctaId}`)}
                    >
                      View Post
                    </ButtonWrapper>
                  )}
              </div>
            </Popover.Dropdown>
          </Popover>
        ))}

        {(!notification || notification.length === 0) && (
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
