import { FC, ReactNode, useState } from "react";
import { useChatRooms } from "../../../hooks/chatRooms/useChatRooms";
import { useParams, useSearchParams } from "react-router-dom";
import { IChat } from "../../../interfaces/IChat";
import { IconCircleDot, IconMessageDots } from "@tabler/icons";
import { Chat } from "../Collaboration";
import { Tabs } from "@mantine/core";
import { tabStyles } from "../../../styles/tabStyles";
import { useComment } from "../../../hooks/chatRooms/useComment";
import { ProjectWrapperHeights } from "../../../styles/ProjectWrapperHeights";
export const ChatWrapper: FC<{}> = ({}) => {
	const { project } = useParams<{ project: string }>();
	const [comment, setComment] = useState<string>("");
	const [searchParams, setSearchParams] = useSearchParams();

	const { mutate } = useComment(project as string);
	const { data: chatRooms, isLoading } = useChatRooms(project as string);
	if (!chatRooms) {
		return <div>loading</div>;
	}
	const primaryRoom = chatRooms[0];
	if (!searchParams.get("chat")) {
		setSearchParams(`?chat=${primaryRoom.uid}`);
	}

	return (
		<div className="flex border-r border-gray-200 px-2">
			<Tabs
				className={`w-full border-none important:border-none `}
				defaultValue={primaryRoom.uid}
				radius={"md"}
				orientation="vertical"
				keepMounted={false}
				styles={{
					...tabStyles,
					tab: {
						...tabStyles.tab,
						border: "none",
						"&[data-active]": {
							backgroundColor: "#e2e2e2",
						},
					},
				}}
				onTabChange={(tab) => {
					setSearchParams(`?chat=${tab}`);
				}}
				value={searchParams.get("chat") || primaryRoom.uid}
			>
				<Tabs.List>
					{chatRooms?.map((chatRoom: IChat) => (
						<Tabs.Tab key={chatRoom.uid} value={chatRoom.uid}>
							<ChatItem name={chatRoom.name} />
						</Tabs.Tab>
					))}
				</Tabs.List>
				<Tabs.Panel value={searchParams.get("chat") || primaryRoom.uid}>
					<Chat
						comments={
							chatRooms?.find(
								(chatRoom: IChat) => chatRoom.uid === searchParams.get("chat")
							)?.comments
						}
						comment={comment}
						setComment={setComment}
						sendComment={() => {
							mutate({
								chatId: searchParams.get("chat") || "",
								comment: comment,
							}),
								setComment("");
						}}
					/>
				</Tabs.Panel>
			</Tabs>
		</div>
	);
};

const ChatItem: FC<{ name: string }> = ({ name }) => {
	return (
		<div className="flex gap-1 items-center">
			<IconCircleDot size={14} />
			<div className="text-xs font-medium">{name}</div>
		</div>
	);
};
