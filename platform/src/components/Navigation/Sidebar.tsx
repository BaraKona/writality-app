import React, { FC, ReactNode, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
	ProjectListItem,
	CategoryListItem,
	CommunityListItem,
} from "../ListItems";
import DashboardNavigation from "./DashboardNavigation";
import { useAuthContext } from "../../contexts/AuthContext";
import { IProject } from "../../interfaces/IProject";
import { useNavigate } from "react-router-dom";
import { FcReading, FcRules } from "react-icons/fc";
import { useToast } from "../../hooks/useToast";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { createProject, getUserProjects } from "../../api/project/projects";
import { Divider, ScrollArea, Box } from "@mantine/core";
import {
	createCollabProject,
	getUserCollabProjects,
} from "../../api/collaboration/collabProjects";
import { IconSearch } from "@tabler/icons";

export const Sidebar: FC<{ children: ReactNode }> = ({ children }) => {
	const navigate = useNavigate();
	const { currentUser } = useAuthContext();
	const queryClient = useQueryClient();
	const {
		isLoading: projectsLoading,
		error,
		data: projects,
	} = useQuery(
		["projects", currentUser.uid],
		() => getUserProjects(currentUser.uid),
		{
			staleTime: Infinity,
			enabled: !!currentUser,
		}
	);
	const {
		isLoading: collabProjectsLoading,
		error: collabError,
		data: collaboration,
	} = useQuery(
		["collaboration", currentUser.uid],
		() => getUserCollabProjects(currentUser.uid),
		{
			staleTime: Infinity,
			enabled: !!currentUser,
		}
	);

	const addCollaboration = useMutation(createCollabProject, {
		onSuccess: () => {
			queryClient.invalidateQueries(["collaboration", currentUser.uid]);
		},
	});
	const addProject = useMutation(createProject, {
		onSuccess: () => {
			queryClient.invalidateQueries(["projects", currentUser.uid]);
			useToast("success", "Project created successfully! 🎉");
		},
	});

	const createAProject = () => {
		const project: IProject = {
			type: "main",
			uid: uuidv4(),
			owner: currentUser.uid,
			title: "New Project",
			description:
				"<p>A brief description of the story. You can also add a link to the story or general information about the story and/or updates...</p>",
			dateCreated: {
				user: currentUser.uid,
				date: new Date(),
			},
		};

		const numberOfProjects = projects?.filter(
			(project: IProject) => project.owner === currentUser.uid
		);
		console.log(numberOfProjects);
		if (numberOfProjects && numberOfProjects.length >= 3) {
			useToast(
				"error",
				"You can only have 3 projects. Try not to spread yourself too thin. ⚡"
			);
			return;
		}
		addProject.mutate(project);
	};

	const createACollaboration = () => {
		const project: IProject = {
			uid: uuidv4(),
			owner: currentUser.uid,
			title: "New Collaboration",
			description:
				"A brief description of the story. You can also add a link to the story or general information about the story and/or updates",
			dateCreated: {
				user: currentUser.uid,
				date: new Date(),
			},
			type: "collaboration",
		};

		const numberOfProjects = collaboration?.filter(
			(project: IProject) => project.owner == currentUser.uid
		);
		if (numberOfProjects.length >= 3) {
			useToast(
				"error",
				"You can only have 3 collaborations. Try not to spread yourself too thin. ⚡"
			);
			return;
		} else {
			addCollaboration.mutate(project);
		}
	};

	const openProject = (id: string) => {
		navigate(`/dashboard/project/${id}`);
	};
	const openCollaboration = (id: string) => {
		navigate(`/dashboard/collaboration/${id}`);
	};

	return (
		<div className="flex h-screen">
			<aside
				className="w-[250px]  overflow-y-auto border-r bg-baseMid border-baseBorder h-full"
				aria-label="Sidebar"
			>
				<div className=" py-2 px-3">
					<DashboardNavigation />
					<CategoryListItem name="Community">
						<CommunityListItem
							name="Posts"
							onClick={() => navigate("/dashboard/posts")}
						>
							<FcRules size={23} />
						</CommunityListItem>
						<CommunityListItem name="Stories">
							<FcReading size={23} />
						</CommunityListItem>
						{/* <CommunityListItem
              name="Users"
              onClick={() => navigate("/dashboard/users")}
            >
              <FcConferenceCall size={23} />
            </CommunityListItem> */}
					</CategoryListItem>
					<hr className="my-5 border-baseBorder" />
					<CategoryListItem
						name="Your Projects"
						button={true}
						onClick={createAProject}
						loading={projectsLoading}
					>
						<ScrollArea.Autosize
							maxHeight={178}
							offsetScrollbars
							scrollbarSize={6}
						>
							{projects?.map((project: IProject, index: number) => {
								return (
									<ProjectListItem
										key={index}
										onClick={() => openProject(project.uid)}
										name={project.title || "Untitled Project"}
										projectId={project.uid}
									/>
								);
							})}
						</ScrollArea.Autosize>
					</CategoryListItem>
					<hr className="my-5 border-baseBorder" />
					<CategoryListItem
						name="Collaborative Projects"
						button={true}
						onClick={createACollaboration}
						loading={collabProjectsLoading}
					>
						<ScrollArea.Autosize
							maxHeight={178}
							offsetScrollbars
							scrollbarSize={6}
						>
							{collaboration?.map((collaboration: IProject, index: number) => {
								return (
									<ProjectListItem
										key={index}
										onClick={() => openCollaboration(collaboration.uid)}
										name={collaboration.title || "Untitled Collaboration"}
										projectId={collaboration.uid}
									/>
								);
							})}
						</ScrollArea.Autosize>
					</CategoryListItem>
					{/* <hr className="my-5 border-baseBorder" />
          <CategoryListItem name="Chats" button={true} /> */}
					{/* <div
            id="dropdown-cta"
            className="p-4 mt-6 bg-blue-50  rounded-lg"
            role="alert"
          >
            <div className="flex items-center mb-3">
              <span className="bg-orange-100 text-orange-800 text-md font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
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
            <p className="mb-3 text-md text-blue-900 ">
              This is a collaborative writing platform. You can invite other
              users to collaborate with you on your story. You can also invite
              them to collaborate on other stories. <br /> <br />
              You can add collaborators to your story by clicking on the
              "Collaborators" button in the toolbar.
            </p>
          </div> */}
				</div>
			</aside>
			{children}
		</div>
	);
};
