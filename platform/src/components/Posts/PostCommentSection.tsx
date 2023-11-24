import { FC, useState } from "react";
import { IPost } from "../../interfaces/IPost";
import { Divider, Textarea } from "@mantine/core";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { Text } from "@mantine/core";
import { inputStyles } from "../../styles/inputStyles";
import { IconSend } from "@tabler/icons-react";
import { useSendComment } from "../../hooks/posts/useSendComment";
import { PostComment } from "../../pages/post/PostComment";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { initials, initialsColor } from "../../utils/userIcons";
import { getHotkeyHandler } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

export const PostCommentSection: FC<{ post: IPost }> = ({ post }) => {
	const [comment, setComment] = useState("");
	const [parent] = useAutoAnimate();
	const { mutate } = useSendComment(post.uid);
	const navigate = useNavigate();
	function sendComment() {
		mutate(comment);
		setComment("");
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="w-96 grow px-2 pt-2 flex flex-col rounded-lg border  border-border dark:border-borderDark">
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
						<div
							className="font-semibold hover:underline cursor-pointer"
							onClick={() => navigate(`/users/${post?.owner.uid}`)}
						>
							{post?.owner.name || "User"}
						</div>
						<Text className="text-xs font-normal" color="dimmed">
							{useTimeFromNow(post?.dateCreated.toString())}
						</Text>
					</div>
				</div>

				<Divider
					className="!border-coolGrey-1 dark:!border-borderDark"
					my={10}
				/>
				<div className="h-[calc(100dvh-13rem)] overflow-y-auto flex flex-col grow">
					<div
						ref={parent}
						className="overflow-y-auto grow mt-auto flex flex-col pr-2"
					>
						<div className="h-1 w-10 rounded-lg bg-coolGrey-4 mx-auto mt-auto mb-2" />
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
				className=" !rounded-t-none"
				variant="default"
				size="sm"
				styles={inputStyles()}
				onKeyDown={getHotkeyHandler([
					["mod+Enter", sendComment],
					["shift+Enter", sendComment],
					["cmd+Enter", sendComment],
				])}
				value={comment}
				onChange={(event) => setComment(event.currentTarget.value)}
				rightSection={
					<IconSend
						size={18}
						className="text-coolGrey-7 hover:text-black dark:hover:text-coolGrey-1 cursor-pointer"
						onClick={() => sendComment}
					/>
				}
			/>
		</div>
	);
};
