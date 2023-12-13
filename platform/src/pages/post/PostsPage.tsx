import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import { Divider, Skeleton, Tooltip } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { DefaultPostBanner } from "../../assets/images";
import { BannerImage } from "../../components/BannerImage";
import { IconEdit, IconClipboard, IconAdjustments } from "@tabler/icons-react";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { Title } from "../../components/Title";
import { PostList } from "../../components/Posts/PostList";
import {
  collaborationChips,
  genreChips,
  typeChips,
} from "../../components/Posts/CreatePostSection";

import { useSearchParams } from "react-router-dom";
import { usePosts } from "../../hooks/posts/usePosts";

export const PostsPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: posts, isLoading } = usePosts("&" + searchParams.toString());
  const navigate = useNavigate();

  const openPost = (postId: string) => {
    navigate(`/posts/${postId}`);
  };
  const openPostCreation = () => {
    navigate(`/posts/create`);
  };

  function addSearchParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams);

    if (params.getAll(key).includes(value)) {
      const updatedValues = params.getAll(key).filter((v) => v !== value);
      params.delete(key);
      updatedValues.forEach((v) => params.append(key, v));
    } else {
      params.append(key, value);
    }

    setSearchParams(params);
  }

  return (
    <div className="flex grow flex-col rounded-lg bg-base dark:bg-baseDark">
      <div className="flex w-full">
        <div className="relative h-[calc(100vh-3.4rem)]  grow overflow-y-auto pr-2">
          <Tooltip
            label="Create a new post"
            position="left"
            withArrow
            styles={tooltipStyles}
          >
            <button
              className="fixed right-72 top-14 z-20 rounded-lg border border-border bg-base p-2 hover:bg-gray-100 dark:border-borderDark dark:bg-baseDark dark:hover:bg-hoverDark"
              onClick={openPostCreation}
            >
              <IconEdit size={18} />
            </button>
          </Tooltip>
          <BannerImage image={DefaultPostBanner} alt="Post banner" />
          <div className="mx-auto flex max-w-screen-md grow flex-col ">
            <Title>
              <div className="flex gap-2">
                <IconClipboard size={40} className="dark:text-purple-600" />
                Project Post Board
              </div>
            </Title>
            {isLoading ? (
              <div className="mx-auto flex max-w-screen-md flex-col flex-wrap gap-2 px-2">
                <Skeleton height={250} width={750} radius="lg" />
                <Skeleton height={250} width={750} radius="lg" />
                <Skeleton height={250} width={750} radius="lg" />
                <Skeleton height={250} width={750} radius="lg" />

                <Skeleton height={250} width={750} radius="lg" />
                <Skeleton height={250} width={750} radius="lg" />
                <Skeleton height={250} width={750} radius="lg" />
                <Skeleton height={250} width={750} radius="lg" />
              </div>
            ) : (
              <div className="mx-auto flex max-w-screen-md grow flex-col gap-4 px-2">
                {posts?.map((post: IPost) => (
                  <PostList post={post} openPost={openPost} key={post?.uid} />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="relative flex w-64 flex-col gap-4 rounded-lg bg-coolGrey-2 p-2 dark:bg-baseDarker">
          <div className="rounded-lg">
            <div className="flex items-center gap-2 rounded-lg bg-base p-2 text-sm font-medium dark:bg-baseDark">
              <IconAdjustments size={18} />
              Filter
            </div>
          </div>
          <section>
            <div className="pb-2 text-xs font-semibold">Genres</div>
            <div className="flex flex-wrap gap-2">
              {genreChips.map((chip) => (
                <button
                  className="flex items-center gap-2 rounded-md bg-base p-2 py-1 text-xs font-normal dark:bg-baseDark"
                  onClick={() => addSearchParams("genre", chip.value)}
                >
                  {chip.title}
                </button>
              ))}
            </div>
          </section>
          <section>
            <div className="pb-2 text-xs font-semibold">Project</div>
            <div className="flex flex-wrap gap-2">
              {typeChips.map((chip) => (
                <button
                  className="flex items-center gap-2 rounded-md bg-base p-2 py-1 text-xs font-normal dark:bg-baseDark"
                  onClick={() => addSearchParams("postType", chip.value)}
                >
                  {chip.title}
                </button>
              ))}
            </div>
          </section>
          <section>
            <div className="pb-2 text-xs font-semibold">Collaboration</div>
            <div className="flex flex-wrap gap-2">
              {collaborationChips.map((chip) => (
                <button
                  className="flex items-center gap-2 rounded-md bg-base p-2 py-1 text-xs font-normal dark:bg-baseDark"
                  onClick={() =>
                    addSearchParams("collaborationType", chip.value)
                  }
                >
                  {chip.title}
                </button>
              ))}
            </div>
          </section>
          <section className="rounded-lg bg-base p-2 dark:bg-baseDark">
            <div className="pb-2 text-xs font-semibold">Applied filters</div>
            <div className="flex flex-wrap gap-2">
              {searchParams.getAll("genre").map((value) => (
                <p className="flex items-center gap-2 rounded-md  p-2 py-1 text-xs font-normal">
                  {value}
                </p>
              ))}
            </div>
            <Divider className="!my-2 !border-coolGrey-1 dark:!border-borderDark" />
            <div className="flex flex-wrap gap-2">
              {searchParams.getAll("postType").map((value) => (
                <p className="flex items-center gap-2 rounded-md  p-2 py-1 text-xs font-normal">
                  {value}
                </p>
              ))}
            </div>
            <Divider className="!my-2 !border-coolGrey-1 dark:!border-borderDark" />
            <div className="flex flex-wrap gap-2">
              {searchParams.getAll("collaborationType").map((value) => (
                <p className="flex items-center gap-2 rounded-md  p-2 py-1 text-xs font-normal">
                  {value}
                </p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
