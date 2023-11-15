import { FC, useState } from "react";
import { useChatRooms } from "../../../hooks/chatRooms/useChatRooms";
import { useParams, useSearchParams } from "react-router-dom";
import { IChat } from "../../../interfaces/IChat";
import { Chat } from "../collaborators";
import { Divider, Tabs } from "@mantine/core";
import { useComment } from "../../../hooks/chatRooms/useComment";
import { SmallText } from "../../texts/SmallText";
import { useThemeContext } from "../../../Providers/ThemeProvider";

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

	const { theme } = useThemeContext();

	return (
		<div className="flex">
			<Tabs
				className={`w-full !border-none border border-border dark:border-borderDark h-[calc(100vh-8rem)]`}
				defaultValue={primaryRoom.uid}
				radius={"md"}
				orientation="vertical"
				keepMounted={false}
				styles={{
					tab: {
						"&[data-active]": {
							border: "none",
							// backgroundColor: "!bg-coolGrey-4",
						},
					},
				}}
				onTabChange={(tab) => {
					setSearchParams(`?chat=${tab}`);
				}}
				value={searchParams.get("chat") || primaryRoom.uid}
			>
				<Tabs.List className="!border border-border dark:border-borderDark rounded-l-md w-64 p-2">
					{chatRooms?.map((chatRoom: IChat) => (
						<Tabs.Tab
							key={chatRoom.uid}
							value={chatRoom.uid}
							className="!border-none w-full !rounded-lg enabled:!bg-coolGrey-1 dark:enabled:!bg-hoverDark"
						>
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
						title={
							chatRooms?.find(
								(chatRoom: IChat) => chatRoom.uid === searchParams.get("chat")
							)?.name
						}
					/>
					<div className=" basis-72 p-4 border-border dark:border-borderDark border rounded-t-normal rounded-tl-none rounded-br">
						<SmallText>Chat participants</SmallText>
						<Divider
							my="xs"
							className="!border-coolGrey-1 dark:!border-borderDark"
						/>
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
		<div className="flex gap-2 flex-col">
			{/* {active ? (
				<IconCircleDotFilled size={14} className="text-green-600" />
			) : (
				<IconCircleDot size={14} />
			)} */}
			<div className="text-sm font-semibold text-coolGrey-7 dark:text-coolGrey-5">
				{name}
			</div>
			<SmallText light className="truncate w-52">
				{latestComment}
			</SmallText>
		</div>
	);
};
