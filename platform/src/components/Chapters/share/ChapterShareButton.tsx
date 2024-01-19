import { Tooltip } from "@mantine/core";
import { tooltipStyles } from "../../../styles/tooltipStyles";
import { FC } from "react";
import { IconShare2 } from "@tabler/icons-react";

export const ChapterShareButton: FC<{
  setOpen: () => void;
}> = ({ setOpen }) => {
  return (
    <Tooltip label="Share" position="left" withArrow styles={tooltipStyles}>
      <button
        className="flex items-center justify-center rounded-lg border border-border p-1.5 transition-all duration-300 ease-in-out hover:bg-base hover:shadow dark:border-borderDark dark:hover:bg-hoverDark"
        onClick={setOpen}
      >
        <IconShare2 size={18} className="text-coolGrey-7  dark:text-coolGrey-4" />
      </button>
    </Tooltip>
  );
};
