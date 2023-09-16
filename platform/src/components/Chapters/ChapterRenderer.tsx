import { FC, ReactNode, useEffect, useState } from "react";
import {
	Button,
	Divider,
	Menu,
	ScrollArea,
	Skeleton,
	TextInput,
} from "@mantine/core";
import { IconFilePlus, IconFiles, IconFolderPlus } from "@tabler/icons-react";
import { CreateChapterButton } from "../buttons";
import { inputStyles } from "../../styles/inputStyles";

export const ChapterRenderer: FC<{
	children: ReactNode;
	chapterCount: number;
	isLoading: boolean;
	createNewChapter: () => void;
	createNewFolder: (name: string) => void;
}> = ({
	children,
	chapterCount,
	createNewChapter,
	isLoading,
	createNewFolder,
}) => {
	const [name, setName] = useState<string>("");

	return (
		<div className="row-span-3 col-span-6 bg-base rounded-normal border border-border overflow-auto">
			<div className="flex gap-2 ml-2 font-medium items-center">
				<IconFiles size={18} />
				{isLoading ? (
					<Skeleton width={100} height={20} />
				) : (
					<h3 className=" flex text-xs gap-1">
						Chapters <span className=" ml-2">{chapterCount}</span>
					</h3>
				)}

				<div className="ml-auto mr-1 flex gap-2">
					<CreateChapterButton
						createNewChapter={createNewChapter}
						text="New Chapter"
						icon={<IconFilePlus size={18} />}
					/>
					<Menu shadow="md" width={200}>
						<Menu.Target>
							<button>
								<CreateChapterButton
									createNewChapter={() => {}}
									text="New Folder"
									icon={<IconFolderPlus size={18} />}
								/>
							</button>
						</Menu.Target>
						<Menu.Dropdown>
							<form
								onSubmit={(e) => {
									e.preventDefault(), createNewFolder(name);
								}}
							>
								<Menu.Label className="flex justify-between items-center">
									Folder Name
								</Menu.Label>
								<TextInput
									styles={inputStyles}
									className="px-2"
									onChange={(e) => setName(e.target.value)}
									error={name.length < 1}
								/>
							</form>
						</Menu.Dropdown>
					</Menu>
				</div>
			</div>
			<Divider color="grey.0" />
			{/* <ScrollArea className="" offsetScrollbars scrollbarSize={6}> */}
			{children}
			{/* </ScrollArea> */}
		</div>
	);
};
