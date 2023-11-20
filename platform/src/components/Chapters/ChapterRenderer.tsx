import { FC, ReactNode, useState } from "react";
import { Divider, Menu, Skeleton, TextInput, Tooltip } from "@mantine/core";
import { IconFilePlus, IconFiles, IconFolderPlus } from "@tabler/icons-react";
import { inputStyles } from "../../styles/inputStyles";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { IProject } from "../../interfaces/IProject";
import { useThemeContext } from "../../Providers/ThemeProvider";

export const ChapterRenderer: FC<{
	children: ReactNode;
	chapterCount: number;
	project: IProject;
	isLoading: boolean;
	createNewChapter: () => void;
	createNewFolder: (name: string) => void;
}> = ({
	children,
	chapterCount,
	createNewChapter,
	isLoading,
	createNewFolder,
	project,
}) => {
	const [name, setName] = useState<string>("");

	const { theme } = useThemeContext();

	return (
		<div className="row-span-6 col-span-6 rounded-lg border border-border dark:border-borderDark">
			<div className="flex gap-2 ml-2 font-medium items-center dark:text-coolGrey-4 p-1.5">
				<IconFiles size={18} />
				{isLoading ? (
					<Skeleton width={100} height={20} />
				) : (
					<h3 className=" flex text-xs gap-1">
						Chapters <span className=" ml-2">{chapterCount}</span>
					</h3>
				)}

				<div className="ml-auto mr-1 flex gap-1">
					<Tooltip
						label="Create chapter"
						position="top"
						withArrow
						styles={tooltipStyles}
					>
						<button
							className="p-1.5 rounded-md cursor-pointer hover:bg-coolGrey-1 dark:hover:bg-hoverDark"
							onClick={createNewChapter}
						>
							<IconFilePlus size={18} />
						</button>
					</Tooltip>
					<Menu shadow="md" width={200}>
						<Menu.Target>
							<Tooltip
								label="Create new folder"
								position="top"
								withArrow
								styles={tooltipStyles}
							>
								<button className="p-1.5 rounded-md cursor-pointer hover:bg-coolGrey-1 dark:hover:bg-hoverDark">
									<IconFolderPlus size={18} />
								</button>
							</Tooltip>
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
									styles={inputStyles()}
									className="px-2"
									onChange={(e) => setName(e.target.value)}
									error={name.length < 1}
								/>
							</form>
						</Menu.Dropdown>
					</Menu>
					{/* <Tooltip
						label="Collapse folders"
						position="top"
						withArrow
						styles={tooltipStyles}
					>
						<button
							className="p-1.5 rounded-md cursor-pointer hover:bg-coolGrey-1 dark:hover:bg-hoverDark"
							onClick={() => closeAllFolders()}
						>
							<IconFolders size={18} />
						</button>
					</Tooltip> */}
				</div>
			</div>
			<Divider
				className="
				!border-coolGrey-1 dark:!border-borderDark"
			/>
			{children}
		</div>
	);
};
