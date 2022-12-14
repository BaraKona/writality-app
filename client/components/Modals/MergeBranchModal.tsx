import {
  Button,
  Input,
  Modal,
  TextInput,
  useMantineTheme,
  Select,
} from "@mantine/core";
import { useDatabaseContext } from "../../contexts/DatabaseContext";
import React, { FC, useState } from "react";
import { VscGitMerge } from "react-icons/vsc";
import { IconChevronDown, IconChevronRight } from "@tabler/icons";

export const MergeBranchModal: FC<{
  mergeOpened: boolean;
  setMergeOpened: React.Dispatch<React.SetStateAction<boolean>>;
  mergeBranch: (position: string | null) => Promise<void>;
  replaceMain: () => Promise<void>;
}> = ({ mergeOpened, setMergeOpened, mergeBranch, replaceMain }) => {
  const theme = useMantineTheme();
  const { currentChapterContent } = useDatabaseContext();
  const [value, setValue] = useState<string | null>(null);

  const selectionData = [
    { label: "Merge at top", value: "top" },
    { label: "Merge at bottom", value: "bottom" },
  ];
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
          Merging{" "}
          <span className="text-orange-300 underline">
            {currentChapterContent.name}
          </span>{" "}
          into <span className="text-orange-300 underline">main</span> will
          replace the main content of your chapter with that of the branch.
          However, do not worry. A copy of your current main will be saved in
          case you ever want to go back!
        </p>
        <div className="mt-5 flex ">
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
            onClick={replaceMain}
            className="bg-stone-700 mr-3"
          >
            Replace Main
          </Button>
          {/* <Button
            variant="light"
            color="orange"
            onClick={mergeBranch}
            className="bg-stone-800"
            leftIcon={<VscGitMerge size={14} />}
          >
            Merge into Main
          </Button> */}
          <Select
            placeholder="Merge into Main"
            data={selectionData}
            clearable
            className="bg-baseMid mr-1"
            value={value}
            onChange={setValue}
            color="orange"
            error={value ? undefined || null : "Please select a position"}
          />
          <Button
            className=" bg-stone-700 text-orange-100"
            onClick={() => mergeBranch(value)}
            color="orange"
            variant="light"
          >
            <VscGitMerge size={14} />
          </Button>
          <Button
            className="ml-auto bg-red-900"
            color="red"
            onClick={() => setMergeOpened(false)}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
