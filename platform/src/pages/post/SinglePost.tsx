import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { IconArticle, IconTemplate, IconHome } from "@tabler/icons-react";
import { useSinglePost } from "../../hooks/posts/useSinglePost";
import { useLocation, useParams } from "react-router-dom";
import { Divider, Skeleton } from "@mantine/core";
import { PostBody } from "../../components/Posts/PostBody";
import { PostCommentSection } from "../../components/Posts/PostCommentSection";
import { useAddFavouriteTab } from "../../hooks/user/useAddFavouriteTab";
import { useSocket } from "../../Providers/SocketProvider";
import { useQueryClient } from "react-query";
import Pusher from "pusher-js";
import { useEffect } from "react";

export const SinglePost = () => {
	const { postId } = useParams<{ postId: string }>();
	const { data: post, isLoading } = useSinglePost(postId as string);
	const location = useLocation();
	const { mutate } = useAddFavouriteTab();

	const queryClient = useQueryClient();

	const { listenToEvent, subscribeToChannel } = useSocket();

	listenToEvent({
		room: "post-page",
		event: "postUpdated",
		callback: () => queryClient.invalidateQueries(["post", postId]),
	});

	useEffect(() => {
		const pusher = subscribeToChannel({ room: `post-${postId}` });

		pusher.bind("comments", () => {
			queryClient.invalidateQueries(["post", postId]);
			console.log("comments");
		});
	}, [postId]);

	if (isLoading) {
		return (
			<div className="h-[calc(100vh-3rem)] place-items-center rounded-normal px-3 py-3">
				<Breadcrumbs
					items={[
						{
							label: "Posts",
							path: "/posts",
							icon: <IconTemplate size={18} />,
							isLoading: false,
						},
						{
							label: "Create",
							path: "/posts/create",
							icon: <IconArticle size={18} />,
							isLoading: false,
						},
					]}
				/>
				<Divider
					my="xs"
					className="!border-coolGrey-1 dark:!border-borderDark"
				/>
				<div className="flex gap-3">
					<Skeleton className="w-2/3" height={800} />
					<Divider
						className=" border-border dark:border-borderDark"
						orientation="vertical"
					/>
					<Skeleton className="w-1/3" height={800} />
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
					<IconTemplate size={18} />
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
		<div className="place-items-center rounded-normal px-3 py-3">
			<Breadcrumbs items={breadcrumbs} />
			<Divider my="xs" className="!border-coolGrey-1 dark:!border-borderDark" />
			<div className="flex gap-3">
				<PostBody
					post={post}
					isLoading={isLoading}
					addFavourite={() =>
						mutate({
							type: "post",
							url: location.pathname,
							name: post?.projectTitle || post?.postTitle,
						})
					}
				/>
				<Divider
					my="xs"
					className="!border-coolGrey-1 dark:!border-borderDark"
					orientation="vertical"
				/>
				<PostCommentSection post={post} />
			</div>
		</div>
	);
};
