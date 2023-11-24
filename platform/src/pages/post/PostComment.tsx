import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { initials, initialsColor } from "../../utils/userIcons";
import { SmallText } from "../../components/texts/SmallText";
import { useNavigate } from "react-router-dom";

export const PostComment: FC<{
	comment: IPost["comments"][0];
	owner?: string;
}> = ({ comment, owner }) => {
	const isOwner = comment?.owner._id === owner;
	const navigate = useNavigate();
	return (
		<div className="flex gap-2 mb-2 grow-1 dark:bg-hoverDark/40 rounded-lg p-1 bg-coolGrey-1 pr-4">
			<div className="w-12 h-12 rounded-full !bg-coolGrey-2/70 dark:!bg-coolGrey-5/70 dark:bg-borderDark flex items-center justify-center border-[5px] dark:border-baseDark border-base shrink-0">
				<div
					className={`text-base font-bold truncate -mt-1 ${initialsColor(
						comment?.owner.name
					)}`}
				>
					{initials(comment?.owner.name)}
				</div>
			</div>
			<div className="flex-col flex mt-2 w-full">
				<div className="flex gap-2">
					{isOwner && <SmallText className="text-pink-500">[Owner]</SmallText>}
					<SmallText
						className="text-coolGrey-7 dark:text-coolGrey-3 hover:underline cursor-pointer"
						onClick={() => navigate(`/users/${comment?.owner.uid}`)}
					>
						{comment?.owner.name}
					</SmallText>
					<SmallText className="!text-cyan-700 ml-auto">
						{useTimeFromNow(comment?.dateCreated.toString())}
					</SmallText>
				</div>
				<p className="text-sm">{comment?.content}</p>
			</div>
		</div>
	);
};
