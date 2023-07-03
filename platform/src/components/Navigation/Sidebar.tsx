import React, { FC, ReactNode, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
	ProjectListItem,
	CategoryListItem,
	CommunityListItem,
} from "../ListItems";
import { useAuthContext } from "../../contexts/AuthContext";
import { IProject } from "../../interfaces/IProject";
import {
	Link,
	Outlet,
	useNavigate,
	useParams,
	useResolvedPath,
	useMatch,
} from "react-router-dom";
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
import { MainFrame } from "../Project";
import { useLocation } from "react-router-dom";

export const Sidebar: FC<{ children?: ReactNode }> = ({ children }) => {
	const navigate = useNavigate();
	const { currentUser, signOutCurrentUser } = useAuthContext();
	const { setTabs, tabs } = useTabContext();
	const queryClient = useQueryClient();
	const location = useLocation();

	const path = location.pathname.split("/")[1];

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

	const addProject = useMutation(createProject, {
		onSuccess: () => {
			queryClient.invalidateQueries(["projects", currentUser.uid]);
			useToast("success", "Project created successfully! 🎉");
		},
		onError: (error: Error) => {
			useToast("error", error?.message);
		},
	});

	const openProject = (route: string) => {
		navigate(route);
	};
	const openPages = (route: string) => {
		navigate(route);
	};

	return (
		<UserLoader>
			<div className="flex h-screen">
				<aside
					className="flex overflow-y-auto h-full w-60"
					aria-label="Sidebar"
				>
					<div className="flex flex-col py-2 px-3 w-full">
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
							<CommunityListItem
								name="Dashboard"
								onClick={() => openPages("dashboard")}
							>
								<IconLayoutDashboard size={20} />
							</CommunityListItem>
							<CommunityListItem
								name="Posts"
								onClick={() => openPages("posts")}
							>
								<IconTemplate size={20} />
							</CommunityListItem>
							<CommunityListItem
								name="Stories"
								onClick={() => openPages("stories")}
							>
								<IconBooks size={20} />
							</CommunityListItem>
						</CategoryListItem>
						<CategoryListItem
							mt="mt-8 mb-3"
							name="Your Projects"
							button={true}
							onClick={() => addProject.mutate(currentUser.uid)}
							loading={projectsLoading}
						>
							{/* <ScrollArea.Autosize mah={350} offsetScrollbars scrollbarSize={6}> */}
							{projects?.map((project: IProject, index: number) => {
								return (
									<ProjectListItem
										key={index}
										onClick={() => openProject(`project/${project.uid}`)}
										name={project.title || "Untitled Project"}
										projectId={project.uid}
										type={project.type}
									/>
								);
							})}
							{/* </ScrollArea.Autosize> */}
						</CategoryListItem>
						<div className="mt-auto mb-4">
							<CommunityListItem
								name="Settings"
								onClick={() => navigate("/settings")}
							>
								<IconSettings size={23} />
							</CommunityListItem>
							<CommunityListItem name="Help" onClick={() => navigate("/help")}>
								<IconHelp size={23} />
							</CommunityListItem>
							<CommunityListItem name="Logout" onClick={handleSignOut}>
								<IconLogout size={23} />
							</CommunityListItem>
						</div>
					</div>
				</aside>
				<MainFrame>
					<Outlet />
				</MainFrame>
			</div>
		</UserLoader>
	);
};
