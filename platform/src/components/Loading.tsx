import { Loader } from "@mantine/core";
import { FC, ReactNode } from "react";
import { useThemeContext } from "../Providers/ThemeProvider";
export const Loading: FC<{
  children?: ReactNode;
  isLoading: boolean;
}> = ({ children, isLoading }) => {
  const { theme } = useThemeContext();

  return (
    <>
      {isLoading ? (
        <div className="flex h-[calc(100dvh-3.5rem)] items-center justify-center rounded-lg bg-base dark:bg-baseDark">
          <Loader
            variant="bars"
            color={theme === "dark" ? "#9CA3AF" : `"#394251"`}
            className="dark:text-coolGrey-4"
          />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
