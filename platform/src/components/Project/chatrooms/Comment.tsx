import { FC } from "react";
import { useTimeFromNow } from "../../../hooks/useTimeFromNow";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { initials, initialsColor } from "../../../utils/userIcons";
import { IChat } from "../../../interfaces/IChat";
import { useNavigate } from "react-router-dom";

export const Comment: FC<{
	comment: IChat["comments"][0];
	connect: boolean;
}> = ({ comment, connect }) => {
	const navigate = useNavigate();

	return (
		<div className={`flex gap-3 ${connect ? "" : "mb-2"}`}>
			<div className="relative">
				<div className="mt-3 w-10 h-10 rounded-full bg-base dark:bg-baseDark flex items-center justify-center border border-border dark:border-borderDark">
					<div
						className={`font-bold truncate -mt-1 ${initialsColor(
							comment.user.name
						)}`}
					>
						{initials(comment.user.name)}
					</div>
				</div>
				{connect && (
					<div className="w-[1px] bg-border dark:bg-borderDark h-16 right-0 mx-auto left-0 absolute" />
				)}
			</div>
			<div className="flex flex-col space-y-2 bg-base dark:bg-baseDark border border-border dark:border-borderDark rounded-lg grow p-5">
				<div className="flex flex-col space-y-2">
					<div className="flex items-center gap-3">
						<div
							className="font-semibold text-coolGrey-7 dark:text-coolGrey-4 hover:underline cursor-pointer"
							onClick={() => navigate(`/users/${comment.user.uid}`)}
						>
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
