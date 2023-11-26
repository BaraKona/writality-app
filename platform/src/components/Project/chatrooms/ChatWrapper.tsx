import { FC, useState } from "react";
import { useChatRooms } from "../../../hooks/chatRooms/useChatRooms";
import { useParams, useSearchParams } from "react-router-dom";
import { IChat } from "../../../interfaces/IChat";
import { Chat } from "../collaborators";
import { Tabs } from "@mantine/core";
import { useComment } from "../../../hooks/chatRooms/useComment";
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
		setSearchParams(`?chat=${primaryRoom._id}`);
	}

	const chatRoomComments = chatRooms?.find(
		(chatRoom: IChat) => chatRoom._id === searchParams.get("chat")
	)?.comments;

	return (
		<div className="flex">
			<Tabs
				className={`w-full !border-none h-[calc(100dvh-8rem)] !justify-center`}
				defaultValue={primaryRoom._id}
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
				<Tabs.List className="!border-none w-40 !gap-2 mr-2 ">
					{chatRooms?.map((chatRoom: IChat) => (
						<Tabs.Tab
							key={chatRoom._id}
							value={chatRoom._id}
							className="!border-none w-full !rounded-lg enabled:!bg-coolGrey-1 dark:enabled:!bg-hoverDark"
						>
							<ChatItem
								name={chatRoom.name}
								active={chatRoom._id === searchParams.get("chat")}
								latestComment={
									chatRoom.comments[chatRoom.comments.length - 1]?.content
								}
							/>
						</Tabs.Tab>
					))}
				</Tabs.List>
				<Tabs.Panel
					value={searchParams.get("chat") || primaryRoom._id}
					className="flex gap-2"
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
								(chatRoom: IChat) => chatRoom._id === searchParams.get("chat")
							)?.name
						}
					/>
					<div className="basis-72 flex rounded-lg flex-col gap-2">
						<div className="bg-coolGrey-1 dark:bg-hoverDark rounded-lg p-4 flex items-center justify-between">
							<SmallText>Chat participants</SmallText>
						</div>
						<div className="bg-coolGrey-1 dark:bg-baseDarker grow rounded-lg p-4 flex items-center justify-between"></div>
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
