import { IconArticle, IconClipboard, IconHome } from "@tabler/icons-react";
import { useSinglePost } from "../../hooks/posts/useSinglePost";
import { useLocation, useParams } from "react-router-dom";
import { Skeleton } from "@mantine/core";
import { PostBody } from "../../components/Posts/PostBody";
import { PostCommentSection } from "../../components/Posts/PostCommentSection";
import { useAddBookmark } from "../../hooks/user/useAddBookmark";
import { useSocket } from "../../Providers/SocketProvider";
import { useQueryClient } from "react-query";
import { useEffect } from "react";
import { useRemoveBookmark } from "../../hooks/user/useRemoveBookmark";

export const SinglePost = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data: post, isLoading } = useSinglePost(postId as string);
  const queryClient = useQueryClient();
  const location = useLocation();
  const { mutate, isLoading: addLoading } = useAddBookmark();
  const { mutate: removeBookmark, isLoading: removeLoading } =
    useRemoveBookmark();

  const { pusher } = useSocket();

  useEffect(() => {
    if (!post || !pusher) return;

    const channel = pusher.subscribe(`post-${post.uid}`);
    channel.bind("comments", () => {
      queryClient.invalidateQueries(["post", post.uid]);
    });

    // console.log(pusher);
    // return () => {
    // 	if (pusher) {
    // 		pusher.disconnect();
    // 		pusher.unsubscribe(`post-${post.uid}`);
    // 		pusher.unbind("comments");
    // 	}
    // };
  }, [post, pusher]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100dvh-3.1rem)] w-full rounded-lg">
        <div className="flex w-full grow gap-3">
          <Skeleton className="w-full grow" />

          <Skeleton className="!w-96" />
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    {
      label:
        location.pathname.split("/")[1].charAt(0).toUpperCase() +
        location.pathname.split("/")[1].slice(1),
      path: `/${location.pathname.split("/")[1]}`,
      isLoading: isLoading,
      icon:
        location.pathname.split("/")[1] === "posts" ? (
          <IconClipboard size={18} />
        ) : (
          <IconHome size={18} />
        ),
    },
    {
      label: post?.postTitle,
      path: `/posts/${post?.id}`,
      icon: <IconArticle size={18} />,
      isLoading: isLoading,
    },
  ];

  return (
    <div className="place-items-center rounded-lg">
      {/* <Divider my="xs" className="!border-coolGrey-1 dark:!border-borderDark" /> */}
      <div className="flex">
        <PostBody
          breadCrumbs={breadcrumbs}
          post={post}
          isLoading={isLoading}
          removeBookmark={() => removeBookmark(`/posts/${post?.uid}`)}
          addFavourite={() =>
            mutate({
              url: location.pathname,
              name: post?.projectTitle || post?.postTitle,
              type: "post",
            })
          }
          bookmarkLoading={addLoading || removeLoading}
        />
        <PostCommentSection post={post} />
      </div>
    </div>
  );
};
