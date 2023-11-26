import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import { Badge, Text } from "@mantine/core";
import { useThemeContext } from "../../Providers/ThemeProvider";
import { initials, initialsColor } from "../../utils/userIcons";
import { IconBookmarkFilled, IconBookmarkPlus } from "@tabler/icons-react";
import { useAddBookmark } from "../../hooks/user/useAddBookmark";
import { useAuthContext } from "../../contexts/AuthContext";
import {
	collaborationTypeColour,
	postTypeColour,
} from "../../utils/typeColours";
import { useRemoveBookmark } from "../../hooks/user/useRemoveBookmark";
export const PostCard: FC<{
	post: IPost;
	openPost: (postId: string) => void;
	width?: string;
}> = ({ post, openPost, width }) => {
	const { mutate: addBookmark } = useAddBookmark();
	const { mutate: removeBookmark } = useRemoveBookmark();
	const { currentUser } = useAuthContext();

	const { theme } = useThemeContext();

	return (
		<section
			className={`rounded-lg ${
				width ? width : "w-[23.85rem]"
			} shadow relative hover:shadow-md cursor-pointer transition-all ease-in-out duration-300 flex flex-col`}
			onClick={() => openPost(post.uid)}
		>
			{/* <div className="w-full bg-gradient-to-tr dark:from-purple-900 rounded-t-lg dark:to-sky-900 from-coolGrey-6 to-sky-800 h-48" /> */}
			<div className="w-full bg-gradient-to-tr dark:from-purple-900 rounded-t-lg dark:to-sky-900 from-coolGrey-6 to-sky-800 h-48" />

			<div className="p-4 dark:border-borderDark dark:border-b rounded-b-lg dark:border-x flex flex-col grow">
				<div className="flex-grow flex flex-col">
					<UserRenderer post={post} />
					{currentUser.bookmarks.some((bookmark: any) =>
						bookmark.url.includes(post.uid)
					) ? (
						<button
							className="absolute top-2 right-2 text-coolGrey-3 hover:text-coolGrey-7 dark:text-coolGrey-4 hover:bg-coolGrey-1 dark:hover:bg-hoverDark  group-hover:visible transition-all ease-in-out duration-300 p-2 rounded-lg"
							onClick={(e) => {
								e.stopPropagation(), removeBookmark(`/posts/${post.uid}`);
							}}
						>
							<IconBookmarkFilled size={18} />
						</button>
					) : (
						<button
							className={`absolute top-2 right-2 text-coolGrey-3 hover:text-coolGrey-7 dark:text-coolGrey-4 hover:bg-coolGrey-1 dark:hover:bg-hoverDark  group-hover:visible transition-all ease-in-out duration-300 p-2 rounded-lg`}
							onClick={(e) => {
								e.stopPropagation(),
									addBookmark({
										url: `/posts/${post.uid}`,
										name: post.postTitle,
										type: "post",
									});
							}}
						>
							<IconBookmarkPlus size={18} />
						</button>
					)}

					<div className="flex gap-1 absolute right-2 top-40">
						<Badge
							color={collaborationTypeColour(post?.collaborationType)}
							variant={theme === "light" ? "light" : "filled"}
							radius="sm"
							size="md"
						>
							{post?.collaborationType}
						</Badge>
						<Badge
							color={postTypeColour(post?.postType)}
							variant={theme === "light" ? "light" : "filled"}
							size="md"
							radius="sm"
						>
							{post?.postType}
						</Badge>
					</div>
					<div className="flex flex-col grow">
						<div className="text-coolGrey-7 dark:text-coolGrey-3 text-center text-lg clamp-2 h-14 flex items-center justify-center">
							{post.projectTitle || "Untitled post"}
						</div>
						<div className="text-xs p-1 px-2 mb-4 mt-2 border rounded-md border-border dark:border-baseDark dark:bg-hoverDark bg-coolGrey-1 text-coolGrey-7 dark:text-yellow-400 line-clamp-1">
							{post.postTitle || "Untitled post"}
						</div>

						<Text
							size="sm"
							color="dimmed"
							className="line-clamp-5 max-h-[7rem]"
						>
							{post.collaboration}
						</Text>
						<div className="mt-auto">
							{post.genres?.length > 0 && (
								<div className="flex flex-wrap gap-1 my-4 cursor-default h-9 line-clamp-4">
									{post.genres.map((genre, index) => (
										<p
											key={index}
											className="text-xs font-semibold leading-none h-4 dark:text-emerald-500"
											color="dimmed"
										>
											&#183;{genre}
										</p>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

const UserRenderer = ({ post }: { post: IPost }) => {
	return (
		<div className="w-10 h-10 rounded-full bg-base dark:bg-baseDark flex items-center justify-center absolute top-2 left-2 cursor-pointer transition-all ease-in-out duration-300 hover:shadow-md">
			<div
				className={`text-sm font-bold truncate -mt-1 ${initialsColor(
					post.owner.name
				)}`}
			>
				{initials(post.owner.name)}
			</div>
		</div>
	);
};
