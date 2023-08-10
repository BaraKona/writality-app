import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import { PostCard } from "../Posts/PostCard";
import { Skeleton } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
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
			<div>
				<div className="text-xs font-medium mb-2">Your Posts</div>
				<div className="flex flex-col w-52 border border-border rounded-normal px-4 py-2 hover:shadow cursor-pointer mr-4 h-56">
					<div
						className="flex flex-col items-center gap-2"
						onClick={() => navigate("/posts/create")}
					>
						<IconPlus size={24} />
						<div className="flex flex-col text-center">
							<div className="text-xs">You have no posts yet.</div>
							<div className="text-xs">Click here to create a new post.</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div>
			<div className="text-xs font-medium mb-2 ">Your Posts</div>
			<div className="flex gap-2">
				<Carousel
					withIndicators
					w={`calc(100vw - 16.5rem)`}
					slideGap="md"
					slideSize="34rem"
					withControls
					align="start"
					dragFree
				>
					{posts?.map((post: IPost) => (
						<Carousel.Slide>
							<PostCard post={post!} openPost={openPost} />
						</Carousel.Slide>
					))}
				</Carousel>
			</div>
		</div>
	);
};
