import { Divider } from "@mantine/core";
import { CategoryListItem } from "../../ListItems";
import { CommunityListItem } from "../../ListItems";
import {
  IconUserCircle,
  IconSettings,
  IconHelp,
  IconLogout,
  IconLayoutSidebarLeftCollapseFilled,
  IconLayoutSidebarLeftExpandFilled,
} from "@tabler/icons-react";

import { useNavigate } from "react-router-dom";
import { useSignout } from "../../../hooks/user/useSignout";

export const SidebarNav = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}) => {
  const navigate = useNavigate();
  const { mutate: signOut } = useSignout();

  return (
    <div className="flex max-w-[3.2rem] grow flex-col">
      <CategoryListItem className="flex flex-col">
        <CommunityListItem name="Profile" onClick={() => navigate("/profile")}>
          <IconUserCircle size={18} />
        </CommunityListItem>
      </CategoryListItem>
      {/* <CategoryListItem>
        <Divider className="!border-gray-4 !my-2 dark:!border-borderDark" />
      </CategoryListItem> */}
      {/* <CategoryListItem>
        <CommunityListItem name="Posts" onClick={() => navigate("/posts")}>
          <IconClipboard size={18} />
        </CommunityListItem>
        <CommunityListItem
          name="Writing-groups"
          onClick={() => navigate("/writing-groups")}
        >
          <IconSocial size={18} />
        </CommunityListItem>
        <CommunityListItem name="Stories" onClick={() => navigate("/stories")}>
          <IconBooks size={18} />
        </CommunityListItem>
      </CategoryListItem>
      <CategoryListItem>
        <Divider className="!border-gray-4 !my-2 dark:!border-borderDark" />
      </CategoryListItem> */}
      {/* <CategoryListItem>
        <CommunityListItem name="Users" onClick={() => navigate("/users")}>
          <IconUsersGroup size={18} />
        </CommunityListItem>
      </CategoryListItem>
      <CategoryListItem>
        <Divider className="!border-gray-4 !my-2 dark:!border-borderDark" />
      </CategoryListItem> */}

      <CategoryListItem className="mt-auto">
        <Divider className="!border-gray-4 !my-2 dark:!border-borderDark" />
      </CategoryListItem>
      <CategoryListItem>
        <CommunityListItem
          name={sidebarOpen ? "Collapse" : "Expand"}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <IconLayoutSidebarLeftCollapseFilled size={18} />
          ) : (
            <IconLayoutSidebarLeftExpandFilled size={18} />
          )}
        </CommunityListItem>
      </CategoryListItem>

      <CategoryListItem>
        <Divider className="!border-gray-4 !my-2 dark:!border-borderDark" />
      </CategoryListItem>

      <CategoryListItem>
        <CommunityListItem name="Settings" onClick={() => navigate("/settings")}>
          <IconSettings size={18} />
        </CommunityListItem>
        <CommunityListItem name="Help" onClick={() => navigate("/help")}>
          <IconHelp size={18} />
        </CommunityListItem>
        <CommunityListItem name="Logout" onClick={signOut}>
          <IconLogout size={18} />
        </CommunityListItem>
      </CategoryListItem>
    </div>
  );
};
