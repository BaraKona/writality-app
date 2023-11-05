import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import { PostCard } from "../Posts/PostCard";
import { Divider, Skeleton } from "@mantine/core";

import { useNavigate } from "react-router-dom";
import { EmptyItem } from "../Chapters/EmptyItem";
import { CreateButton } from "../buttons/CreateChapterButton";
import { IconPlus } from "@tabler/icons-react";
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
			<div className="border-border dark:border-borderDark border rounded-normal h-[calc(100vh-3.2rem)] items-center justify-center flex p-4 bg-coolGrey-2/20">
				<EmptyItem
					title="Posts"
					p1="You have no posts currently. Posts are a great way to get collaborators"
					p2="Create your first post to get started"
					createNewChapter={() => navigate("/posts/create")}
					className="flex justify-center"
				/>
			</div>
		);
	}

	return (
		<div className="border-border dark:border-borderDark border rounded-normal h-[calc(100vh-3.2rem)] pl-2">
			<div className="text-xs font-medium mt-2 w-full flex justify-between pb-1 pl-1 pr-2">
				Your Posts{" "}
				<CreateButton
					createNewChapter={() => navigate("/posts/create")}
					icon={<IconPlus size={14} />}
				/>
			</div>
			<div className="flex flex-col gap-2 pr-2 h-[calc(100vh-5.5rem)] overflow-y-auto">
				{posts?.map((post) => (
					<PostCard post={post!} openPost={openPost} key={post.uid} />
				))}
			</div>
		</div>
	);
};
