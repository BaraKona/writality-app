import { TextInput, Button, Input, Textarea } from "@mantine/core";
import { IconSend } from "@tabler/icons";
import React, { FC } from "react";
import { IChat } from "../../../interfaces/IChat";
import { Comment } from "./Comment";
import { ScrollArea } from "@mantine/core";
import { inputStyles } from "../../../styles/inputStyles";
import { BlueButton } from "../../buttons/BlueButton";
export const Chat: FC<{
	setComment: React.Dispatch<React.SetStateAction<string>>;
	comment: string;
	comments: IChat["comments"];
	sendComment: () => void;
}> = ({ setComment, comment, comments, sendComment }) => {
	return (
		<div className="flex-grow px-3  mx-auto ">
			<div
				// make items start from bottom
				className="flex flex-col-reverse gap-2 h-[calc(100vh-190px)]"
			>
				<div className="flex flex-grow flex-col justify-end gap-2">
					{comments?.map((comment, index) => (
						// check if previous comment is from same user
						<Comment
							comment={comment}
							previousComment={comments[index - 1] || null}
						/>
					))}
				</div>
			</div>
			<div className="flex gap-2 place-items-center mt-3">
				<Textarea
					placeholder="Your comment"
					className="flex-grow"
					variant="default"
					size="sm"
					onChange={(e) => setComment(e.target.value)}
					value={comment}
					styles={inputStyles}
					rightSection={
						<IconSend
							size={18}
							className="text-blueText hover:text-black"
							onClick={sendComment}
						/>
					}
				/>
			</div>
		</div>
	);
};