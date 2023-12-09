import { FC, ReactNode } from "react";
import { Loader } from "@mantine/core";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
export const CategoryListItem: FC<{
  children?: ReactNode;
  loading?: boolean;
  button?: boolean;
  className?: string;
}> = ({ children, button, loading, className }) => {
  return (
    <ul className={`p-2 py-0 ${className}`}>
      <li>
        <h2
          className={`ml-0.5 flex items-center justify-between rounded-lg text-xs font-normal`}
        >
          <p className="cursor-pointer font-bold text-coolGrey-7 hover:font-semibold hover:text-black dark:hover:text-coolGrey-1">
            {button ? <IconSquareRoundedPlus size={18} /> : ""}
          </p>
        </h2>
      </li>
      {loading ? (
        <Loader
          variant="bars"
          color="gray"
          className="mx-auto my-2"
          size={25}
        />
      ) : (
        <>{children}</>
      )}
    </ul>
  );
};
