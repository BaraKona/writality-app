import { FC, ReactNode, useState } from "react";
import { useChatRooms } from "../../../hooks/chatRooms/useChatRooms";
import { useParams, useSearchParams } from "react-router-dom";
import { IChat } from "../../../interfaces/IChat";
import { IconCircleDot, IconMessageDots } from "@tabler/icons";
import { Chat } from "../Collaboration";
import { Tabs } from "@mantine/core";
import { tabStyles } from "../../../styles/tabStyles";
import { useComment } from "../../../hooks/chatRooms/useComment";
import { Icon123, IconCircleDotFilled } from "@tabler/icons-react";

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
		<div className="flex border-r border-border px-2">
			<Tabs
				className={`w-full border-none important:border-none `}
				defaultValue={primaryRoom.uid}
				radius={"md"}
				orientation="vertical"
				keepMounted={false}
				styles={{
					...tabStyles,
					tabsList: {
						...tabStyles.tabsList,
						flexBasis: 200,
					},
					tab: {
						...tabStyles.tab,
						padding: "0.375rem 0.25rem",
						border: "none",
						"&[data-active]": {
							backgroundColor: "#eee",
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
							<ChatItem
								name={chatRoom.name}
								active={chatRoom.uid === searchParams.get("chat")}
							/>
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

const ChatItem: FC<{ name: string; active: boolean }> = ({ name, active }) => {
	return (
		<div className="flex gap-1 items-center">
			{active ? (
				<IconCircleDotFilled size={14} className="text-green-600" />
			) : (
				<IconCircleDot size={14} />
			)}
			<div className="text-xs font-medium">{name}</div>
		</div>
	);
};
