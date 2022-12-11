import { Button, Select } from "@mantine/core";
import { FC } from "react";
import { IconAffiliate } from "@tabler/icons";

export const CollaborationToolbar: FC<{
  users: any;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ users, setOpened }) => {
  console.log(users);
  return (
    <div className="flex flex-col gap-2  border-b border-baseBorder px-8 py-2">
      <div className="ml-auto">
        {/* <Select
          size="xs"
          searchable
          clearable
          limit={8}
          styles={{ root: { backgroundColor: "black" } }}
          // label="Your favorite framework/library"
          placeholder="Pick one"
          data={users.map((user: any) => ({
            label: user.displayName,
            value: user.uid,
          }))}
        /> */}
        <Button
          variant="default"
          onClick={() => setOpened(true)}
          leftIcon={<IconAffiliate size={14} />}
        >
          Collaborators
        </Button>
      </div>
    </div>
  );
};
