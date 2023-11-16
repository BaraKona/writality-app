import { Textarea } from "@mantine/core";
import React, { FC } from "react";
import { IChat } from "../../../interfaces/IChat";
import { Comment } from "./Comment";
import { inputStyles } from "../../../styles/inputStyles";
import { initials, initialsColor } from "../../../utils/userIcons";
import { useAuthContext } from "../../../contexts/AuthContext";
import { getHotkeyHandler } from "@mantine/hooks";

export const Chat: FC<{
	setComment: React.Dispatch<React.SetStateAction<string>>;
	comment: string;
	comments: IChat["comments"];
	sendComment: () => void;
	title: string;
}> = ({ setComment, comment, comments, sendComment, title }) => {
	const { currentUser } = useAuthContext();

	return (
		<div className="flex-grow border-t border-border dark:border-borderDark  bg-coolGrey-1/40 dark:bg-black/20 border-b">
			<div className=" dark:border-borderDark border-b border-border py-2 bg-base dark:bg-baseDark px-2">
				<div className="max-w-3xl mx-auto font-bold text-lg dark:text-coolGrey-4">
					{title}
				</div>
			</div>
			<div className="flex-grow mx-auto border-border dark:border-borderDark max-w-3xl ">
				<div className="flex flex-col-reverse gap-2 h-[calc(100dvh-21.6rem)] overflow-y-auto ">
					<div className="flex flex-grow flex-col justify-end gap-2 px-2">
						{comments?.map((comment, index) => (
							<Comment
								comment={comment}
								previousComment={comments[index - 1] || null}
							/>
						))}
					</div>
					<div className="text-center text-coolGrey-4 my-4 text-xs">
						{" "}
						~ This is the start of something beautiful ~
					</div>
				</div>
				<div className="flex gap-3 items-start p-2 shrink-0 ">
					<div className="w-11 h-10 rounded-full bg-coolGrey-1/70 dark:bg-borderDark flex items-center justify-center">
						<div
							className={`font-bold truncate -mt-1 ${initialsColor(
								currentUser.name
							)}`}
						>
							{initials(currentUser.name)}
						</div>
					</div>
					<div className="border border-border dark:border-borderDark rounded-lg w-full relative h-40 p-2 bg-base dark:bg-baseDark">
						<Textarea
							placeholder="Your message - Shift + Enter to send "
							className="flex-grow dark:!bg-baseDark"
							variant="default"
							size="md"
							minRows={4}
							maxRows={4}
							onChange={(e) => setComment(e.target.value)}
							onKeyDown={getHotkeyHandler([
								["mod+Enter", sendComment],
								["shift+Enter", sendComment],
								["cmd+Enter", sendComment],
							])}
							value={comment}
							styles={{
								...inputStyles,
								input: {
									...inputStyles.input,
									fontSize: "1rem",
									// backgroundColor: "#fff !important",
									border: "none !important",
									// borderColor: "#ebebeb !important",
								},
							}}
						/>
						<button
							className="absolute text-sm bottom-3 right-2 text-coolGrey-7 hover:text-black dark:hover:text-coolGrey-1 bg-coolGrey-1 dark:bg-baseDark dark:border dark:border-borderDark rounded-lg px-2 py-1 transition-all duration-200 ease-in-out"
							onClick={sendComment}
						>
							send
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
