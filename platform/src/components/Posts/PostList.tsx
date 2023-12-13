import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import { Text } from "@mantine/core";
import { useThemeContext } from "../../Providers/ThemeProvider";
import { initials, initialsColor } from "../../utils/userIcons";
import {
  IconBookmarkFilled,
  IconBookmarkPlus,
  IconCalendar,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import { useAddBookmark } from "../../hooks/user/useAddBookmark";
import { useAuthContext } from "../../contexts/AuthContext";
import { useRemoveBookmark } from "../../hooks/user/useRemoveBookmark";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import { useDefaultDate } from "../../hooks/useTimeFromNow";
import { useNavigate } from "react-router-dom";

export const PostList: FC<{
  post: IPost;
  openPost: (postId: string) => void;
}> = ({ post, openPost }) => {
  const { mutate: addBookmark, isLoading: addLoading } = useAddBookmark();
  const { mutate: removeBookmark, isLoading: removeLoading } =
    useRemoveBookmark();
  const { currentUser } = useAuthContext();

  const { theme } = useThemeContext();

  if (!post) return null;
  return (
    <section
      className={`relative flex w-full cursor-pointer rounded-lg border border-base shadow transition-all duration-300 ease-in-out hover:shadow-md dark:border-borderDark dark:hover:border-coolGrey-1/20`}
      onClick={() => openPost(post.uid)}
    >
      <div className="relative flex w-full flex-col">
        <div className="flex grow flex-col rounded-lg p-4 ">
          <div className="flex flex-grow flex-col">
            <UserRenderer post={post} />

            <button
              disabled={removeLoading || addLoading}
              className="absolute right-2 top-2 rounded-lg p-2 text-coolGrey-6 transition-all duration-300  ease-in-out hover:bg-coolGrey-1 hover:text-coolGrey-7 group-hover:visible dark:text-coolGrey-4 dark:hover:bg-hoverDark"
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

            <div className="flex gap-4">
              <div className="mt-8 flex flex-col items-center gap-4">
                <ButtonWrapper>
                  <IconChevronUp size={20} stroke={3} />
                </ButtonWrapper>
                <p className="-mt-1 self-center font-bold">
                  {post?.likes?.length || 0}
                </p>
                <ButtonWrapper>
                  <IconChevronDown size={20} stroke={3} />
                </ButtonWrapper>
              </div>

              <div className="flex grow flex-col gap-2">
                <div className="flex w-full gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-coolGrey-1 px-3 py-1 text-xs dark:bg-hoverDark">
                    <IconCalendar size={18} />{" "}
                    {useDefaultDate(post.dateCreated)}
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-coolGrey-1 px-3 py-1 text-xs dark:bg-hoverDark">
                    {post?.collaborationType}
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-coolGrey-1 px-3 py-1 text-xs dark:bg-hoverDark">
                    {post?.postType}
                  </div>
                </div>
                <div className="clamp-2 flex items-center text-lg font-bold text-coolGrey-7 dark:text-coolGrey-3">
                  {post.projectTitle || "Untitled post"}
                </div>
                <div className=" line-clamp-1 rounded-md border border-border bg-coolGrey-1 p-1 px-2 text-xs text-coolGrey-7 dark:border-baseDark dark:bg-hoverDark dark:text-yellow-400">
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
        </div>
      </div>
    </section>
  );
};

const UserRenderer = ({ post }: { post: IPost }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/users/${post.owner.uid}`);
      }}
      className="absolute left-2 top-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-base transition-all duration-300 ease-in-out hover:shadow-md dark:bg-baseDark"
    >
      <div
        className={` truncate text-sm font-bold ${initialsColor(
          post.owner.name,
        )}`}
      >
        {initials(post.owner.name)}
      </div>
    </button>
  );
};
