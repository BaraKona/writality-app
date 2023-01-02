import {
  Button,
  Input,
  Modal,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import React, { FC } from "react";
import { IconTrash } from "@tabler/icons";
export const DeleteBranchModal: FC<{
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  deleteBranch: () => void;
}> = ({ opened, setOpened, deleteBranch }) => {
  const theme = useMantineTheme();
  return (
    <>
      <Modal
        size="lg"
        opened={opened}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        styles={{
          modal: { backgroundColor: "#1b1c25", border: "solid 1px #363130" },
        }}
        overlayOpacity={0.55}
        overlayBlur={3}
        onClose={() => setOpened(false)}
        title="Are you sure you want to delete this branch ? 🤔"
      >
        <p className="border-t-stone-800">
          This action is irreversible. If you want to recover this branch, you
          will have to create a new one. Are you sure you want to delete this
          branch?
        </p>
        <div className="mt-5">
          <Button
            variant="light"
            color="red"
            leftIcon={<IconTrash size={14} />}
            onClick={deleteBranch}
          >
            Delete
          </Button>
          <Button color="gray" onClick={() => setOpened(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
