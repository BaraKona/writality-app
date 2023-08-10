import { FC } from "react";
import { CategoryListItem, CommunityListItem } from "../ListItems";
import { useAuthContext } from "../../contexts/AuthContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
	IconBooks,
	IconLogout,
	IconHelp,
	IconSettings,
	IconTemplate,
	IconHome,
	IconPinned,
	IconPinnedFilled,
	IconBookmarks,
	IconUserCircle,
	IconPlus,
	IconCubePlus,
	IconSquarePlus,
	IconCube,
} from "@tabler/icons-react";
import { cyclops8 } from "../../assets/icons";
import { MainFrame } from "../Project";
import { useSignout } from "../../hooks/user/useSignout";
import { useFavouriteProjects } from "../../hooks/projects/useFavouriteProjects";
import { useRemoveFavourite } from "../../hooks/user/useRemoveFavouriteProject";
import { Divider } from "@mantine/core";
import { IconUsersGroup } from "@tabler/icons-react";
import { UserProjects } from "../ListItems/UserProjects";
import { FavouriteTabItems } from "../ListItems/FavouriteTabItem";
import { SidebarTopNav } from "./components/SidebarTopNav";
import { useCreateProject } from "../../hooks/projects/useCreateProject";
import { useUserProjects } from "../../hooks/projects/useUserProjects";
import { useLocalStorage } from "@mantine/hooks";

export const Sidebar: FC<{}> = () => {
	const navigate = useNavigate();
	const { mutate: signOut } = useSignout();
	const { mutate: createProject } = useCreateProject();
	const { data: projects, isLoading: isProjectLoading } = useUserProjects();
	const bookmarks = "bookmarks";
	const home = "projects";

	const [sidebarNav, setSidebarNav] = useLocalStorage({
		key: "sidebarNav",
		defaultValue: home,
	});

	const { mutate: removeFavouriteProject } = useRemoveFavourite();

	const openProject = (route: string) => {
		navigate(route);
	};
	const openPages = (route: string) => {
		navigate(route);
	};

	return (
		<div className="flex h-screen">
			<aside
				className="flex overflow-y-auto h-full basis-60"
				aria-label="Sidebar"
			>
				<div className="flex flex-col py-2 px-2 w-full">
					<Link to="/">
						<div className="ml-2 mt-1 mb-2 flex">
							<img
								src={cyclops8}
								alt="writality"
								width={23}
								height={23}
								className="inline-block"
							/>
							<div className="font-semibold px-2 text-sm">Writality</div>
						</div>
						<Divider color="grey.0" />
					</Link>
					<div className="flex h-full">
						<div className="border-r border-[#ebebeb] flex-col flex">
							<CategoryListItem>
								<CommunityListItem
									name="Profile"
									onClick={() => openPages("/profile")}
								>
									<IconUserCircle size={18} />
								</CommunityListItem>
								<CategoryListItem>
									<Divider color="grey.0" />
								</CategoryListItem>
								<CommunityListItem
									name="Posts"
									onClick={() => openPages("/posts")}
								>
									<IconTemplate size={18} />
								</CommunityListItem>
								<CommunityListItem
									name="Stories"
									onClick={() => openPages("/stories")}
								>
									<IconBooks size={18} />
								</CommunityListItem>
							</CategoryListItem>
							<CategoryListItem>
								<Divider color="grey.0" />
							</CategoryListItem>
							<CategoryListItem>
								<CommunityListItem
									name="Users"
									onClick={() => openPages("/users")}
								>
									<IconUsersGroup size={18} />
								</CommunityListItem>
							</CategoryListItem>
							<CategoryListItem className="mb-auto">
								<Divider color="grey.0" />
							</CategoryListItem>
							<CategoryListItem>
								<CommunityListItem
									name="Settings"
									onClick={() => navigate("/settings")}
								>
									<IconSettings size={18} />
								</CommunityListItem>
								<CommunityListItem
									name="Help"
									onClick={() => navigate("/help")}
								>
									<IconHelp size={18} />
								</CommunityListItem>
								<CommunityListItem name="Logout" onClick={signOut}>
									<IconLogout size={18} />
								</CommunityListItem>
							</CategoryListItem>
						</div>
						<CategoryListItem className="w-full">
							<section className="flex flex-row justify-center gap-0.5">
								<SidebarTopNav
									sidebarNav={sidebarNav}
									value={home}
									navigate={() => setSidebarNav(home)}
								>
									<IconCube size={18} />
								</SidebarTopNav>
								<SidebarTopNav
									sidebarNav={sidebarNav}
									value={bookmarks}
									navigate={() => setSidebarNav(bookmarks)}
								>
									<IconBookmarks size={18} />
								</SidebarTopNav>
								<SidebarTopNav
									sidebarNav={sidebarNav}
									value="create project"
									navigate={createProject}
								>
									<IconCubePlus size={18} />
								</SidebarTopNav>
							</section>
							<Divider color="grey.0" my={4} />

							{sidebarNav === home && (
								<UserProjects
									projects={projects}
									isLoading={isProjectLoading}
									openProject={openProject}
									removeFavouriteProject={removeFavouriteProject}
									createProject={createProject}
								/>
							)}
							{sidebarNav === bookmarks && <FavouriteTabItems />}
						</CategoryListItem>
					</div>
				</div>
			</aside>
			<MainFrame>
				<Outlet />
			</MainFrame>
		</div>
	);
};
