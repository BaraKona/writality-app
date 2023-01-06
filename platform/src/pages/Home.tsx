import { FC } from "react";
import { MainNavigation } from "../components/Navigation";

export const Home: FC = () => {
  return (
    <div className="h-screen">
      <MainNavigation />
      <div className="w-7/12 grid place-items-center m-auto h-4/6 ">
        <h1 className="text-3xl font-bold text-center underline">
          Welcome to Writality
        </h1>
      </div>
    </div>
  );
};
