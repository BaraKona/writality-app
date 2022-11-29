import React, { FC, ReactNode, useEffect, useState } from "react";
import {
  ProjectListItem,
  CategoryListItem,
  CommunityListItem,
} from "../ListItems";
import DashboardNavigation from "./DashboardNavigation";
import { useDatabaseContext } from "../../contexts/DatabaseContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { IProject } from "../../interfaces/Iproject";
import { useRouter } from "next/router";
import { FcConferenceCall, FcReading, FcRules } from "react-icons/fc";
import { useToast } from "../../hooks/useToast";

export const Sidebar: FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser } = useAuthContext();
  const router = useRouter();
  const {
    userProjects,
    getAllUserProjects,
    userCollaborativeProjects,
    currentProject,
    getAllUserCollaborativeProjects,
    addANewProjectToDatabase,
    addANewCollaborativeProject,
  } = useDatabaseContext();
  const openProject = (id: string) => {
    router.push(`/dashboard/project/${id}`);
  };
  const openCollaboration = (id: string) => {
    router.push(`/dashboard/collaboration/${id}`);
  };
  const addProject = async () => {
    if (userProjects.length <= 2) {
      await addANewProjectToDatabase(currentUser.uid);
    } else {
      useToast(
        "error",
        "You can only have 3 projects, don't stretch yourself too thin ! 😄"
      );
    }
  };
  const addCollaborativeProject = async () => {
    await addANewCollaborativeProject(currentUser.uid);
  };
  useEffect(() => {
    if (currentUser) {
      getAllUserProjects(currentUser.uid);
      getAllUserCollaborativeProjects(currentUser.uid);
    }
  }, [currentUser, currentProject]);
  return (
    <div className="h-full flex ">
      <aside
        className="max-w-[225px] h-full overflow-y-auto border-r bg-baseMid border-baseBorder"
        aria-label="Sidebar"
      >
        <div className=" py-2 px-3">
          <DashboardNavigation />
          <CategoryListItem name="Community">
            <CommunityListItem name="Posts">
              <FcRules size={23} />
            </CommunityListItem>
            <CommunityListItem name="Stories">
              <FcReading size={23} />
            </CommunityListItem>
            <CommunityListItem
              name="Users"
              onClick={() => router.push("/dashboard/users")}
            >
              <FcConferenceCall size={23} />
            </CommunityListItem>
          </CategoryListItem>
          <hr className="my-5 border-baseBorder" />
          <CategoryListItem
            name="Your Projects"
            button={true}
            onClick={addProject}
          >
            <>
              {userProjects
                ? userProjects.map(
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
          <CategoryListItem
            name="Collaborative Projects"
            button={true}
            onClick={addCollaborativeProject}
          >
            <>
              {userCollaborativeProjects
                ? userCollaborativeProjects.flatMap(
                    (
                      project: IProject,
                      index: React.Key | null | undefined
                    ) => {
                      return (
                        <ProjectListItem
                          key={index}
                          onClick={() => openCollaboration(project.uid)}
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
          <CategoryListItem name="Chats" button={true} />
          <div
            id="dropdown-cta"
            className="p-4 mt-6 bg-blue-50  rounded-lg"
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
              This is a collaborative writing platform. You can invite other
              users to collaborate with you on your story. You can also invite
              them to collaborate on other stories. <br /> <br />
              You can add collaborators to your story by clicking on the
              "Collaborators" button in the toolbar.
            </p>
          </div>
        </div>
      </aside>
      {children}
    </div>
  );
};
