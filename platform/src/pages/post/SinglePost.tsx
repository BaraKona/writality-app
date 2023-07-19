import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { IconArticle, IconTemplate } from "@tabler/icons";
import { useSinglePost } from "../../hooks/posts/useSinglePost";
import { useParams } from "react-router-dom";
import { Divider } from "@mantine/core";
import { PostBody } from "../../components/Posts/PostBody";
import { PostCommentSection } from "../../components/Posts/PostCommentSection";

export const SinglePost = () => {
	const { postId } = useParams<{ postId: string }>();
	const { data: post, isLoading } = useSinglePost(postId as string);

	const breadcrumbs = [
		{
			label: "Posts",
			path: "/posts",
			icon: <IconTemplate size={18} />,
			isLoading: isLoading,
		},
		{
			label: post?.postTitle,
			path: `/posts/${post?.id}`,
			icon: <IconArticle size={18} />,
			isLoading: isLoading,
		},
	];

	return (
		<div className="h-[calc(100vh-2.7rem)] place-items-center rounded-normal bg-white px-3 py-3">
			<Breadcrumbs items={breadcrumbs} />
			<Divider className="my-2 border-gray-200" />
			<div className="flex gap-3">
				<PostBody post={post} isLoading={isLoading} />
				<Divider className="my-2 border-gray-200" orientation="vertical" />
				<PostCommentSection post={post} isLoading={isLoading} />
			</div>
		</div>
	);
};
