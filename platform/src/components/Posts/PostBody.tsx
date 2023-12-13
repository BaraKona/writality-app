import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import { Text, Space, Badge, Divider } from "@mantine/core";
import {
  collaborationTypeColour,
  postTypeColour,
} from "../../utils/typeColour";
import { useDefaultDateTime } from "../../hooks/useTimeFromNow";
import { IconBookmarkFilled, IconBookmarkPlus } from "@tabler/icons-react";
import { BannerImage } from "../BannerImage";
import { BreadcrumbItemProp, Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { useThemeContext } from "../../Providers/ThemeProvider";
import { useAuthContext } from "../../contexts/AuthContext";

export const PostBody: FC<{
  post: IPost;
  isLoading?: boolean;
  addFavourite?: () => void;
  removeBookmark?: () => void;
  breadCrumbs?: BreadcrumbItemProp[];
  isCreate?: boolean;
  bookmarkLoading?: boolean;
}> = ({
  post,
  isLoading,
  addFavourite,
  breadCrumbs,
  removeBookmark,
  isCreate,
  bookmarkLoading,
}) => {
  const { theme } = useThemeContext();
  const { currentUser } = useAuthContext();
  return (
    <div className="relative h-[calc(100vh-4.1rem)] grow basis-[60rem] overflow-y-auto rounded-lg pr-3">
      <BannerImage
        image="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        alt={post?.postTitle}
      />
      {breadCrumbs ? (
        <div className="my-2">
          <Breadcrumbs items={breadCrumbs} />
        </div>
      ) : null}

      <div className="mx-auto flex max-w-screen-xl gap-2 px-2">
        <div className="mx-auto max-w-screen-md">
          <Text className="absolute right-1 top-12 rounded-lg px-4 py-0.5 text-sm	 !text-coolGrey-4">
            {useDefaultDateTime(post?.dateCreated.toString())}
          </Text>
          <div className="absolute right-5 top-4 flex items-center gap-1">
            <Badge
              color={collaborationTypeColour(post.collaborationType)}
              variant={theme === "light" ? "light" : "filled"}
              radius="sm"
              size="md"
            >
              {post?.collaborationType}
            </Badge>
            <Badge
              color={postTypeColour(post.postType)}
              variant={theme === "light" ? "light" : "filled"}
              size="md"
              radius="sm"
            >
              {post?.postType}
            </Badge>

            {!isCreate && removeBookmark && addFavourite ? (
              <button
                disabled={bookmarkLoading}
                className="rounded-lg p-2 text-coolGrey-3 transition-all duration-300  ease-in-out hover:bg-coolGrey-1 hover:text-coolGrey-7 group-hover:visible dark:text-coolGrey-4 dark:hover:bg-hoverDark"
                onClick={(e) => {
                  e.stopPropagation(),
                    currentUser.bookmarks.some((bookmark: any) =>
                      bookmark.url.includes(post.uid),
                    )
                      ? removeBookmark()
                      : addFavourite();
                }}
              >
                {currentUser.bookmarks.some((bookmark: any) =>
                  bookmark.url.includes(post.uid),
                ) ? (
                  <IconBookmarkFilled size={18} />
                ) : (
                  <IconBookmarkPlus size={18} />
                )}
              </button>
            ) : null}
          </div>

          <Space h="md" />
          <h1 className="my-8 font-bold text-coolGrey-7 dark:text-orange-800">
            {post?.projectTitle}
          </h1>
          <h2 className="font-semibold text-coolGrey-7 dark:text-coolGrey-4">
            {post?.postTitle}
          </h2>
          {post?.genres?.length > 0 && (
            <div className="my-4 flex cursor-default flex-wrap gap-2">
              {post.genres.map((genre, index) => (
                <Text
                  key={index}
                  className="text-sm font-semibold leading-none"
                  color="dimmed"
                >
                  #{genre}
                </Text>
              ))}
            </div>
          )}
          <Space h="md" />
          <Text className="text-coolGrey-7 dark:text-coolGrey-4">
            {post?.collaboration}
          </Text>
          <Divider className="!my-6 border-coolGrey-1 dark:border-borderDark" />

          <Text className="text-coolGrey-7 dark:text-coolGrey-4">
            {post?.description}
          </Text>
          <Space h="md" />
        </div>
        {/* <PostCommentSection post={post} isLoading={Boolean(isLoading)} /> */}
      </div>
    </div>
  );
};
