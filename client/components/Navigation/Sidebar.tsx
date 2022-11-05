import Link from "next/link";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { ProjectListItem, CategoryListItem } from "../ListItems";
import Image from "next/image";
import { cyclops8 } from "../../assets/icons";
import DashboardNavigation from "./DashboardNavigation";
import { useDatabaseContext } from "../../contexts/DatabaseContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { IProject } from "../../interfaces/Iproject";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export const Sidebar: FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser } = useAuthContext();
  const router = useRouter();
  const {
    addANewProjectToDatabase,
    userProjects,
    getAllUserProjects,
    setUserProjects,
    currentProject,
  } = useDatabaseContext();
  const openProject = (id: string) => {
    router.push(`/dashboard/project/${id}`);
  };
  const addProject = async () => {
    if (userProjects?.length <= 2) {
      const isCreated = addANewProjectToDatabase(currentUser.uid);
      if (isCreated) {
        setUserProjects(await getAllUserProjects(currentUser.uid));
        toast.success("Project created successfully", {
          style: {
            borderRadius: "10px",
            background: "#333350",
            color: "#fff",
          },
        });
      } else {
        toast.error("Project creation failed", {
          style: {
            borderRadius: "10px",
            background: "#333350",
            color: "#fff",
          },
        });
      }
    } else {
      toast.error(
        "You can only have 3 projects, don't stretch yourself too thin ! 😄",
        {
          style: {
            borderRadius: "10px",
            background: "#333350",
            color: "#fff",
          },
        }
      );
    }
  };
  useEffect(() => {
    if (currentUser) {
      getAllUserProjects(currentUser.uid)
        .then((fetchedProjects: IProject) => {
          setUserProjects(fetchedProjects);
        })
        .catch((error: Event) => {
          console.log(error);
        });
    }
  }, [currentUser, currentProject]);
  return (
    <div className="h-full flex ">
      <aside
        className="w-60 h-full overflow-y-auto border-r bg-baseMid border-baseBorder"
        aria-label="Sidebar"
      >
        <div className=" py-2 px-3">
          <DashboardNavigation />
          <CategoryListItem name="Community">
            <ProjectListItem name="Posts" />
            <ProjectListItem name="Projects" />
            <ProjectListItem name="Users" />
          </CategoryListItem>
          <hr className="my-5 border-baseBorder" />
          <CategoryListItem
            name="Your Projects"
            button={true}
            onClick={addProject}
          >
            <>
              {userProjects
                ? userProjects.flatMap(
                    (
                      project: IProject,
                      index: React.Key | null | undefined
                    ) => {
                      return (
                        <ProjectListItem
                          key={index}
                          onClick={() => openProject(project.uid)}
                          name={project.projectTitle}
                          projectId={project.uid}
                        />
                      );
                    }
                  )
                : ""}
            </>
          </CategoryListItem>
          <hr className="my-5 border-baseBorder" />
          <CategoryListItem name="Collaborative Projects" button={true} />
          <hr className="my-5 border-baseBorder" />
          <CategoryListItem name="Chats" button={true} />
          <div
            id="dropdown-cta"
            className="p-4 mt-6 bg-blue-50  rounded-lg "
            role="alert"
          >
            <div className="flex items-center mb-3">
              <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
                Beta
              </span>
              <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 inline-flex h-6 w-6 "
                data-collapse-toggle="dropdown-cta"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="#a8a29e"
                  ></path>
                </svg>
              </button>
            </div>
            <p className="mb-3 text-sm text-blue-900 ">
              Preview the new Flowbite dashboard navigation! You can turn the
              new navigation off for a limited time in your profile.
            </p>
            <a
              className="text-sm text-blue-900 underline hover:text-blue-800"
              href="#"
            >
              Turn new navigation off
            </a>
          </div>
        </div>
      </aside>
      {children}
    </div>
  );
};
