import { FC } from "react";
import { SmallText } from "../texts/SmallText";
import { IconFolderFilled } from "@tabler/icons-react";
import { IProject } from "../../interfaces/IProject";

export const FolderListItem: FC<{
	folder: IProject["folders"][0];
	className?: string;
	icon?: React.ReactNode;
	withNumber?: boolean;
}> = ({ className, folder, icon, withNumber }) => {
	return (
		<div
			className={`px-1 py-0.5 hover:bg-coolGrey-1 cursor-pointer ${className}`}
		>
			<SmallText className="flex items-center gap-2">
				<IconFolderFilled size={16} />
				{folder.name}
			</SmallText>
			<div className="flex gap-2 items-center">
				{withNumber && (
					<SmallText className=" text-coolGrey-4">
						{folder.chapterIds?.length}
					</SmallText>
				)}
				{icon}
			</div>
		</div>
	);
};
