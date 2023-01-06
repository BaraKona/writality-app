import { Button, Select } from "@mantine/core";
import { FC } from "react";
import { IconAffiliate } from "@tabler/icons";

export const CollaborationToolbar: FC<{
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setOpened }) => {
  return (
    <div className="flex flex-col gap-2  border-b border-baseBorder px-8 py-2">
      <div className="ml-auto">
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
