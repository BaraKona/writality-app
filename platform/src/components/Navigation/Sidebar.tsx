import { FC } from "react";
import { CategoryListItem } from "../ListItems";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { cyclops8, cyclops7 } from "../../assets/icons";
import { MainFrame } from "../Project";
import { useRemoveFavourite } from "../../hooks/user/useRemoveFavouriteProject";
import { Dialog, Divider } from "@mantine/core";
import { UserProjects } from "../ListItems/UserProjects";
import { FavouriteTabItems } from "../ListItems/FavouriteTabItem";
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
import { SidebarNav } from "./components/SidebarNav";
import { SidebarTopNav } from "./components/SidebarTopNav";
import { useCreateProject } from "../../hooks/projects/useCreateProject";

export const Sidebar: FC<{}> = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const { mutate: createProject } = useCreateProject();

  const [sidebarNav, setSidebarNav] = useLocalStorage({
    key: "sidebarNav",
    defaultValue: home,
  });

  const [userChat, setUserChat] = useLocalStorage({
    key: "userChat",
  });

  const [sidebarOpen, setSidebarOpen] = useLocalStorage({
    key: "sidebarOpen",
    defaultValue: true,
  });

  const { mutate: removeFavouriteProject } = useRemoveFavourite();

  const openProject = (route: string) => {
    navigate(route);
  };

  const [parent] = useAutoAnimate();

  return (
    <aside
      className="flex h-[calc(100dvh)] p-2 dark:bg-baseDark dark:text-coolGrey-4"
      aria-label="Sidebar"
    >
      <Dialog
        opened={Boolean(userChat)}
        onClose={() => setUserChat("")}
        size="lg"
        radius="md"
        shadow="sm"
        position={{ bottom: 10, right: 8 }}
        className="!bg-base !text-coolGrey-7 dark:!bg-baseDarker dark:!text-coolGrey-4 "
      >
        <TabChat chatId={userChat} close={() => setUserChat("")} />
      </Dialog>
      <div
        className={`flex ${
          sidebarOpen ? "w-[21rem] min-w-[21rem]" : ""
        } rounded-lg bg-coolGrey-2 dark:bg-baseDarker`}
      >
        <div className="flex w-full grow flex-col">
          <div className="flex h-full grow py-3" ref={parent}>
            <SidebarNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {sidebarOpen && (
              <CategoryListItem className="mr-3 flex h-full w-full grow flex-col rounded-lg bg-base py-2 shadow dark:bg-baseDark">
                <Link to="/" className="mb-2 self-center rounded-lg px-2 py-1">
                  <div className="mb-1 ml-2 mt-1 flex px-1.5">
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
                    <div className="px-2 text-sm font-semibold">Writality</div>
                  </div>
                </Link>
                <SidebarTopNav
                  sidebarNav={sidebarNav}
                  setSidebarNav={setSidebarNav}
                  createProject={createProject}
                />
                <Divider className="!mb-2 !border-coolGrey-1 dark:!border-borderDark" />
                <section className="flex grow overflow-y-auto" ref={parent}>
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
                  {sidebarNav === friends && <UserFriends chatId={userChat} />}
                  {sidebarNav === writingGroup && <UserWritingGroups />}
                  {sidebarNav === inbox && <Notifications notification={currentUser?.inbox} />}
                </section>
              </CategoryListItem>
            )}
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
