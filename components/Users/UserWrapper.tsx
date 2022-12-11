import { FC, ReactNode } from "react";
import { FcConferenceCall } from "react-icons/fc";

export const UserWrapper: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div className=" flex flex-col bg-baseMid w-full gap-2 m-3 mx-3 shadow-lg border border-baseBorder rounded-md">
      <div className=" flex font-semibold py-2 px-4 bg-baseLight border-b border-baseBorder">
        <FcConferenceCall size={23} color="white" />
        <h3 className=" ml-2 flex">
          Users <span className=" ml-3 font-normal"></span>
        </h3>
        <div className="ml-auto"></div>
      </div>
      <div className="">{children}</div>
    </div>
  );
};
