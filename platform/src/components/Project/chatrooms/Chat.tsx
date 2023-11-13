import { TextInput, Button, Input, Textarea } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import React, { FC } from "react";
import { IChat } from "../../../interfaces/IChat";
import { Comment } from "./Comment";
import { ScrollArea } from "@mantine/core";
import { inputStyles } from "../../../styles/inputStyles";
import { BlueButton } from "../../buttons/BlueButton";
import { useQueryClient } from "react-query";
import { initials, initialsColor } from "../../../utils/userIcons";
import { useAuthContext } from "../../../contexts/AuthContext";
export const Chat: FC<{
	setComment: React.Dispatch<React.SetStateAction<string>>;
	comment: string;
	comments: IChat["comments"];
	sendComment: () => void;
}> = ({ setComment, comment, comments, sendComment }) => {
	const { currentUser } = useAuthContext();

	return (
		<div className="flex-grow mx-auto border-t border-border dark:border-borderDark  max-w-3xl">
			<div className="flex flex-col-reverse gap-2 h-[calc(100vh-18.8rem)] overflow-y-auto ">
				<div className="flex flex-grow flex-col justify-end gap-2 px-2">
					{comments?.map((comment, index) => (
						<Comment
							comment={comment}
							previousComment={comments[index - 1] || null}
						/>
					))}
				</div>
			</div>
			<div className="flex gap-3 items-start dark:border-borderDark p-2 shrink-0 ">
				<div className="w-11 h-10 rounded-full bg-coolGrey-1/70 dark:bg-borderDark flex items-center justify-center">
					<div
						className={`font-bold truncate -mt-1 ${initialsColor(
							currentUser.name
						)}`}
					>
						{initials(currentUser.name)}
					</div>
				</div>
				<div className="border border-border dark:border-borderDark rounded-normal w-full relative h-40">
					<Textarea
						placeholder="Your comment"
						className="flex-grow dark:!bg-baseDark"
						variant="default"
						size="sm"
						minRows={4}
						maxRows={4}
						onChange={(e) => setComment(e.target.value)}
						value={comment}
						styles={{
							...inputStyles,
							input: {
								...inputStyles.input,
								// backgroundColor: "#fff !important",
								border: "none !important",
								// borderColor: "#ebebeb !important",
							},
						}}
					/>
					<button
						className="absolute text-sm bottom-3 right-2 text-coolGrey-7 hover:text-black dark:hover:text-coolGrey-1 bg-coolGrey-1 dark:bg-baseDark dark:border dark:border-borderDark rounded-normal px-2 py-1 transition-all duration-200 ease-in-out"
						onClick={sendComment}
					>
						send
					</button>
				</div>
			</div>
		</div>
	);
};
