import { IconCubePlus } from "@tabler/icons-react";
import { IProject } from "../../interfaces/IProject";
import { Skeleton } from "@mantine/core";
import { ProjectListItem } from "./ProjectListItem";
import { FC } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const UserProjects: FC<{
  isLoading: boolean;
  projects: IProject[];
  openProject: (project: string) => void;
  removeFavouriteProject: (project: string) => void;
  createProject: () => void;
  tab: string;
}> = ({
  isLoading,
  projects,
  openProject,
  removeFavouriteProject,
  createProject,
  tab,
}) => {
  const [parent] = useAutoAnimate();

  if (isLoading) {
    return (
      <>
        <Skeleton height={10} width="100%" radius="sm" mb={10} mt={20} />
        <Skeleton height={20} width="100%" radius="sm" mb={3} />
        <Skeleton height={20} width="100%" radius="sm" mb={3} />
        <Skeleton height={20} width="100%" radius="sm" mb={3} />
        <Skeleton height={20} width="100%" radius="sm" mb={3} />
      </>
    );
  }

  return (
    <div className="flex w-full grow">
      {projects?.length > 0 && (
        <section className="w-full" ref={parent}>
          <div className="flex w-full grow flex-col gap-1">
            {projects?.map((project: IProject, index: number) => {
              return (
                <ProjectListItem
                  key={project.uid}
                  onClick={() => openProject(`project/${project.uid}/overview`)}
                  name={project.title || "Untitled Project"}
                  projectId={project.uid}
                  projectFolders={project.folders}
                  type={project.type}
                />
              );
            })}
          </div>
        </section>
      )}

      {!projects ||
        (projects?.length === 0 && (
          <div className="text-center text-xs font-normal text-blueTextLight ">
            {tab === "collaborations"
              ? "You have no collaborative projects yet. To create a collaboration, go to a project's settings and change the type"
              : "You have no projects. Create your first project."}
            {tab !== "collaborations" && (
              <IconCubePlus
                size={16}
                className="mx-auto mt-2 cursor-pointer "
                onClick={createProject}
              />
            )}
          </div>
        ))}
    </div>
  );
};
