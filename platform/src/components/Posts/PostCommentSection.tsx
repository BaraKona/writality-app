import { FC, useState } from "react";
import { IPost } from "../../interfaces/IPost";
import { Avatar, Divider, Textarea } from "@mantine/core";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { Text } from "@mantine/core";
import { Form } from "react-router-dom";
import { inputStyles } from "../../styles/inputStyles";
import { IconSend } from "@tabler/icons";
export const PostCommentSection: FC<{ post: IPost; isLoading: boolean }> = ({
	post,
	isLoading,
}) => {
	const [open, setOpen] = useState(false);
	return (
		<div className="max-w-xl basis-96 flex-grow">
			<div className="flex gap-2">
				<Avatar.Group spacing="sm">
					<Avatar src="image.png" radius="xl" />
					<Avatar src="image.png" radius="xl" />
					<Avatar src="image.png" radius="xl" />
					<Avatar radius="xl">+5</Avatar>
				</Avatar.Group>
				<div className="flex text-sm text-blueText flex-col ">
					<div className="font-semibold">
						{post?.owner.slice(0, 10) || "User"}
					</div>
					<Text className="text-xs font-normal" color="dimmed">
						{useTimeFromNow(post?.dateCreated.toString())}
					</Text>
				</div>
			</div>
			<Divider className="my-2 border-gray-200" />
			<div>
				<Text
					className={`text-blueText/80 text-[0.85rem] transition-all ease-in-out duration-300 leading-1 max-h-96 overflow-y-auto ${
						!open ? "line-clamp-6" : ""
					}`}
				>
					{post?.collaboration}
				</Text>

				<div className="flex justify-end">
					<Text
						className="text-blueText/80 text-[0.85rem] leading-1 cursor-pointer underline text-xs font-semibold"
						onClick={() => setOpen((open) => !open)}
					>
						{open ? "Show less" : "Show more"}
					</Text>
				</div>
			</div>
			<Divider className="my-2 border-gray-200" />
			<div className="gap-2 place-items-center mt-3">
				<Textarea
					placeholder="Your comment"
					className="flex-grow "
					variant="default"
					size="sm"
					styles={inputStyles}
					onSubmit={() => console.log("submit")}
					rightSection={
						<IconSend size={18} className="text-blueText hover:text-black" />
					}
				/>
			</div>
		</div>
	);
};
