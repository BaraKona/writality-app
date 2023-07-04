import { FC, ReactNode } from "react";
import { CreateChapterButton } from "../buttons";
import { Divider } from "@mantine/core";
import { IconBook, IconFilePlus } from "@tabler/icons";
import { type } from "os";
import { IconRenderer } from "../IconRenderer";

export const ChapterWrapper: FC<{
	children: ReactNode;
	title: string;
	createNewChapter: () => void;
	updateProjectTitle: (title: string) => void;
	type: "standard" | "collaboration";
}> = ({ children, createNewChapter, title, updateProjectTitle, type }) => {
	return (
		<div className="flex flex-col bg-white px-7 h-[calc(100vh-48px)] gap-2 rounded-t-md">
			<div className=" flex font-medium gap-2 bg-white text-blueText pt-6 items-center">
				<IconRenderer type={type} open={true} />
				<input
					key={title}
					type="text"
					onBlur={(e) =>
						title !== e.target.value ? updateProjectTitle(e.target.value) : null
					}
					placeholder={title}
					style={{
						width: title.length > 0 ? `${title.length + 1}ch` : "10rem",
					}}
					defaultValue={title}
					className={
						"text-blueText font-medium text-xs p-0 bg-transparent border-none focus:ring-0 items-center "
					}
				/>
				<div className="ml-auto">
					<CreateChapterButton
						createNewChapter={createNewChapter}
						text="New Chapter"
						icon={<IconFilePlus size={20} />}
					/>
				</div>
			</div>
			<Divider className=" border-gray-200" />
			<div className="flex">{children}</div>
		</div>
	);
};
