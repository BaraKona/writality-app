import {
  Button,
  Input,
  Modal,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useDatabaseContext } from "../../contexts/DatabaseContext";
import React, { FC } from "react";
import { IconDatabase } from "@tabler/icons";
import { VscGitMerge } from "react-icons/vsc";

export const MergeBranchModal: FC<{
  mergeOpened: boolean;
  setMergeOpened: React.Dispatch<React.SetStateAction<boolean>>;
  mergeBranch: () => Promise<void>;
}> = ({ mergeOpened, setMergeOpened, mergeBranch }) => {
  const theme = useMantineTheme();
  const { currentChapterContent } = useDatabaseContext();
  return (
    <>
      <Modal
        size="lg"
        opened={mergeOpened}
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
        onClose={() => setMergeOpened(false)}
        title={`Merging ${currentChapterContent.name} into main 🤝`}
      >
        <p className="border-t-stone-800">
          Merging {currentChapterContent.name} into main will replace the main
          content of your chapter with that of the branch. However, do not
          worry. A copy of your current main will be saved in case you ever want
          to go back!
        </p>
        <div className="mt-5">
          {/* <TextInput
            className="mb-3"
            error={branchName ? undefined : "Branch name is required"}
            placeholder="Branch name"
            value={branchName}
            onChange={(event) => setBranchName(event.currentTarget.value)}
          /> */}
          <Button
            variant="light"
            color="orange"
            leftIcon={<VscGitMerge size={14} />}
            onClick={mergeBranch}
          >
            Create new branch
          </Button>
          <Button color="gray" onClick={() => setMergeOpened(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
