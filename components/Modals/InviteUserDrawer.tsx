import { Drawer } from "@mantine/core";
import React, { FC, ReactNode } from "react";
import { IconDatabase } from "@tabler/icons";

export const InviteUserDrawer: FC<{
  opened: boolean;
  children: ReactNode;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ opened, setOpened, children }) => {
  return (
    <Drawer
      position="right"
      opened={opened}
      onClose={() => setOpened(false)}
      title="Collaborators"
      padding="md"
      size="md"
      overlayOpacity={0.55}
      overlayBlur={3}
      styles={{
        drawer: { backgroundColor: "#1b1c25" },
      }}
    >
      {children}
    </Drawer>
  );
};
