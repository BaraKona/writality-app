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
	Paper,
	Card,
} from "@mantine/core";
import { Project } from "../../pages/project";
import { useTimeFromNow } from "../../utils/convertDate";
import { BlueButton } from "../buttons/BlueButton";
import { IconEye } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import {
	collaborationTypeColour,
	postTypeColour,
} from "../../utils/typeColours";
export const PostCard: FC<{
	post: IPost;
	openPost: (postId: string) => void;
}> = ({ post, openPost }) => {
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

	const navigate = useNavigate();

	return (
		<div className="basis-72 group">
			<Card shadow="sm" padding="md" radius="sm" withBorder>
				<Card.Section>
					<Image
						src={postCardPicture()}
						height={160}
						alt={post.postTitle}
						className="group-hover:grayscale-0 grayscale transition-all ease-in-out duration-300"
					/>
				</Card.Section>
				<Group
					position="apart"
					mt="xs"
					mb="xs"
					className="flex flex-row gap-1 items-start"
				>
					<UserRenderer post={post} />
					<div className="flex gap-1">
						<Badge
							color={collaborationTypeColour(post?.collaborationType)}
							variant="light"
							radius="sm"
							size="sm"
						>
							{post?.collaborationType}
						</Badge>
						<Badge
							color={postTypeColour(post?.postType)}
							variant="light"
							size="sm"
							radius="sm"
						>
							{post?.postType}
						</Badge>
					</div>
				</Group>
				<Group mt="md" mb="xs">
					<Text weight={500} size="sm" className="text-blueText">
						{post.postTitle || "Untitled post"}
					</Text>
				</Group>

				<Text size="xs" color="dimmed" className="line-clamp-3 h-14">
					{post.description}
				</Text>
				{post.genres?.length > 0 && (
					<div className="flex flex-wrap gap-2 my-4 cursor-default h-8 line-clamp-3">
						{post.genres.map((genre) => (
							<Text
								className="text-xs font-semibold leading-none"
								color="dimmed"
							>
								#{genre}
							</Text>
						))}
					</div>
				)}
				<BlueButton onClick={() => openPost(post.uid)}>
					<IconEye size={18} /> Explore post
				</BlueButton>
			</Card>
		</div>
	);
};

const UserRenderer = ({ post }: { post: IPost }) => {
	return (
		<div className="flex items-center gap-2 mb-3">
			<Image
				src="https://images.unsplash.com/photo-1490709501740-c7ac36b7d587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
				alt="Profile picture"
				width={30}
				height={30}
				radius="lg"
			/>
			<div className="flex flex-col text-blueText">
				<Text className="text-xs font-semibold">
					{post?.owner.slice(0, 10) || "User"}
				</Text>
				<Text className="text-xs font-normal" color="dimmed">
					{useTimeFromNow(post?.dateCreated)}
				</Text>
			</div>
		</div>
	);
};
