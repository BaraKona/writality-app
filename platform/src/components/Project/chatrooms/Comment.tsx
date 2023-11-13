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
				<div className="mt-3 w-10 h-10 rounded-full bg-base dark:bg-baseDark flex items-center justify-center border border-border dark:border-borderDark">
					<div
						className={`font-bold truncate -mt-1 ${initialsColor(
							comment.user.name
						)}`}
					>
						{initials(comment.user.name)}
					</div>
				</div>
			</div>
			<div className="flex flex-col space-y-2 bg-base dark:bg-baseDark border border-border dark:border-borderDark rounded-md grow p-5">
				<div className="flex flex-col space-y-2">
					<div className="flex items-center gap-3">
						<div className="font-semibold text-coolGrey-7 dark:text-coolGrey-4">
							{comment.user.name}
						</div>
						<div className="text-xs text-orange-700 dark:text-orange-400">
							&middot;{useTimeFromNow(comment.date)}
						</div>
					</div>
					<div className="text-sm text-coolGrey-5 text-blue">
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
