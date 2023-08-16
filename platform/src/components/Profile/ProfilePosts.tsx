import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import { PostCard } from "../Posts/PostCard";
import { Divider, Skeleton } from "@mantine/core";

import { useNavigate } from "react-router-dom";
import { EmptyItem } from "../Chapters/EmptyItem";
export const ProfilePosts: FC<{ posts: IPost[]; isLoading: boolean }> = ({
	posts,
	isLoading,
}) => {
	const navigate = useNavigate();
	const openPost = (postId: string) => {
		navigate(`/profile/posts/${postId}`);
	};

	if (isLoading) {
		return (
			<div>
				<div className="text-xs font-medium mb-2 pr-2">Your Posts</div>
				<div className="flex flex-wrap gap-2">
					{[...Array(4)].map((_, i) => (
						<Skeleton key={i} height={300} width={250} />
					))}
				</div>
			</div>
		);
	}

	if (posts.length === 0) {
		return (
			<div className="border-border border rounded-normal h-[calc(100vh-31rem)] content-center flex">
				<EmptyItem
					title="Posts"
					p1="You have no posts currently. Posts are a great way to get collaborators"
					p2="Create your first post to get started"
					createNewChapter={() => navigate("/posts/create")}
				/>
			</div>
		);
	}

	return (
		<div>
			<div className="text-xs font-medium mt-2 ">Your Posts</div>
			<div className="flex flex-wrap gap-2 pr-2">
				{posts.map((post) => (
					<PostCard post={post!} openPost={openPost} />
				))}
			</div>
		</div>
	);
};
