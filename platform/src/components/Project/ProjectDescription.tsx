import { FC } from "react";
import { IProject } from "../../interfaces/IProject";
export const ProjectDescription: FC<{ project: IProject }> = ({ project }) => {
  return (
    <div className="flex flex-col flex-grow  px-3  mx-auto w-72 border-r bg-baseMid border-baseBorder hover:bg-base">
      <div className="border-b border-baseBorder">
        <h3 className="text-center font-semibold shadow-lg">
          Project Description{" "}
        </h3>
      </div>
      <p className="text-purple-300">{project?.description}</p>
    </div>
  );
};
