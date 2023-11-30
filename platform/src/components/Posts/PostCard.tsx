import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import { Badge, Text } from "@mantine/core";
import { useThemeContext } from "../../Providers/ThemeProvider";
import { initials, initialsColor } from "../../utils/userIcons";
import { IconBookmarkFilled, IconBookmarkPlus } from "@tabler/icons-react";
import { useAddBookmark } from "../../hooks/user/useAddBookmark";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  collaborationTypeColour,
  postTypeColour,
} from "../../utils/typeColours";
import { useRemoveBookmark } from "../../hooks/user/useRemoveBookmark";
export const PostCard: FC<{
  post: IPost;
  openPost: (postId: string) => void;
  width?: string;
}> = ({ post, openPost, width }) => {
  const { mutate: addBookmark, isLoading: addLoading } = useAddBookmark();
  const { mutate: removeBookmark, isLoading: removeLoading } =
    useRemoveBookmark();
  const { currentUser } = useAuthContext();

  const { theme } = useThemeContext();

  if (!post) return null;
  return (
    <section
      className={`rounded-lg ${
        width ? width : "w-[23.85rem]"
      } relative flex cursor-pointer flex-col shadow transition-all duration-300 ease-in-out hover:shadow-md`}
      onClick={() => openPost(post.uid)}
    >
      {/* <div className="w-full bg-gradient-to-tr dark:from-purple-900 rounded-t-lg dark:to-sky-900 from-coolGrey-6 to-sky-800 h-48" /> */}
      <div className="h-48 w-full rounded-t-lg bg-gradient-to-tr from-coolGrey-6 to-sky-800 dark:from-purple-900 dark:to-sky-900" />

      <div className="flex grow flex-col rounded-b-lg p-4 dark:border-x dark:border-b dark:border-borderDark">
        <div className="flex flex-grow flex-col">
          <UserRenderer post={post} />

          <button
            disabled={removeLoading || addLoading}
            className="absolute right-2 top-2 rounded-lg p-2 text-coolGrey-3 transition-all duration-300  ease-in-out hover:bg-coolGrey-1 hover:text-coolGrey-7 group-hover:visible dark:text-coolGrey-4 dark:hover:bg-hoverDark"
            onClick={(e) => {
              e.stopPropagation(),
                currentUser.bookmarks.some((bookmark: any) =>
                  bookmark.url.includes(post.uid),
                )
                  ? removeBookmark(`/posts/${post.uid}`)
                  : addBookmark({
                      url: `/posts/${post.uid}`,
                      name: post.postTitle,
                      type: "post",
                    });
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

          <div className="absolute right-2 top-40 flex gap-1">
            <Badge
              color={collaborationTypeColour(post?.collaborationType)}
              variant={theme === "light" ? "light" : "filled"}
              radius="sm"
              size="md"
            >
              {post?.collaborationType}
            </Badge>
            <Badge
              color={postTypeColour(post?.postType)}
              variant={theme === "light" ? "light" : "filled"}
              size="md"
              radius="sm"
            >
              {post?.postType}
            </Badge>
          </div>
          <div className="flex grow flex-col">
            <div className="clamp-2 flex h-14 items-center justify-center text-center text-lg text-coolGrey-7 dark:text-coolGrey-3">
              {post.projectTitle || "Untitled post"}
            </div>
            <div className="mb-4 mt-2 line-clamp-1 rounded-md border border-border bg-coolGrey-1 p-1 px-2 text-xs text-coolGrey-7 dark:border-baseDark dark:bg-hoverDark dark:text-yellow-400">
              {post.postTitle || "Untitled post"}
            </div>

            <Text
              size="sm"
              color="dimmed"
              className="line-clamp-5 max-h-[7rem]"
            >
              {post.collaboration}
            </Text>
            <div className="mt-auto">
              {post.genres?.length > 0 && (
                <div className="my-4 line-clamp-4 flex h-9 cursor-default flex-wrap gap-1">
                  {post.genres.map((genre, index) => (
                    <p
                      key={index}
                      className="h-4 text-xs font-semibold leading-none dark:text-emerald-500"
                      color="dimmed"
                    >
                      &#183;{genre}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const UserRenderer = ({ post }: { post: IPost }) => {
  return (
    <div className="absolute left-2 top-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-base transition-all duration-300 ease-in-out hover:shadow-md dark:bg-baseDark">
      <div
        className={`-mt-1 truncate text-sm font-bold ${initialsColor(
          post.owner.name,
        )}`}
      >
        {initials(post.owner.name)}
      </div>
    </div>
  );
};
