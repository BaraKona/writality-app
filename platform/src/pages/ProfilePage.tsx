import { Text } from "@mantine/core";
import { ProfileProjects } from "../components/Profile/ProfileProjects";
import { useUserProfileProjects } from "../hooks/projects/useUserProfileProjects";
import { useCreateProject } from "../hooks/projects/useCreateProject";
import { useAuthContext } from "../contexts/AuthContext";
import { ProfilePosts } from "../components/Profile/ProfilePosts";
import { useUserPosts } from "../hooks/posts/useUserPosts";
import { BannerImage } from "../components/BannerImage";
import { Title } from "../components/Title";

export const ProfilePage = () => {
  const { currentUser } = useAuthContext();
  const { data: projects, isLoading } = useUserProfileProjects();
  const { data: posts, isLoading: postLoading } = useUserPosts();
  const { mutate } = useCreateProject();

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
      <div className="h-[calc(100dvh-3.2rem)] flex-grow place-items-center overflow-y-auto  rounded-lg bg-base pr-2 dark:bg-baseDark">
        <BannerImage
          image="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Banner by Jez Timms on Unsplash"
        />

        <div className="mx-auto max-w-screen-lg">
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

          <div className="flex flex-col gap-2 rounded-lg py-2">
            <ProfileProjects
              projects={projects}
              createProject={mutate}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      <div className="h-full max-w-sm">
        <ProfilePosts posts={posts} isLoading={postLoading} />
      </div>
    </div>
  );
};
