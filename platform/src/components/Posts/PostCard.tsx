import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import {
	Image,
	Text,
	Badge,
	Button,
	Group,
	ScrollArea,
	Title,
	Divider,
} from "@mantine/core";
import { Project } from "../../pages/dashboard/project";
import { useTimeFromNow } from "../../utils/convertDate";

export const PostCard: FC<{ post: IPost }> = ({ post }) => {
	const postCardPicture = () => {
		const pictures = [
			"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80",
			"https://images.unsplash.com/photo-1510218830377-2e994ea9087d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1316&q=80",
			"https://images.unsplash.com/photo-1516780236580-ef416334d5b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=698&q=80",
			"https://images.unsplash.com/photo-1490709501740-c7ac36b7d587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80,",
			"https://images.unsplash.com/photo-1546521677-b3a9b11bee6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80",
		];
		switch (post?.collaborationType) {
			case "Accountability":
				return pictures[0];
			case "Collaboration":
				return pictures[1];
			case "Critique":
				return pictures[2];
			case "Feedback":
				return pictures[3];
			case "Other":
				return pictures[4];
			default:
				return pictures[0];
		}
	};

	return (
		<>
			<div className="flex flex-grow px-3 bg-white max-w-3xl gap-10 text-blueText items-center">
				<div>
					<div className="flex items-center gap-2 mb-3">
						<Image
							src={
								post?.owner ||
								"https://images.unsplash.com/photo-1490709501740-c7ac36b7d587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80,"
							}
							alt="Profile picture"
							width={40}
							height={40}
							radius="lg"
						/>
						<div className="flex flex-col">
							<Text className="text-sm font-semibold">
								{post?.owner || "User Name"}
							</Text>
							<Text className="text-xs font-normal" color="dimmed">
								{useTimeFromNow(post?.dateCreated)}
							</Text>
						</div>
					</div>
					<Text className="text-xl font-semibold mb-2" lineClamp={1}>
						{post?.postTitle || "Post Title"}
					</Text>
					<div className="flex flex-col">
						<Text
							color="dimmed"
							lineClamp={3}
							className="text-[0.85rem] font-normal leading-tight"
						>
							{post.description}
						</Text>
						<div className="flex gap-2 my-4 cursor-default">
							<Badge color="gray" variant="outline">
								{post?.collaborationType}
							</Badge>
							<Badge color="cyan" variant="outline">
								{post?.postType}
							</Badge>
						</div>
						{post.genres?.length > 0 && (
							<div className="flex flex-wrap gap-2 my-4 cursor-default">
								{post.genres.map((genre) => (
									<Text className="text-sm font-semibold" color="dimmed">
										#{genre}
									</Text>
								))}
							</div>
						)}
					</div>
				</div>
				<div className="ml-auto px-2">
					<Image
						src={postCardPicture()}
						alt="Post card picture"
						width={192}
						height={130}
						radius="md"
					/>
				</div>
			</div>
			<Divider className="border-gray-200 max-w-3xl" />
		</>
	);
};
