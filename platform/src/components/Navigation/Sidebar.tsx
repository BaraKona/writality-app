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
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { createProject, getUserProjects } from "../../api/project/projects";
import { ScrollArea } from "@mantine/core";
import {
	createCollabProject,
	getUserCollabProjects,
} from "../../api/collaboration/collabProjects";
import {
	IconBooks,
	IconLogout,
	IconSearch,
	IconHelp,
	IconSettings,
	IconTemplate,
	IconLayoutDashboard,
} from "@tabler/icons";
import { UserLoader } from "../../UserLoader";
import { cyclops8 } from "../../assets/icons";
import { useTabContext } from "../../contexts/TabContext";

export const Sidebar: FC<{ children?: ReactNode }> = ({ children }) => {
	const navigate = useNavigate();
	const { currentUser, signOutCurrentUser } = useAuthContext();
	const { setTabs, tabs } = useTabContext();
	console.log(tabs);
	const queryClient = useQueryClient();
	const handleSignOut = async () => {
		await signOutCurrentUser().then(() => {
			navigate("/auth/login");
		});
	};
	const {
		isLoading: projectsLoading,
		error,
		data: projects,
	} = useQuery(
		["projects", currentUser?.uid],
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
		["collaboration", currentUser?.uid],
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
	const openProject = (
		id: string,
		projectTitle: string,
		projectType: string
	) => {
		const findTab = tabs.find(
			(tab) => tab.path === `/dashboard/${projectType}/${id}`
		);
		if (findTab) {
			navigate(`/dashboard/${projectType}/${id}`);
			return;
		}
		const newTab = {
			id,
			title: projectTitle,
			path: `/dashboard/${projectType}/${id}`,
		};

		setTabs((prevTabs: any) => [...prevTabs, newTab]);
		navigate(`/dashboard/${projectType}/${id}`);
	};

	return (
		<UserLoader>
			<div className="flex h-screen">
				<aside
					className="w-[250px] flex overflow-y-auto h-full"
					aria-label="Sidebar"
				>
					<div className=" flex flex-col py-2 px-3">
						<Link to="/">
							<div className="ml-2 my-2 flex">
								<img
									src={cyclops8}
									alt="writality"
									width={30}
									height={30}
									className="inline-block"
								/>
								<h1 className="font-semibold px-2 text-base">Writality</h1>
							</div>
						</Link>
						<CategoryListItem name="" mt="mt-2">
							<CommunityListItem name="Dashboard">
								<IconLayoutDashboard size={23} />
							</CommunityListItem>
							<CommunityListItem
								name="Posts"
								onClick={() => {
									setTabs(
										tabs.push({
											title: "Posts",
											path: "/dashboard/posts",
											id: uuidv4(),
										})
									);
									navigate("/dashboard/posts");
								}}
							>
								<IconTemplate size={23} />
							</CommunityListItem>
							<CommunityListItem name="Stories">
								<IconBooks size={23} />
							</CommunityListItem>
						</CategoryListItem>
						<CategoryListItem
							mt="mt-8 mb-3"
							name="Your Projects"
							button={true}
							onClick={createAProject}
							loading={projectsLoading}
						>
							<ScrollArea.Autosize mah={178} offsetScrollbars scrollbarSize={6}>
								{projects?.map((project: IProject, index: number) => {
									return (
										<ProjectListItem
											key={index}
											onClick={() => {
												openProject(
													project.uid,
													project.title || "New Project",
													"project"
												);
											}}
											name={project.title || "Untitled Project"}
											projectId={project.uid}
										/>
									);
								})}
							</ScrollArea.Autosize>
						</CategoryListItem>
						<CategoryListItem
							mt="mt-8 mb-3"
							name="Collaborative Projects"
							button={true}
							onClick={createACollaboration}
							loading={collabProjectsLoading}
						>
							<ScrollArea.Autosize mah={178} offsetScrollbars scrollbarSize={6}>
								{collaboration?.map(
									(collaboration: IProject, index: number) => {
										return (
											<ProjectListItem
												key={index}
												onClick={() => {
													openProject(
														collaboration.uid,
														collaboration.title || "New collaboration",
														"collaboration"
													);
												}}
												name={collaboration.title || "Untitled Collaboration"}
												projectId={collaboration.uid}
											/>
										);
									}
								)}
							</ScrollArea.Autosize>
						</CategoryListItem>
						<div className="mt-auto mb-4">
							<CommunityListItem
								name="Settings"
								onClick={() => navigate("/dashboard/settings")}
							>
								<IconSettings size={23} />
							</CommunityListItem>
							<CommunityListItem
								name="Help"
								onClick={() => navigate("/dashboard/help")}
							>
								<IconHelp size={23} />
							</CommunityListItem>
							<CommunityListItem name="Logout" onClick={handleSignOut}>
								<IconLogout size={23} />
							</CommunityListItem>
						</div>
					</div>
				</aside>
				<Outlet />
			</div>
		</UserLoader>
	);
};
