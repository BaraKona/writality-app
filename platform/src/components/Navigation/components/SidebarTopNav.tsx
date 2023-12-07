import { useLocalStorage } from "@mantine/hooks";
import { Divider } from "@mantine/core";
import {
  IconCube,
  Icon3dCubeSphere,
  IconSocial,
  IconCubePlus,
  IconUserHeart,
  IconInbox,
  IconBookmarks,
} from "@tabler/icons-react";
import { SidebarTopNavItem } from "./SidebarTopNavItem";
import { IUser } from "../../../interfaces/IUser";
import { useAuthContext } from "../../../contexts/AuthContext";

export const SidebarTopNav = ({
  sidebarNav,
  setSidebarNav,
  createProject,
}: {
  sidebarNav: string;
  setSidebarNav: (nav: string) => void;
  createProject: () => void;
}) => {
  const bookmarks = "bookmarks";
  const home = "projects";
  const collabs = "collaborations";
  const inbox = "inbox";
  const friends = "friends";
  const writingGroup = "writing group";

  const [userChat, setUserChat] = useLocalStorage({
    key: "userChat",
  });

  const { currentUser } = useAuthContext();

  return (
    <section className="mb-2 flex flex-row justify-center gap-1">
      <SidebarTopNavItem
        sidebarNav={sidebarNav}
        value={home}
        navigate={() => setSidebarNav(home)}
      >
        <IconCube size={18} />
      </SidebarTopNavItem>
      <SidebarTopNavItem
        sidebarNav={sidebarNav}
        value={collabs}
        navigate={() => setSidebarNav(collabs)}
      >
        <Icon3dCubeSphere size={18} />
      </SidebarTopNavItem>
      <SidebarTopNavItem
        sidebarNav={sidebarNav}
        value={writingGroup}
        navigate={() => setSidebarNav(writingGroup)}
      >
        <IconSocial size={18} />
      </SidebarTopNavItem>
      <Divider
        className="mx-2 !border-coolGrey-2 dark:!border-borderDark"
        orientation="vertical"
      />
      <SidebarTopNavItem
        sidebarNav={sidebarNav}
        value="create project"
        navigate={createProject}
      >
        <IconCubePlus size={18} />
      </SidebarTopNavItem>
      <Divider
        className="mx-2 !border-coolGrey-2 dark:!border-borderDark"
        orientation="vertical"
      />
      <SidebarTopNavItem
        sidebarNav={sidebarNav}
        value={friends}
        navigate={() => setSidebarNav(friends)}
      >
        <div className="relative">
          <IconUserHeart size={18} />
          {currentUser.friends.some(
            (friend: IUser["friends"][0]) =>
              friend?.chat?.users?.find((user) => user.user === currentUser._id)
                ?.isRead === false && userChat !== friend?.chat._id,
          ) && (
            <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-fuchsia-500" />
          )}
        </div>
      </SidebarTopNavItem>
      <SidebarTopNavItem
        sidebarNav={sidebarNav}
        value={inbox}
        navigate={() => setSidebarNav(inbox)}
      >
        <div className="relative">
          <IconInbox size={18} />
          {currentUser.inbox?.filter(
            (inbox: any) => inbox?.notificationRead === false,
          ).length > 0 && (
            <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-fuchsia-500" />
          )}
        </div>
      </SidebarTopNavItem>
      <SidebarTopNavItem
        sidebarNav={sidebarNav}
        value={bookmarks}
        navigate={() => setSidebarNav(bookmarks)}
      >
        <IconBookmarks size={18} />
      </SidebarTopNavItem>
    </section>
  );
};
