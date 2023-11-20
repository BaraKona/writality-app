import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import { Paper, Text, Space, Badge, BackgroundImage } from "@mantine/core";
import { Image } from "@mantine/core";
import {
	collaborationTypeColour,
	postTypeColour,
} from "../../utils/typeColours";
import { useDefaultDateTime } from "../../hooks/useTimeFromNow";
import { IconBookmarkPlus } from "@tabler/icons-react";
import { BannerImage } from "../BannerImage";

export const PostBody: FC<{
	post: IPost;
	isLoading?: boolean;
	addFavourite: () => void;
}> = ({ post, isLoading, addFavourite }) => {
	const gray = "#e5e7eb";
	const gray2 = "#ced4da";
	const blue = "#394251";

	return (
		<div className="overflow-y-auto h-[calc(100dvh-7.6rem)] grow basis-[60rem] rounded-lg relative">
			<BannerImage
				image="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
				alt={post?.postTitle}
			/>

			<div className="px-2 mx-auto flex max-w-screen-xl gap-2">
				<div className="max-w-screen-md mx-auto">
					<Text
						className="text-sm rounded-lg px-4 py-0.5 absolute top-10 right-0 !text-coolGrey-4"
						// style={{
						// 	background: post?.theme?.time || gray,
						// 	color: post?.theme?.text || blue,
						// }}
					>
						{useDefaultDateTime(post?.dateCreated.toString())}
					</Text>
					<div className="flex gap-1 absolute top-4 right-2">
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
						<div className="ml-auto cursor-pointer text-coolGrey-3 hover:text-coolGrey-1 group-hover:visible transition-all ease-in-out duration-300">
							<IconBookmarkPlus size={18} onClick={addFavourite} />
						</div>
					</div>

					<Space h="md" />
					<h1
						className="font-bold my-8 text-coolGrey-7 dark:text-orange-800"
						// style={{
						// 	color: post?.theme?.projectTitle || blue,
						// }}
					>
						{post?.projectTitle}
					</h1>
					<h2
						className="font-semibold text-coolGrey-7 dark:text-coolGrey-4"
						// style={{
						// 	color: post?.theme?.postTitle || gray2,
						// }}
					>
						{post?.postTitle}
					</h2>
					{post?.genres?.length > 0 && (
						<div className="flex flex-wrap gap-2 my-4 cursor-default">
							{post.genres.map((genre, index) => (
								<Text
									key={index}
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
						className="text-coolGrey-7 dark:text-coolGrey-4"
						// style={{
						// 	color: post?.theme?.text || blue,
						// }}
					>
						{post?.description}
					</Text>
					<Space h="md" />
				</div>
				{/* <PostCommentSection post={post} isLoading={Boolean(isLoading)} /> */}
			</div>
		</div>
	);
};
