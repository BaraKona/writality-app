import { FC, ReactNode, useState } from "react";
import { useChatRooms } from "../../../hooks/chatRooms/useChatRooms";
import { useParams, useSearchParams } from "react-router-dom";
import { IChat } from "../../../interfaces/IChat";
import { IconCircleDot, IconMessageDots } from "@tabler/icons-react";
import { Chat } from "../Collaboration";
import { Divider, Tabs } from "@mantine/core";
import { tabStyles } from "../../../styles/tabStyles";
import { useComment } from "../../../hooks/chatRooms/useComment";
import { Icon123, IconCircleDotFilled } from "@tabler/icons-react";
import { SmallText } from "../../texts/SmallText";

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

	const chatRoomComments = chatRooms?.find(
		(chatRoom: IChat) => chatRoom.uid === searchParams.get("chat")
	)?.comments;

	console.log(chatRoomComments);
	return (
		<div className="flex">
			<Tabs
				className={`w-full border-none important:border-none bg-base border border-border`}
				defaultValue={primaryRoom.uid}
				radius={"md"}
				orientation="vertical"
				keepMounted={false}
				styles={{
					...tabStyles,
					// tabsList: {
					// 	...tabStyles.tabsList,
					// 	flexBasis: 200,
					// 	backgroundColor: "#fff",
					// 	border: "1px solid #ebebeb",
					// 	borderTopRightRadius: "0.25rem",
					// 	borderTopLeftRadius: "0.25rem",
					// 	padding: "0.25rem 0.25rem",
					// },
					// tab: {
					// 	...tabStyles.tab,
					// 	border: "1px solid #ebebeb",
					// 	padding: "0.50rem 0.25rem",
					// 	margin: "0.25rem 0.25rem",
					// 	display: "block",
					// 	"&[data-active]": {
					// 		border: "1px solid #ebebeb",
					// 		// backgroundColor: "#eee",
					// 	},
					// },
				}}
				onChange={(tab) => {
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
								latestComment={
									chatRoom.comments[chatRoom.comments.length - 1]?.content
								}
							/>
						</Tabs.Tab>
					))}
				</Tabs.List>
				<Tabs.Panel
					value={searchParams.get("chat") || primaryRoom.uid}
					className="flex"
				>
					<Chat
						comments={chatRoomComments}
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
					<div className=" basis-72 p-4 border-border border rounded-t-normal">
						<SmallText>Chat participants</SmallText>
						<Divider my="xs" color="grey.0" />
					</div>
				</Tabs.Panel>
			</Tabs>
		</div>
	);
};

const ChatItem: FC<{
	name: string;
	active: boolean;
	latestComment: string;
}> = ({ name, active, latestComment }) => {
	// console.log(latestComment);
	return (
		<div className="items-center">
			{/* {active ? (
				<IconCircleDotFilled size={14} className="text-green-600" />
			) : (
				<IconCircleDot size={14} />
			)} */}
			<div className="text-xs font-medium">{name}</div>
			<Divider my="xs" color="grey.0" />
			<SmallText light>
				{latestComment?.length > 20
					? latestComment.slice(0, 20) + "..."
					: latestComment}
			</SmallText>
		</div>
	);
};
