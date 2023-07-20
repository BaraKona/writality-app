import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import { Paper, Text, Skeleton, Space, Divider } from "@mantine/core";
import { Image } from "@mantine/core";
import { useTimeFromNow } from "../../utils/convertDate";

export const PostBody: FC<{ post: IPost; isLoading: boolean }> = ({
	post,
	isLoading,
}) => {
	return (
		<div className="bg-gray-100/70 p-4 overflow-y-auto h-[calc(100vh-6.2rem)] rounded-normal flex-grow basis-[40rem]">
			<Paper shadow="xs" p="md" className=" text-blueText max-w-3xl mx-auto">
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
				<Text className="text-right">{useTimeFromNow(post?.dateCreated)}</Text>
				<Space h="md" />
				<h1 className="font-bold">{post?.postTitle}</h1>
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
				{/* <Text className="text-blueText/80">{post?.collaboration}</Text> */}
				<Divider className="my-2 border-gray-200" />
			</Paper>
		</div>
	);
};
