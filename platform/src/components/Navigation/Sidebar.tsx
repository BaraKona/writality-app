import { FC, useEffect, useState } from "react";
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
	IconRocket,
	IconInbox,
	Icon3dCubeSphere,
} from "@tabler/icons-react";
import { cyclops8, cyclops7 } from "../../assets/icons";
import { MainFrame } from "../Project";
import { useSignout } from "../../hooks/user/useSignout";
import { useRemoveFavourite } from "../../hooks/user/useRemoveFavouriteProject";
import { Divider } from "@mantine/core";
import { IconUsersGroup } from "@tabler/icons-react";
import { UserProjects } from "../ListItems/UserProjects";
import { FavouriteTabItems } from "../ListItems/FavouriteTabItem";
import { SidebarTopNav } from "./components/SidebarTopNav";
import { useCreateProject } from "../../hooks/projects/useCreateProject";
import { useUserProjects } from "../../hooks/projects/useUserProjects";
import { useLocalStorage } from "@mantine/hooks";
import { useLocation } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { SmallText } from "../texts/SmallText";
import { useThemeContext } from "../../Providers/ThemeProvider";

export const Sidebar: FC<{}> = () => {
	const navigate = useNavigate();
	const { mutate: signOut } = useSignout();
	const { mutate: createProject } = useCreateProject();

	const [displayLocation, setDisplayLocation] = useState(location);
	const [transitionStage, setTransitionStage] = useState("fadeIn");

	const { data: projects, isLoading: isProjectLoading } = useUserProjects();
	const { theme } = useThemeContext();
	const bookmarks = "bookmarks";
	const home = "projects";
	const collabs = "collaborations";
	const inbox = "inbox";

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

	useEffect(() => {
		if (location !== displayLocation) setTransitionStage("fadeOut");
	}, [location, displayLocation]);

	return (
		<aside
			className="flex h-screen dark:bg-baseDark dark:text-coolGrey-4"
			aria-label="Sidebar"
		>
			<div className="flex overflow-y-auto h-full w-[20rem]">
				<div className="flex flex-col py-2 w-full">
					<Link to="/">
						<div className="ml-2 px-1.5 mt-1 mb-1 flex">
							{theme === "dark" ? (
								<img
									src={cyclops7}
									alt="writality"
									width={23}
									height={23}
									className="inline-block"
								/>
							) : (
								<img
									src={cyclops8}
									alt="writality"
									width={23}
									height={23}
									className="inline-block"
								/>
							)}
							<div className="font-semibold px-2 text-sm">Writality</div>
						</div>
						{/* <Divider className="!border-coolGrey-1 dark:!border-borderDark" /> */}
					</Link>
					<div className="flex h-full">
						<div className="flex-col flex">
							<CategoryListItem>
								<CommunityListItem
									name="Profile"
									onClick={() => openPages("/profile")}
								>
									<IconUserCircle size={18} />
								</CommunityListItem>
								<CategoryListItem>
									<Divider className="!border-coolGrey-1 dark:!border-borderDark" />
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
								<Divider className="!border-coolGrey-1 dark:!border-borderDark" />
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
								<Divider className="!border-coolGrey-1 dark:!border-borderDark" />
							</CategoryListItem>

							<CategoryListItem>
								<CommunityListItem type="event" name="Coming Soon">
									<IconRocket size={18} />
								</CommunityListItem>
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
						<CategoryListItem className="w-full rounded border border-border dark:border-borderDark mt-1.5 h-[calc(100vh-50px)]">
							<section className="flex flex-row justify-center gap-1 mb-2">
								<SidebarTopNav
									sidebarNav={sidebarNav}
									value={home}
									navigate={() => setSidebarNav(home)}
								>
									<IconCube size={18} />
								</SidebarTopNav>
								<SidebarTopNav
									sidebarNav={sidebarNav}
									value={collabs}
									navigate={() => setSidebarNav(collabs)}
								>
									<Icon3dCubeSphere size={18} />
								</SidebarTopNav>
								<SidebarTopNav
									sidebarNav={sidebarNav}
									value={inbox}
									navigate={() => setSidebarNav(inbox)}
								>
									<IconInbox size={18} />
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

							{sidebarNav === home && (
								<UserProjects
									projects={projects?.standard}
									isLoading={isProjectLoading}
									openProject={openProject}
									removeFavouriteProject={removeFavouriteProject}
									createProject={createProject}
									tab={home}
								/>
							)}
							{sidebarNav === collabs && (
								<UserProjects
									projects={projects.collaboration}
									isLoading={isProjectLoading}
									openProject={openProject}
									removeFavouriteProject={removeFavouriteProject}
									createProject={createProject}
									tab={collabs}
								/>
							)}
							{sidebarNav === bookmarks && <FavouriteTabItems />}
							{sidebarNav === inbox && (
								<SmallText className="text-center" light>
									Your chats will be here when you start chatting with someone.
								</SmallText>
							)}
						</CategoryListItem>
					</div>
				</div>
			</div>
			<MainFrame>
				<div
					className={`parent-container ${transitionStage}`}
					onAnimationEnd={() => {
						if (transitionStage === "fadeOut") {
							setTransitionStage("fadeIn");
							setDisplayLocation(location);
						}
					}}
				>
					<Outlet />
				</div>
			</MainFrame>
		</aside>
	);
};
