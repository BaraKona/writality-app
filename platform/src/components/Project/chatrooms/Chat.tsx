import { Textarea } from "@mantine/core";
import React, { FC } from "react";
import { IChat } from "../../../interfaces/IChat";
import { Comment } from "./Comment";
import { inputStyles } from "../../../styles/inputStyles";
import { initials, initialsColor } from "../../../utils/userIcons";
import { useAuthContext } from "../../../contexts/AuthContext";
import { getHotkeyHandler } from "@mantine/hooks";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const Chat: FC<{
	setComment: React.Dispatch<React.SetStateAction<string>>;
	comment: string;
	comments: IChat["comments"];
	sendComment: () => void;
	title: string;
}> = ({ setComment, comment, comments, sendComment, title }) => {
	const { currentUser } = useAuthContext();

	const [parent] = useAutoAnimate();

	return (
		<section className="grow flex flex-col gap-2">
			<div className=" py-2 px-2 rounded-lg bg-coolGrey-1 dark:bg-baseDarker">
				<div className="max-w-3xl mx-auto font-bold text-lg dark:text-coolGrey-4">
					{title}
				</div>
			</div>
			<div className="bg-coolGrey-1/40 dark:bg-black/20 rounded-lg grow flex">
				<div className="mx-auto max-w-3xl grow flex flex-col">
					<div className="flex flex-col-reverse gap-2 grow">
						<div
							className="flex flex-grow flex-col justify-end gap-2 px-2"
							ref={parent}
						>
							{comments?.map((comment, index) => (
								<Comment
									comment={comment}
									connect={
										index !== comments.length - 1 &&
										comment.user.uid === comments[index + 1].user.uid
									}
								/>
							))}
						</div>
						<div className="text-center text-coolGrey-4 my-4 text-xs">
							{" "}
							~ This is the start of something beautiful ~
						</div>
					</div>
					<div className="flex gap-3 items-start p-2 shrink-0 ">
						<div className="w-11 h-10 rounded-full bg-base dark:bg-baseDark border border-border dark:border-borderDark flex items-center justify-center">
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
								className="flex-grow dark:!bg-baseDark !text-coolGrey-7 dark:!text-coolGrey-4"
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
									...inputStyles(),
									input: {
										...inputStyles().input,
										fontSize: "1rem",
										border: "none !important",
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
		</section>
	);
};
