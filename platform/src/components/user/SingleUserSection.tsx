import { Tabs } from "@mantine/core";
import { FC } from "react";
import { IProject } from "../../interfaces/IProject";
import { GridProjects } from "../Project/GridProjects";
import { NoChapters } from "../Chapters";
import { IPost } from "../../interfaces/IPost";
import { PostCard } from "../Posts/PostCard";
import { useNavigate } from "react-router-dom";
import { PostList } from "../Posts/PostList";

export const SingleUserSection: FC<{
  projects?: IProject[];
  posts?: IPost[];
}> = ({ projects, posts }) => {
  if (!projects || !posts) {
    return null;
  }

  const navigate = useNavigate();

  return (
    <Tabs
      defaultValue="posts"
      keepMounted={false}
      className="!flex w-full !grow !flex-col border-none !pt-2"
    >
      <Tabs.List className="!mb-2 flex !grow-0 !items-center !gap-2 !border-none">
        <div className="flex gap-2 rounded-lg bg-coolGrey-1 p-1.5 dark:bg-hoverDark">
          <Tabs.Tab
            value="posts"
            className="!rounded-lg !border-none !p-1.5 !px-3 font-semibold !text-coolGrey-6 transition-all duration-300 ease-in-out hover:!bg-coolGrey-7 hover:!text-coolGrey-1 data-[active]:!bg-coolGrey-7 data-[active]:!text-coolGrey-1 dark:!text-coolGrey-4 dark:hover:!bg-purple-800/50 dark:data-[active]:!bg-purple-800 dark:data-[active]:!text-coolGrey-1 "
          >
            Posts
          </Tabs.Tab>
          <Tabs.Tab
            value="projects"
            className="!rounded-lg !border-none !p-1.5 !px-3 font-semibold !text-coolGrey-6 transition-all duration-300 ease-in-out hover:!bg-coolGrey-7 hover:!text-coolGrey-1 data-[active]:!bg-coolGrey-7 data-[active]:!text-coolGrey-1 dark:!text-coolGrey-4 dark:hover:!bg-purple-800/50 dark:data-[active]:!bg-purple-800 dark:data-[active]:!text-coolGrey-1"
          >
            Projects
          </Tabs.Tab>
        </div>
      </Tabs.List>

      <Tabs.Panel
        value="projects"
        pt="xs"
        className="flex !grow !rounded-md !p-0 dark:border-l-black/70"
      >
        {projects.length === 0 ? (
          <NoChapters
            title="User has no public projects"
            p1="This user does not have any public projects. If you know them, you can still send them a message"
          />
        ) : (
          <div className="flex flex-row flex-wrap content-start gap-2">
            {projects.map((project) => (
              <GridProjects project={project} size="basis-[16.5rem]" />
            ))}
          </div>
        )}
      </Tabs.Panel>

      <Tabs.Panel
        value="posts"
        pt="xs"
        className="flex !grow !rounded-md !p-0 dark:border-l-black/70"
      >
        {posts.length === 0 ? (
          <NoChapters
            title="User has no posts"
            p1="This user does has not created any posts. If you know them, you can still send them a message"
          />
        ) : (
          <div className="flex w-full flex-row flex-wrap content-start gap-2">
            {posts?.map((post) => (
              // <PostCard
              //   post={post}
              //   openPost={() => navigate(`/posts/${post.uid}`)}
              //   width="w-[20.3rem]"
              // />
              <PostList openPost={() => navigate(`/posts/${post.uid}`)} post={post} />
            ))}
          </div>
        )}
      </Tabs.Panel>
    </Tabs>
  );
};
