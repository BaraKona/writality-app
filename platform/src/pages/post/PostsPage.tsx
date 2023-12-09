import { FC } from "react";
import { getPosts } from "../../api/posts";
import { useQuery } from "react-query";
import { IPost } from "../../interfaces/IPost";
import { PostCard } from "../../components/Posts/PostCard";
import { Skeleton, Tooltip } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { DefaultPostBanner } from "../../assets/images";
import { BannerImage } from "../../components/BannerImage";
import { IconEdit, IconClipboard } from "@tabler/icons-react";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { Title } from "../../components/Title";

export const PostsPage: FC = () => {
  const { data: posts, isLoading } = useQuery("posts", getPosts);
  const navigate = useNavigate();

  const openPost = (postId: string) => {
    navigate(`/posts/${postId}`);
  };
  const openPostCreation = () => {
    navigate(`/posts/create`);
  };

  // if (isLoading) return <Loading isLoading={true} />;

  return (
    <div className="overflow-y-auto rounded-lg bg-base pb-5 dark:bg-baseDark">
      <Tooltip
        label="Create a new post"
        position="left"
        withArrow
        styles={tooltipStyles}
      >
        <button
          className="fixed right-5 top-14 z-20 rounded-lg border border-border bg-base p-2 hover:bg-gray-100 dark:border-borderDark dark:bg-baseDark dark:hover:bg-hoverDark"
          onClick={openPostCreation}
        >
          <IconEdit size={18} />
        </button>
      </Tooltip>
      <BannerImage image={DefaultPostBanner} alt="Post banner" />
      <div className="mx-auto">
        <Title>
          <div className="flex gap-2">
            <IconClipboard size={40} className="dark:text-purple-600" />
            Project Posts Board
          </div>
        </Title>
        {isLoading ? (
          <div className="flex flex-wrap gap-2">
            <Skeleton height={450} width="24.5%" radius="lg" />
            <Skeleton height={450} width="24.5%" radius="lg" />
            <Skeleton height={450} width="24.5%" radius="lg" />
            <Skeleton height={450} width="24.5%" radius="lg" />

            <Skeleton height={450} width="24.5%" radius="lg" />
            <Skeleton height={450} width="24.5%" radius="lg" />
            <Skeleton height={450} width="24.5%" radius="lg" />
            <Skeleton height={450} width="24.5%" radius="lg" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {posts?.map((post: IPost) => (
              <PostCard post={post} openPost={openPost} key={post?.uid} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
