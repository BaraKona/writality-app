import { FC, ReactNode } from "react";
import { useTimeFromNow } from "../../../hooks/useTimeFromNow";
import { useAuthContext } from "../../../contexts/AuthContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { initials, initialsColor } from "../../../utils/userIcons";
import { IChat } from "../../../interfaces/IChat";
export const Comment: FC<{
	previousComment: IChat["comments"][0] | null;
	comment: IChat["comments"][0];
}> = ({ comment, previousComment }) => {
	const { currentUser } = useAuthContext();
	return (
		<div className="flex gap-3">
			<div className="">
				<div className="w-10 h-10 rounded-full bg-coolGrey-1/70 dark:bg-borderDark flex items-center justify-center">
					<div
						className={`font-bold truncate -mt-1 ${initialsColor(
							comment.user.name
						)}`}
					>
						{initials(comment.user.name)}
					</div>
				</div>
			</div>
			<div className="flex flex-col space-y-2 border border-border dark:border-borderDark rounded-normal grow p-5">
				<div className="flex flex-col space-y-2">
					<div className="flex items-center gap-3">
						<div className="font-semibold">{comment.user.name}</div>
						<div className="text-sm">
							&middot;{useTimeFromNow(comment.date)}
						</div>
					</div>
					<div className="text-sm font-medium text-coolGrey-7 text-blue">
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							children={comment.content}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
