import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { IconArticle, IconTemplate, IconHome } from "@tabler/icons-react";
import { useSinglePost } from "../../hooks/posts/useSinglePost";
import { useLocation, useParams } from "react-router-dom";
import { Divider, Skeleton } from "@mantine/core";
import { PostBody } from "../../components/Posts/PostBody";
import { PostCommentSection } from "../../components/Posts/PostCommentSection";
import { useAddFavouriteTab } from "../../hooks/user/useAddFavouriteTab";
export const SinglePost = () => {
	const { postId } = useParams<{ postId: string }>();
	const { data: post, isLoading } = useSinglePost(postId as string);
	const location = useLocation();
	const { mutate } = useAddFavouriteTab();

	if (isLoading) {
		return (
			<div className="h-[calc(100vh-2.7rem)] place-items-center rounded-normal bg-secondary px-3 py-3">
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
				<Divider my="xs" color="grey.0" />
				<div className="flex gap-3">
					<Skeleton className="w-2/3" height={800} />
					<Divider className=" border-border" orientation="vertical" />
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
		<div className="h-[calc(100vh-2.7rem)] place-items-center rounded-normal bg-secondary px-3 py-3">
			<Breadcrumbs items={breadcrumbs} />
			<Divider my="xs" color="grey.0" />
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
				<Divider my="xs" color="grey.0" orientation="vertical" />
				<PostCommentSection post={post} isLoading={isLoading} />
			</div>
		</div>
	);
};
