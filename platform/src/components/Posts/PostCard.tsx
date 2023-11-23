import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import { Text, Badge, Group } from "@mantine/core";
import { useDefaultDateTime } from "../../hooks/useTimeFromNow";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../Providers/ThemeProvider";
import {
	collaborationTypeColour,
	postTypeColour,
} from "../../utils/typeColours";
import { initials, initialsColor } from "../../utils/userIcons";
export const PostCard: FC<{
	post: IPost;
	openPost: (postId: string) => void;
	className?: string;
}> = ({ post, openPost, className }) => {
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

	const { theme } = useThemeContext();
	const navigate = useNavigate();
	const gray = "#e5e7eb";
	const gray2 = "#ced4da";
	const blue = "#394251";

	return (
		<section
			className={`flex flex-col gap-2 rounded-lg border-border border dark:border-borderDark p-4 shrink ${
				className ? className : "basis-[26.3rem] h-80 max-w-[500px]"
			} hover:border-coolGrey-3 dark:hover:shadow-none dark:hover:border-coolGrey-5 hover:shadow-md cursor-pointer transition-all duration-200 ease-in-out`}
		>
			<div onClick={() => openPost(post.uid)}>
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
							variant={theme === "light" ? "light" : "outline"}
							radius="sm"
							size="md"
						>
							{post?.collaborationType}
						</Badge>
						<Badge
							color={postTypeColour(post?.postType)}
							variant={theme === "light" ? "light" : "outline"}
							size="md"
							radius="sm"
						>
							{post?.postType}
						</Badge>
					</div>
				</Group>

				<Text
					weight={600}
					size="md"
					className="text-coolGrey-7 dark:text-coolGrey-3"
				>
					{post.projectTitle || "Untitled post"}
				</Text>
				<Text
					weight={500}
					size="xs"
					className="text-coolGrey-7 dark:text-coolGrey-3"
				>
					{post.postTitle || "Untitled post"}
				</Text>

				<Text size="xs" color="dimmed" className="line-clamp-3 h-14">
					{post.collaboration}
				</Text>
				{post.genres?.length > 0 && (
					<div className="flex flex-wrap gap-2 my-4 cursor-default h-8 line-clamp-3">
						{post.genres.map((genre) => (
							<Text key={genre} size="xs" color="dimmed" weight={600}>
								#{genre}
							</Text>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

const UserRenderer = ({ post }: { post: IPost }) => {
	return (
		<div className="flex items-center gap-2 mb-3">
			<div className="w-12 h-12 rounded-full bg-coolGrey-1/70 dark:bg-borderDark flex items-center justify-center">
				<div
					className={`text-xl font-bold truncate -mt-1 ${initialsColor(
						post.owner.name
					)}`}
				>
					{initials(post.owner.name)}
				</div>
			</div>
			<div className="flex flex-col text-coolGrey-7 dark:text-coolGrey-3">
				<Text className="text-xs font-semibold">{post?.owner.name}</Text>
				<Text size="xs" color="dimmed">
					{useDefaultDateTime(post?.dateCreated.toString())}
				</Text>
			</div>
		</div>
	);
};
