import { Tooltip } from "@mantine/core";
import { tooltipStyles } from "../../../styles/tooltipStyles";
import { FC } from "react";
import { IconFileSettings } from "@tabler/icons-react";

export const ChapterSettingsButton: FC<{ setActive: () => void }> = ({ setActive }) => {
  return (
    <Tooltip label="Settings" position="left" withArrow styles={tooltipStyles}>
      <div
        className="group flex items-center justify-center rounded-lg border border-border p-1 dark:border-borderDark"
        onClick={setActive}
      >
        <IconFileSettings
          size={18}
          className="text-coolGrey-7 group-hover:text-black dark:hover:text-coolGrey-1"
        />
      </div>
    </Tooltip>
  );
};
