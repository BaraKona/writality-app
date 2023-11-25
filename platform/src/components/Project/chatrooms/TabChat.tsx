import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserChat } from "../../../hooks/chat/useUserChat";
import { useComment } from "../../../hooks/chatRooms/useComment";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Textarea } from "@mantine/core";
import { inputStyles } from "../../../styles/inputStyles";
import { Skeleton } from "@mantine/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { initials, initialsColor } from "../../../utils/userIcons";
import { getHotkeyHandler } from "@mantine/hooks";

export const TabChat: FC<{ chatId: string }> = ({ chatId }) => {
	if (!chatId) return null;
	const [message, setMessage] = useState<string>("");
	const { currentUser } = useAuthContext();
	const { data: chat, isLoading } = useUserChat(chatId as string);
	const { mutate: send } = useComment(chatId as string);

	const navigate = useNavigate();

	const [parent] = useAutoAnimate();
	function sendMessage() {
		if (message === "") return;
		send({ chatId: chatId as string, comment: message });
		setMessage("");
	}
	function renderUserIcon(comment: any, index: any) {
		if (
			chat.comments[index - 1] &&
			chat.comments[index - 1].user.uid === comment.user.uid
		) {
			return null;
		} else {
			return (
				<div className="absolute -top-5 w-10 h-10 rounded-full bg-base dark:bg-baseDark border border-border dark:border-borderDark flex items-center justify-center">
					<div
						className={`font-bold truncate -mt-1 ${initialsColor(
							comment.user.name
						)}`}
					>
						{initials(comment.user.name)}
					</div>
				</div>
			);
		}
	}

	return (
		<section className="rounded-lg h-[calc(100vh-10rem)] overflow-y-auto flex flex-col relative">
			{isLoading ? (
				<>
					<div className="flex gap-2 grow">
						<div className="text-sm">
							<Skeleton width={100} height={20} />
						</div>
					</div>

					<div className="flex flex-col gap-2 py-2">
						<Skeleton height={20} />
						<Skeleton height={20} />
						<Skeleton height={20} />
					</div>
				</>
			) : (
				<>
					<div className="flex gap-2 grow">
						<div className="text-sm">{chat.name}</div>
					</div>

					<div
						className="flex flex-col gap-2 py-2 relative h-[calc(100vh-16rem)] overflow-auto w-full"
						ref={parent}
					>
						{chat.comments.map((comment: any, index: number) => (
							<div
								className={`flex flex-col gap-1 p-2 rounded-lg relative ${
									comment.user.uid === currentUser.uid
										? "items-start bg-rose-300 dark:bg-rose-600/50 mt-6"
										: "items-end bg-violet-500 dark:bg-indigo-600/50"
								}`}
							>
								{comment.content}
								{renderUserIcon(comment, index)}
							</div>
						))}
					</div>
				</>
			)}

			<Textarea
				placeholder="Your message - Shift + Enter to send "
				className="dark:!bg-baseDark !text-coolGrey-7 dark:!text-coolGrey-4 !border !border-border dark:!border-borderDark !rounded-lg"
				variant="default"
				size="md"
				minRows={2}
				maxRows={2}
				onChange={(e) => setMessage(e.target.value)}
				onKeyDown={getHotkeyHandler([
					["mod+Enter", sendMessage],
					["shift+Enter", sendMessage],
					["cmd+Enter", sendMessage],
				])}
				value={message}
				styles={{
					...inputStyles(),
					input: {
						...inputStyles().input,
						fontSize: "1rem",
						border: "none !important",
					},
				}}
			/>
			<button
				className="absolute text-sm bottom-2 right-2 text-coolGrey-7 hover:text-black dark:hover:text-coolGrey-1 bg-coolGrey-1 dark:bg-baseDark dark:border dark:border-borderDark rounded-lg px-2 py-1 transition-all duration-200 ease-in-out"
				onClick={sendMessage}
			>
				send
			</button>
		</section>
	);
};
