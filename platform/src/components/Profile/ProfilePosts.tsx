import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import { PostCard } from "../Posts/PostCard";
import { Divider, Skeleton } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import { NoChapters } from "../Chapters";
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
				<div className="text-xs font-medium mb-2">Your Posts</div>
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
			<div className="h-[calc(100vh-9rem)] bg-primary rounded-normal">
				<NoChapters
					title="Posts"
					p1="You have no posts currently. Posts are a great way to get collaborators"
					p2="Create your first post to get started"
					createNewChapter={() => navigate("/posts/create")}
				/>
			</div>
		);
	}

	return (
		<div className="rounded-normal bg-primary p-2">
			{/* <div className="text-xs font-medium mb-2 ">Your Posts</div> */}
			{/* <Divider mt={4} color="grey.0" /> */}
			<div className="flex flex-col gap-2 h-[calc(100vh-9.8rem)] overflow-y-auto">
				{posts.map((post) => (
					<PostCard post={post!} openPost={openPost} />
				))}
			</div>
		</div>
	);
};
