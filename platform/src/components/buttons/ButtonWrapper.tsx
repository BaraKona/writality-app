import { FC } from "react";

export const ButtonWrapper: FC<{
  children: React.ReactNode;
  onClick?: (item?: any) => void;
  className?: string;
}> = ({ children, onClick, className }) => {
  return (
    <button
      className={`${className} cursor-pointer rounded-lg bg-base p-0.5  transition-all duration-200 ease-in-out hover:bg-gray-100 dark:bg-baseDark dark:hover:bg-hoverDark`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
