import { Loader } from "@mantine/core";
import { FC, ReactNode } from "react";
export const Loading: FC<{ children: ReactNode; isLoading: boolean }> = ({
  children,
  isLoading,
}) => {
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center py-[300px]">
          <Loader variant="bars" color="gray" />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
