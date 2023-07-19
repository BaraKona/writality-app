import { FC, useState } from "react";
import { IPost } from "../../interfaces/IPost";
import { Avatar, Divider } from "@mantine/core";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { Text } from "@mantine/core";
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
					className={`text-blueText/80 text-[0.85rem] transition-all ease-in-out duration-300 leading-1 ${
						!open ? "line-clamp-6" : ""
					}`}
				>
					{post?.collaboration}
				</Text>
				{!open && (
					<div className="flex justify-end">
						<Text
							className="text-blueText/80 text-[0.85rem] leading-1 cursor-pointer"
							onClick={() => setOpen(true)}
						>
							Show more
						</Text>
					</div>
				)}

				{open && (
					<div className="flex justify-end">
						<Text
							className="text-blueText/80 text-[0.85rem] leading-1 cursor-pointer"
							onClick={() => setOpen(false)}
						>
							Show less
						</Text>
					</div>
				)}
			</div>
		</div>
	);
};
