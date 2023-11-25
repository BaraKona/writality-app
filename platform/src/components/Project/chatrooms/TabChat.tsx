import { FC, useEffect, useState } from "react";
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
import { SmallText } from "../../texts/SmallText";
import { useTimeFromNow } from "../../../hooks/useTimeFromNow";
import { useSocket } from "../../../Providers/SocketProvider";
import { useQueryClient } from "react-query";
import { IconX } from "@tabler/icons-react";

export const TabChat: FC<{ chatId: string; close: () => void }> = ({
	chatId,
	close,
}) => {
	const [message, setMessage] = useState<string>("");
	const queryClient = useQueryClient();
	const { currentUser } = useAuthContext();
	const { data: chat, isLoading } = useUserChat(chatId as string);
	const { mutate: send } = useComment(chatId as string);

	const { pusher } = useSocket();

	const navigate = useNavigate();
	const [parent] = useAutoAnimate();

	function sendMessage() {
		if (message === "") return;
		send({ chatId: chatId as string, comment: message });
		setMessage("");
	}

	useEffect(() => {
		if (!pusher || !chatId) return;

		const channel = pusher.subscribe(`chat-${chatId}`);
		channel.bind("userChat", () => {
			queryClient.invalidateQueries(["userChat", chatId]);
			queryClient.invalidateQueries(["chat", chatId]);
		});
	}, [pusher, chatId]);

	if (!chatId) return null;

	return (
		<section className="rounded-lg h-[calc(100vh-20rem)] flex flex-col relative">
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
				<div>
					<div className="flex gap-2 grow justify-between">
						<div className="text-sm">{chat?.name}</div>
						<button
							className="p-1 hover:bg-coolGrey-1 dark:hover:bg-hoverDark rounded-lg text-coolGrey-4 dark:text-coolGrey-5"
							onClick={close}
						>
							<IconX size={14} />
						</button>
					</div>

					<div
						className="flex flex-col py-2 relative h-[calc(100vh-26rem)] overflow-y-auto w-full pr-2"
						ref={parent}
					>
						{chat?.comments.map((comment: any, index: number) => (
							<div className="flex gap-2 mb-2 grow-1 dark:bg-hoverDark/40 rounded-lg p-1 bg-coolGrey-1 pr-4">
								<div className="w-12 h-12 rounded-full !bg-coolGrey-2/70 dark:!bg-coolGrey-5/70 dark:bg-borderDark flex items-center justify-center border-[5px] dark:border-baseDark border-base shrink-0">
									<div
										className={`text-base font-bold truncate -mt-1 ${initialsColor(
											comment?.user.name
										)}`}
									>
										{initials(comment?.user.name)}
									</div>
								</div>
								<div className="flex-col flex mt-2 w-full">
									<div className="flex gap-2">
										<SmallText
											className="text-coolGrey-7 dark:text-coolGrey-3 hover:underline cursor-pointer"
											onClick={() => navigate(`/users/${comment?.user.uid}`)}
										>
											{comment?.user.name}
										</SmallText>
										<SmallText className="!text-cyan-700 ml-auto">
											{useTimeFromNow(comment?.date.toString())}
										</SmallText>
									</div>
									<p className="text-sm">{comment?.content}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			<Textarea
				className="dark:!bg-baseDark !text-coolGrey-7 dark:!text-coolGrey-5 !border !border-border dark:!border-borderDark !rounded-lg"
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
