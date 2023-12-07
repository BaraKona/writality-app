import { Tabs, Text } from "@mantine/core";
import { useUserProfileProjects } from "../hooks/projects/useUserProfileProjects";
import { useCreateProject } from "../hooks/projects/useCreateProject";
import { useAuthContext } from "../contexts/AuthContext";
import { ProfilePosts } from "../components/Profile/ProfilePosts";
import { BannerImage } from "../components/BannerImage";
import { Title } from "../components/Title";
import { initials, initialsColor } from "../utils/userIcons";
import { useNavigate } from "react-router-dom";
import { ProfileProjects } from "../components/Profile/ProfileProjects";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ProfileFriends } from "../components/Profile/ProfileFriends";
import { DailyCount } from "../components/Profile/DailyCount";
import { Trophies } from "../components/Profile/Trophies";
import { RecentNotifications } from "../components/Profile/RecentNotifications";
import { useQueryClient } from "react-query";

export const ProfilePage = () => {
  const { currentUser } = useAuthContext();
  const queryClient = useQueryClient();
  const { data: projects, isLoading } = useUserProfileProjects();

  const [parent] = useAutoAnimate();
  const { mutate } = useCreateProject();

  const navigate = useNavigate();

  function greeting() {
    const today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
      return "Good Morning";
    } else if (curHr < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }

  return (
    <div className="flex flex-row ">
      <div className="relative h-[calc(100dvh-3.2rem)] flex-grow place-items-center overflow-y-auto rounded-lg bg-base pr-2 dark:bg-baseDark">
        <BannerImage
          image="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Banner by Jez Timms on Unsplash"
        />
        <div className="dark:border-baseBorder absolute left-16 top-[10.5rem] mx-auto flex h-28 w-28 items-center justify-center rounded-full border-[0.75rem] border-base bg-coolGrey-1/70 dark:border-baseDark dark:bg-borderDark/70">
          <div
            className={`truncate text-4xl font-bold  ${initialsColor(
              currentUser.name,
            )} -mt-2`}
          >
            {initials(currentUser.name)}
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-screen-lg">
          <Title>
            {greeting()} {currentUser.name}!
          </Title>
          <div className="flex max-w-3xl flex-col">
            <p className="-mt-4 text-sm text-coolGrey-4 dark:text-coolGrey-3">
              "So here is why I write what I do: We all have futures. We all
              have pasts. We all have stories. And we all, every single one of
              us, no matter who we are and no matter what’s been taken from us
              or what poison we’ve internalized or how hard we’ve had to work to
              expel it –– we all get to dream."
            </p>
            <div>
              <Text
                weight={600}
                size="md"
                className="float-right italic text-coolGrey-7 dark:text-pink-700"
              >
                - N. K. Jemisin
              </Text>
            </div>
          </div>
          <Tabs
            className=" !my-4 w-full border-none"
            // onTabChange={(tab) => navigate(`/profile/${tab}`)}
            defaultValue="projects"
            radius={"md"}
            keepMounted={false}
          >
            <Tabs.List className="flex !items-center !gap-2  !border-none !pb-2">
              <Tabs.Tab
                className="!rounded-lg !border-none !p-[0.6rem] !px-3 font-semibold !text-coolGrey-6 transition-all duration-300 ease-in-out hover:!bg-coolGrey-7 hover:!text-coolGrey-1 data-[active]:!bg-coolGrey-7 data-[active]:!text-coolGrey-1 dark:!text-coolGrey-4 dark:hover:!bg-purple-800/50 dark:data-[active]:!bg-purple-800 dark:data-[active]:!text-coolGrey-1"
                value="projects"
              >
                Your Projects
              </Tabs.Tab>
              <Tabs.Tab
                className="!rounded-lg !border-none !p-[0.6rem] !px-3 font-semibold !text-coolGrey-6 transition-all duration-300 ease-in-out hover:!bg-coolGrey-7 hover:!text-coolGrey-1 data-[active]:!bg-coolGrey-7 data-[active]:!text-coolGrey-1 dark:!text-coolGrey-4 dark:hover:!bg-purple-800/50 dark:data-[active]:!bg-purple-800 dark:data-[active]:!text-coolGrey-1"
                value="posts"
              >
                Your Posts
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="projects" ref={parent}>
              <div className="flex flex-col gap-2 rounded-lg py-2">
                <ProfileProjects
                  projects={projects}
                  createProject={mutate}
                  isLoading={isLoading}
                />
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="posts" ref={parent}>
              <div className="flex flex-col gap-2 rounded-lg py-2">
                <ProfilePosts />
              </div>
            </Tabs.Panel>
          </Tabs>

          {/* <div className="flex flex-col gap-2 rounded-lg py-2">
            <ProfileProjects
              projects={projects}
              createProject={mutate}
              isLoading={isLoading}
            />
          </div> */}
        </div>
      </div>
      <div className="bg-coolGrey flex w-[24rem] flex-col gap-1 rounded-lg bg-coolGrey-1 px-2 dark:bg-baseDarker">
        <Trophies currentUser={currentUser} />
        <DailyCount />
        <ProfileFriends />
        <RecentNotifications />
      </div>
    </div>
  );
};
