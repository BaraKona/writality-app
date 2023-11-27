import React, { FC, SetStateAction } from "react";
import { ChapterVersions } from "./ChapterVersions";
import { Divider } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";
import { IChapterVersion } from "../../../interfaces/IChapterVersion";
import { useParams } from "react-router-dom";
import { ButtonWrapper } from "../../buttons/ButtonWrapper";
import { ChapterSidebarWrapper } from "../ChapterSidebarWrapper";
import { useCreateChapterVersion } from "../../../hooks/chapter/useCreateChapterVersion";

export const ChapterVersionMenu: FC<{
	setOpen: React.Dispatch<SetStateAction<boolean>>;
	setVersion: (version: IChapterVersion) => void;
	close: () => void;
	active: boolean;
}> = ({ setOpen, setVersion, close, active }) => {
	const { project, chapter } = useParams();

	const { mutate: createVersion } = useCreateChapterVersion(
		chapter as string,
		project as string
	);

	return (
		<div
			className={`${
				active ? "" : "hidden"
			} transition-all ease-in-out duration-500`}
		>
			<ChapterSidebarWrapper>
				<div className="flex font-medium my-2 px-2 text-coolGrey-7 gap-2 text-xs items-center dark:text-coolGrey-4">
					Versions
					<ButtonWrapper className="ml-auto" onClick={createVersion}>
						<IconPlus
							size={14}
							className="text-coolGrey-4 dark:text-coolGrey-6 group-hover:text-black dark:hover:text-coolGrey-1"
						/>
					</ButtonWrapper>
					<ButtonWrapper onClick={close}>
						<IconX
							size={14}
							className="text-coolGrey-4 dark:text-coolGrey-6 group-hover:text-black dark:hover:text-coolGrey-1"
						/>
					</ButtonWrapper>
				</div>
				<Divider className="!border-coolGrey-1 dark:!border-borderDark" />
				{active && (
					<ChapterVersions setOpen={setOpen} setVersion={setVersion} />
				)}
			</ChapterSidebarWrapper>
		</div>
	);
};
