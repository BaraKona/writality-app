import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import { PostCard } from "../Posts/PostCard";
import { Skeleton } from "@mantine/core";

import { useNavigate } from "react-router-dom";
import { EmptyItem } from "../Chapters/EmptyItem";
import { IconPlus } from "@tabler/icons-react";
import { useUserPosts } from "../../hooks/posts/useUserPosts";
export const ProfilePosts: FC<{}> = ({}) => {
  const navigate = useNavigate();
  const { data: posts, isLoading } = useUserPosts();
  const openPost = (postId: string) => {
    navigate(`/profile/posts/${postId}`);
  };

  if (isLoading) {
    return (
      <div className="h-[23rem] overflow-y-auto rounded-lg pl-2">
        <div className="flex flex-wrap gap-2 overflow-y-auto">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} height={320} width="20.8rem" />
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex h-[23rem] items-center justify-center rounded-lg bg-coolGrey-1/60 p-4 dark:bg-baseDarker/20">
        <EmptyItem
          title="Posts"
          p1="You have no posts currently. Posts are a great way to get collaborators"
          p2="Create your first post to get started"
          createNewChapter={() => navigate("/posts/create")}
          className="flex justify-center"
        />
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100dvh-3.2rem)] rounded-lg pl-2">
      <button
        className="absolute -top-12 right-0 justify-between rounded-lg border border-border p-2 text-xs transition-all duration-300 ease-in-out hover:border-coolGrey-3 hover:shadow dark:border-borderDark dark:hover:bg-hoverDark"
        onClick={() => navigate("/posts/create")}
      >
        <IconPlus size={14} />
      </button>
      <div className="flex flex-wrap gap-2">
        {posts?.map((post: IPost) => (
          <PostCard
            post={post!}
            openPost={openPost}
            key={post.uid}
            width="w-[20.8rem]"
          />
        ))}
      </div>
    </div>
  );
};
