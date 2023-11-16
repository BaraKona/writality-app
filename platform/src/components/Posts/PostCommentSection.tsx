import { FC, useState } from "react";
import { IPost } from "../../interfaces/IPost";
import { Avatar, Divider, Textarea } from "@mantine/core";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { Text } from "@mantine/core";
import { Form } from "react-router-dom";
import { inputStyles } from "../../styles/inputStyles";
import { IconSend } from "@tabler/icons-react";
import { ReadMoreText } from "../ReadMoreText";
import { useSendComment } from "../../hooks/posts/useSendComment";
import { PostComment } from "../../pages/post/PostComment";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { initials, initialsColor } from "../../utils/userIcons";

export const PostCommentSection: FC<{ post: IPost }> = ({ post }) => {
	const [comment, setComment] = useState("");
	const [parent] = useAutoAnimate();
	const { mutate } = useSendComment(post.uid);

	return (
		<div className="w-96 flex-grow-0 p-2 flex flex-col">
			<div className="flex gap-2 items-center">
				<div className="w-12 h-12 rounded-full !bg-coolGrey-2/70 dark:!bg-coolGrey-5/70 dark:bg-borderDark flex items-center justify-center dark:border-baseDark border-base shrink-0">
					<div
						className={`text-lg font-bold truncate -mt-1 ${initialsColor(
							post?.owner.name
						)}`}
					>
						{initials(post?.owner.name)}
					</div>
				</div>
				<div className="flex text-sm text-coolGrey-7 dark:text-coolGrey-4 flex-col">
					<div className="font-semibold">{post?.owner.name || "User"}</div>
					<Text className="text-xs font-normal" color="dimmed">
						{useTimeFromNow(post?.dateCreated.toString())}
					</Text>
				</div>
			</div>

			<Divider className="!border-coolGrey-1 dark:!border-borderDark" my={10} />
			<div className=" flex-grow-1 flex flex-col justify-between -mx-2">
				<div className="h-[calc(100dvh-17rem)] overflow-y-auto px-4 pl-2">
					<ReadMoreText
						text={post?.collaboration}
						maxTextLength={200}
						errorText="This post has no message to collaborators"
					/>
					<div className="gap-2 mt-3 flex flex-col justify-between ">
						<div ref={parent} className="overflow-y-auto flex-grow mt-auto">
							{post?.comments?.map((comment) => (
								<PostComment
									comment={comment}
									owner={post.owner._id}
									key={comment.uid}
								/>
							))}
						</div>
					</div>
				</div>
				<Textarea
					placeholder="Your comment"
					className="mt-auto"
					variant="default"
					size="sm"
					styles={inputStyles}
					value={comment}
					onChange={(event) => setComment(event.currentTarget.value)}
					rightSection={
						<IconSend
							size={18}
							className="text-coolGrey-7 hover:text-black dark:hover:text-coolGrey-1 cursor-pointer"
							onClick={() => {
								mutate(comment);
								setComment("");
							}}
						/>
					}
				/>
			</div>
		</div>
	);
};
