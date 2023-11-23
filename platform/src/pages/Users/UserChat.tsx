import { useState } from "react";
import { Chat } from "../../components/Project/chatrooms/Chat";
import { useSingleUser } from "../../hooks/public/useSingleUser";
import { useNavigate, useParams } from "react-router-dom";
import { BannerImage } from "../../components/BannerImage";
import { initials, initialsColor } from "../../utils/userIcons";
import { Divider } from "@mantine/core";
import { ReadMoreText } from "../../components/ReadMoreText";
import { useDefaultDate } from "../../hooks/useTimeFromNow";
import { IUser } from "../../interfaces/IUser";
import { useUserChat } from "../../hooks/chat/useUserChat";
import { useComment } from "../../hooks/chatRooms/useComment";

export const UserChat = () => {
	const [comment, setComment] = useState<string>("");
	const { userId, chatId } = useParams();
	const { data: user } = useSingleUser(userId as string);
	const { data: chat } = useUserChat(chatId as string);
	const { mutate: sendMessage } = useComment(chatId as string);

	const navigate = useNavigate();

	return (
		<section className="rounded-lg h-[calc(100vh-3.2rem)] flex flex-col">
			<div className="flex gap-2 grow">
				<Chat
					comments={chat?.comments}
					comment={comment}
					setComment={setComment}
					sendComment={() => {
						sendMessage({
							chatId: chatId as string,
							comment: comment,
						}),
							setComment("");
					}}
					title={chat?.name}
				/>
				<div className="basis-80 relative flex flex-col gap-2">
					<BannerImage
						image="https://images.unsplash.com/photo-1699796073840-bfdf7eedd447?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt={user?.name}
						height="h-32"
					/>
					<div className=" w-16 h-16 rounded-full bg-coolGrey-1 dark:bg-hoverDark flex items-center justify-center border-[6px] dark:border-baseDark border-base absolute top-24 left-4">
						<div
							className={`font-bold truncate flex items-center text-lg ${initialsColor(
								user?.name
							)}`}
						>
							{initials(user?.name)}
						</div>
					</div>
					<div className="grow dark:bg-black bg-coolGrey-1 rounded-lg p-4 py-10 flex gap-4 flex-col">
						<p
							className="text-md font-bold hover:underline cursor-pointer"
							onClick={() => navigate(`/users/${user.uid}`)}
						>
							{user?.name}
						</p>
						<Divider className=" border-border dark:border-borderDark" />
						<div>
							<div className="text-sm font-bold mb-2">About me</div>
							<ReadMoreText
								text={user?.aboutMe}
								errorText="user has no information about themselves"
								maxTextLength={150}
							/>
							<div className="text-sm font-bold my-2">
								Writality member since
							</div>
							<div className="text-sm  my-2">
								{useDefaultDate(user?.dateCreated)}
							</div>
						</div>
						<Divider className=" border-border dark:border-borderDark" />
						<div>
							<div className="text-sm font-bold mb-2">Interests</div>

							<div className="text-sm my-2 flex gap-2 flex-wrap">
								{user?.interests.length > 0 ? (
									<>
										{user?.interests.map((interest: IUser["interests"]) => (
											<p className="italic text-coolGrey-5 ">#{interest}</p>
										))}
									</>
								) : (
									"No interests"
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
