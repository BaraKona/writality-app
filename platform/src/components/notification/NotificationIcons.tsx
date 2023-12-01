import {
  Icon3dCubeSphere,
  IconClipboard,
  IconCubeOff,
  IconCubePlus,
  IconUserHeart,
  IconUserPlus,
} from "@tabler/icons-react";

export const NotificationIcons = ({ notification }: { notification: any }) => {
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
  return icons[notification.notificationType];
};
