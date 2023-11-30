import { FC } from "react";

export const CancelButton: FC<{
  onClick?: () => void;
}> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1 text-xs font-medium text-coolGrey-7 hover:bg-coolGrey-1 hover:text-black dark:hover:bg-hoverDark dark:hover:text-coolGrey-4"
    >
      Cancel
    </button>
  );
};
