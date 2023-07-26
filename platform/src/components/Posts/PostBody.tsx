import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import { Paper, Text, Skeleton, Space, Divider, Badge } from "@mantine/core";
import { Image } from "@mantine/core";
import { useTimeFromNow } from "../../utils/convertDate";
import {
	collaborationTypeColour,
	postTypeColour,
} from "../../utils/typeColours";
export const PostBody: FC<{ post: IPost; isLoading?: boolean }> = ({
	post,
	isLoading,
}) => {
	const background = post?.color ? "bg-[" + post?.color + "]" : "bg-white";
	console.log(post?.color);
	return (
		<div className="bg-gray-100/70 p-4 overflow-y-auto h-[calc(100vh-6.2rem)] rounded-normal flex-grow basis-[40rem]">
			<div
				className={`text-blueText max-w-3xl mx-auto shadow-md rounded-normal p-5`}
				style={{ background: post?.color ? post?.color : "white" }}
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
				<div className="flex justify-between mt-2">
					<Text className="text-blueText text-sm rounded-normal px-4 py-0.5 bg-gray-200">
						{useTimeFromNow(post?.dateCreated)}
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
					</div>
				</div>
				<Space h="md" />
				<h1 className="font-bold">{post?.projectTitle}</h1>
				<h2 className="font-semibold text-gray-400">{post?.postTitle}</h2>
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
				<Text className="text-blueText/80">{post?.description}</Text>
				<Space h="md" />
				<Divider className="my-2 border-gray-200" />
			</div>
		</div>
	);
};
