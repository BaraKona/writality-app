import { FC } from "react";
import { CategoryListItem, CommunityListItem } from "../ListItems";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
	IconBooks,
	IconLogout,
	IconHelp,
	IconSettings,
	IconClipboard,
	IconBookmarks,
	IconUserCircle,
	IconCubePlus,
	IconCube,
	IconInbox,
	Icon3dCubeSphere,
	IconUserHeart,
	IconSocial,
} from "@tabler/icons-react";
import { cyclops8, cyclops7 } from "../../assets/icons";
import { MainFrame } from "../Project";
import { useSignout } from "../../hooks/user/useSignout";
import { useRemoveFavourite } from "../../hooks/user/useRemoveFavouriteProject";
import { Dialog, Divider } from "@mantine/core";
import { IconUsersGroup } from "@tabler/icons-react";
import { UserProjects } from "../ListItems/UserProjects";
import { FavouriteTabItems } from "../ListItems/FavouriteTabItem";
import { SidebarTopNav } from "./components/SidebarTopNav";
import { useCreateProject } from "../../hooks/projects/useCreateProject";
import { useUserProjects } from "../../hooks/projects/useUserProjects";
import { useLocalStorage } from "@mantine/hooks";
import { useThemeContext } from "../../Providers/ThemeProvider";
import { IUser } from "../../interfaces/IUser";
import { Notifications } from "../notification/Notifications";
import { useQueryClient } from "react-query";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { UserFriends } from "../ListItems/UserFriends";
import { UserWritingGroups } from "../writingGroup/UserWritingGroups";
import { TabChat } from "../Project/chatrooms/TabChat";

export const Sidebar: FC<{}> = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate: signOut } = useSignout();
	const { mutate: createProject } = useCreateProject();

	/* @ts-ignore*/
	const { data: currentUser } = queryClient.getQueryState<IUser>("user");

	const { data: projects, isLoading: isProjectLoading } = useUserProjects();
	const { theme } = useThemeContext();

	const bookmarks = "bookmarks";
	const home = "projects";
	const collabs = "collaborations";
	const inbox = "inbox";
	const friends = "friends";
	const writingGroup = "writing group";

	const [sidebarNav, setSidebarNav] = useLocalStorage({
		key: "sidebarNav",
		defaultValue: home,
	});

	const [userChat, setUserChat] = useLocalStorage({
		key: "userChat",
	});

	const { mutate: removeFavouriteProject } = useRemoveFavourite();

	const openProject = (route: string) => {
		navigate(route);
	};

	const openPages = (route: string) => {
		navigate(route);
	};

	const [parent] = useAutoAnimate();

	return (
		<aside
			className="flex h-[calc(100dvh)] dark:bg-baseDark dark:text-coolGrey-4"
			aria-label="Sidebar"
		>
			<Dialog
				opened={userChat !== ""}
				onClose={() => setUserChat("")}
				size="lg"
				radius="md"
				shadow="sm"
				position={{ bottom: 10, right: 8 }}
				className="!bg-base dark:!bg-baseDarker !text-coolGrey-7 dark:!text-coolGrey-4 "
			>
				<TabChat chatId={userChat} close={() => setUserChat("")} />
			</Dialog>
			<div className="flex overflow-y-auto h-full w-[21rem] min-w-[21rem] bg-coolGrey-1 dark:bg-baseDarker rounded-lg">
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
									<Divider className="!border-coolGrey-2 dark:!border-borderDark" />
								</CategoryListItem>
								<CommunityListItem
									name="Posts"
									onClick={() => openPages("/posts")}
								>
									<IconClipboard size={18} />
								</CommunityListItem>
								<CommunityListItem
									name="Writing-groups"
									onClick={() => openPages("/writing-groups")}
								>
									<IconSocial size={18} />
								</CommunityListItem>
								<CommunityListItem
									name="Stories"
									onClick={() => openPages("/stories")}
								>
									<IconBooks size={18} />
								</CommunityListItem>
							</CategoryListItem>
							<CategoryListItem>
								<Divider className="!border-coolGrey-2 dark:!border-borderDark" />
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
								<Divider className="!border-coolGrey-2 dark:!border-borderDark" />
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
						<CategoryListItem className="w-full rounded-lg bg-base dark:bg-baseDark mr-3 mt-1.5 h-[calc(100dvh-50px)]">
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
									value={writingGroup}
									navigate={() => setSidebarNav(writingGroup)}
								>
									<IconSocial size={18} />
								</SidebarTopNav>
								<Divider
									className="!border-coolGrey-2 dark:!border-borderDark mx-2"
									orientation="vertical"
								/>
								<SidebarTopNav
									sidebarNav={sidebarNav}
									value="create project"
									navigate={createProject}
								>
									<IconCubePlus size={18} />
								</SidebarTopNav>
								<Divider
									className="!border-coolGrey-2 dark:!border-borderDark mx-2"
									orientation="vertical"
								/>
								<SidebarTopNav
									sidebarNav={sidebarNav}
									value={friends}
									navigate={() => setSidebarNav(friends)}
								>
									<IconUserHeart size={18} />
								</SidebarTopNav>
								<SidebarTopNav
									sidebarNav={sidebarNav}
									value={inbox}
									navigate={() => setSidebarNav(inbox)}
								>
									<div className="relative">
										<IconInbox size={18} />
										{currentUser.inbox?.filter(
											(inbox: any) => inbox?.notificationRead === false
										).length > 0 && (
											<div className="absolute top-0 right-0 w-2 h-2 bg-fuchsia-500 rounded-full" />
										)}
									</div>
								</SidebarTopNav>
								<SidebarTopNav
									sidebarNav={sidebarNav}
									value={bookmarks}
									navigate={() => setSidebarNav(bookmarks)}
								>
									<IconBookmarks size={18} />
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
									projects={projects?.collaboration}
									isLoading={isProjectLoading}
									openProject={openProject}
									removeFavouriteProject={removeFavouriteProject}
									createProject={createProject}
									tab={collabs}
								/>
							)}
							{sidebarNav === bookmarks && <FavouriteTabItems />}
							{sidebarNav === inbox && (
								<Notifications notification={currentUser?.inbox} />
							)}
							{sidebarNav === friends && <UserFriends />}
							{sidebarNav === writingGroup && <UserWritingGroups />}
						</CategoryListItem>
					</div>
				</div>
			</div>
			<MainFrame>
				<div ref={parent}>
					<Outlet />
				</div>
			</MainFrame>
		</aside>
	);
};
