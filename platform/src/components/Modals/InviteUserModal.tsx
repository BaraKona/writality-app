import { Button, Modal, Select, useMantineTheme } from "@mantine/core";
import { IconBrandTelegram, IconSend } from "@tabler/icons";
import React, { FC, useState } from "react";
import { UseMutationResult } from "react-query";
// import { purpleButton } from "../../styles";
export const InviteUserModal: FC<{
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  users: any;
  addProjectCollaborator: UseMutationResult<any, unknown, string, unknown>;
}> = ({ opened, setOpened, users, addProjectCollaborator }) => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Modal
      size="lg"
      opened={opened}
      styles={{
        modal: { backgroundColor: "#1b1c25", border: "solid 1px #363130" },
      }}
      overlayOpacity={0.55}
      overlayBlur={3}
      onClose={() => setOpened(false)}
      title="Invite users to collaborate with you 🤗"
    >
      <p className="border-t-stone-800">
        Adding collaborators to your story allows you to work with other people
        on the same story. You can add collaborators by entering their username
        below. <br /> <br />
        Collaborators will be able to edit the story, but they will not be able
        to delete it or add collaborators. If you want to remove a collaborator,
        you can do so in the collaborators tab.
      </p>
      <div className="mt-5">
        <Select
          label="Select user"
          searchable
          placeholder="Select user"
          nothingFound="No options"
          clearable
          value={value}
          onChange={setValue}
          // change mantine select background color to transparent
          data={users?.map((user: any) => ({
            // label: user.displayName,
            label: user.name,
            value: user.uid,
          }))}
          // on submit add collaborator
        />
        <Button color="gray" className="mt-4" onClick={() => setOpened(false)}>
          Cancel
        </Button>
        <Button
          variant="outline"
          color="gray"
          className="mt-4"
          // styles={purpleButton}
          onClick={() => addProjectCollaborator.mutate(value as string)}
          rightIcon={<IconBrandTelegram size={14} />}
          type="submit"
        >
          Send
        </Button>
      </div>
    </Modal>
  );
};
