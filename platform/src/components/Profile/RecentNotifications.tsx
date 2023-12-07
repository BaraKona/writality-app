import { useAuthContext } from "../../contexts/AuthContext";
import { IconMail, IconMailOpened } from "@tabler/icons-react";
import { Notifications } from "../notification/Notifications";

export const RecentNotifications = () => {
  const { currentUser } = useAuthContext();

  const notifications = currentUser?.inbox.filter(
    (notification: any) => notification.notificationRead === false,
  );

  if (!notifications || notifications.length === 0) {
    return (
      <section className="flex h-64 w-full grow items-center justify-center gap-2 rounded-lg  p-4 dark:border-none dark:bg-baseDarker">
        <div className="flex grow flex-col items-center justify-center gap-4 text-center text-sm font-normal text-blueTextLight">
          <IconMailOpened size={30} className="text-blueTextLight" />
          <p className="text-center">
            You have no unread notifications. <br />
            You can find your unread notifications here
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex h-64 w-full max-w-[24rem] grow flex-col gap-2 rounded-lg  p-2 dark:border-none dark:bg-baseDarker">
      {}
      <h2 className="flex   items-center gap-2 text-sm font-semibold">
        <IconMail size={18} /> Unread Notifications
      </h2>
      <div className="flex flex-col gap-2 overflow-auto">
        <Notifications notification={notifications} recent />
      </div>
    </section>
  );
};
