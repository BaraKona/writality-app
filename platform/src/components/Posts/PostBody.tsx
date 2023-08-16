import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import { Paper, Text, Skeleton, Space, Divider, Badge } from "@mantine/core";
import { Image } from "@mantine/core";
import {
	collaborationTypeColour,
	postTypeColour,
} from "../../utils/typeColours";
import { useDefaultDateTime } from "../../hooks/useTimeFromNow";
import { IconBookmarkPlus } from "@tabler/icons-react";

export const PostBody: FC<{
	post: IPost;
	isLoading?: boolean;
	addFavourite: () => void;
}> = ({ post, isLoading, addFavourite }) => {
	const gray = "#e5e7eb";
	const gray2 = "#ced4da";
	const blue = "#394251";

	return (
		<div className="bg-gray-100/70 p-4 overflow-y-auto h-[calc(100vh-6.2rem)] rounded-normal flex-grow basis-[40rem]">
			<Paper
				shadow="xs"
				p="md"
				className=" text-coolGrey-7 max-w-3xl mx-auto"
				style={{
					background: post?.theme?.background || "white",
				}}
			>
				<Image
					alt={post?.postTitle}
					height={400}
					radius="sm"
					fit="cover"
					src={
						"https://images.unsplash.com/photo-1490709501740-c7ac36b7d587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
					}
					className="hover:scale-100 transition-all duration-200 ease-in-out"
				/>
				<div className="flex justify-between mt-2 ">
					<Text
						className=" text-sm rounded-normal px-4 py-0.5"
						style={{
							background: post?.theme?.time || gray,
							color: post?.theme?.text || blue,
						}}
					>
						{useDefaultDateTime(post?.dateCreated.toString())}
					</Text>
					<div className="flex gap-1">
						<Badge
							color={collaborationTypeColour(post.collaborationType)}
							variant="light"
							radius="sm"
							size="md"
						>
							{post?.collaborationType}
						</Badge>
						<Badge
							color={postTypeColour(post.postType)}
							variant="light"
							size="md"
							radius="sm"
						>
							{post?.postType}
						</Badge>
						<div className="ml-auto cursor-pointer hover:text-black group-hover:visible transition-all ease-in-out duration-300">
							<IconBookmarkPlus size={18} onClick={addFavourite} />
						</div>
					</div>
				</div>
				<Space h="md" />
				<h1
					className="font-bold"
					style={{
						color: post?.theme?.projectTitle || blue,
					}}
				>
					{post?.projectTitle}
				</h1>
				<h2
					className="font-semibold "
					style={{
						color: post?.theme?.postTitle || gray2,
					}}
				>
					{post?.postTitle}
				</h2>
				{post?.genres?.length > 0 && (
					<div className="flex flex-wrap gap-2 my-4 cursor-default">
						{post.genres.map((genre) => (
							<Text
								className="text-sm font-semibold leading-none"
								color="dimmed"
							>
								#{genre}
							</Text>
						))}
					</div>
				)}
				<Space h="md" />
				<Text
					style={{
						color: post?.theme?.text || blue,
					}}
				>
					{post?.description}
				</Text>
				<Space h="md" />
				<Divider
					className="my-2"
					style={{
						borderColor: post?.theme?.text || gray,
					}}
				/>
			</Paper>
		</div>
	);
};
