import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { initials, initialsColor } from "../../utils/userIcons";
import { SmallText } from "../../components/texts/SmallText";

export const PostComment: FC<{
	comment: IPost["comments"][0];
	owner?: string;
}> = ({ comment, owner }) => {
	const isOwner = comment?.owner._id === owner;

	return (
		<div className="flex gap-2 mb-2 grow-1">
			<div className="w-14 h-14 rounded-full !bg-coolGrey-2/70 dark:!bg-coolGrey-5/70 dark:bg-borderDark flex items-center justify-center border-[10px] dark:border-baseDark border-base shrink-0">
				<div
					className={`text-base font-bold truncate -mt-1 ${initialsColor(
						comment?.owner.name
					)}`}
				>
					{initials(comment?.owner.name)}
				</div>
			</div>
			<div className="flex-col flex mt-2 ">
				<div className="flex gap-2">
					{isOwner && <SmallText className="text-pink-500">[Owner]</SmallText>}
					<SmallText className="text-coolGrey-7 dark:text-coolGrey-3">
						{comment?.owner.name}
					</SmallText>
					<SmallText className="!text-cyan-700 dark:text-coolGrey-5">
						{useTimeFromNow(comment?.dateCreated.toString())}
					</SmallText>
				</div>
				<p className="text-sm">{comment?.content}</p>
			</div>
		</div>
	);
};