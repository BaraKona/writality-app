import {
  Button,
  Input,
  Modal,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import React, { FC } from "react";
import { IconDatabase } from "@tabler/icons";
export const CreateBranchModal: FC<{
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  createBranch: () => void;
  branchName: string;
  setBranchName: React.Dispatch<React.SetStateAction<string>>;
}> = ({ opened, setOpened, createBranch, branchName, setBranchName }) => {
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
        title="You are about to create a new branch 🤝"
      >
        <p className="border-t-stone-800">
          Branching means you diverge from the main line of chapter and continue
          to do work without messing with that main line. This would be
          particularly useful if you're working with other people and are
          writing chapters that need review before being added to the main
          story. <br /> <br />
          Alternatively, if you are feeling particularly experimental, you may
          want to create a branch and try out a chapter idea without changing
          what is already there. If you decide you like this new version better,
          you can replace it!
        </p>
        <div className="mt-5">
          <TextInput
            className="mb-3"
            error={branchName ? undefined : "Branch name is required"}
            placeholder="Branch name"
            value={branchName}
            onChange={(event) => setBranchName(event.currentTarget.value)}
          />
          <Button
            variant="light"
            color="orange"
            leftIcon={<IconDatabase size={14} />}
            onClick={createBranch}
          >
            Create new branch
          </Button>
          <Button color="gray" onClick={() => setOpened(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
