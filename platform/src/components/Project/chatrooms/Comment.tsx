import { FC, ReactNode } from "react";
import { useTimeFromNow } from "../../../hooks/useTimeFromNow";
import { useAuthContext } from "../../../contexts/AuthContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export const Comment: FC<{
	previousComment: {
		uid: string;
		content: string;
		date: Date;
		user: string;
	} | null;
	comment: { uid: string; content: string; date: Date; user: string };
	key: any;
}> = ({ comment, key, previousComment }) => {
	const { currentUser } = useAuthContext();
	return (
		<div className="flex flex-col space-y-2" key={key}>
			{previousComment?.user !== comment.user && (
				<div className="flex items-center space-x-2">
					<div className="w-7 h-7 rounded-normal bg-blueText"></div>
					<div className="flex flex-col">
						<div className="font-medium text-sm">User</div>
						<div className="text-xs text-gray-400">
							{useTimeFromNow(comment.date.toString())}
						</div>
					</div>
				</div>
			)}
			<div className="flex flex-col space-y-2 ml-4">
				<div className="text-xs font-medium text-blueText text-blue">
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						children={comment.content}
					/>
				</div>
			</div>
		</div>
	);
};
