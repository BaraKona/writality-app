import { FC, ReactNode } from "react";
import { Text, List, Divider, ThemeIcon, ActionIcon } from "@mantine/core";
import { IconGitCompare, IconInfoSquare } from "@tabler/icons-react";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { removeConflict } from "../../utils/removeConflict";
import { removeMergeGreen } from "../../utils/removeMergeGreen";

export const AdvancedMergeSidebar: FC<{
	currentContent: IChapterVersion;
	editor: any;
}> = ({ currentContent, editor }) => {
	const Red: FC<{ children: ReactNode }> = ({ children }) => (
		<span style={{ color: "#e64980" }}>{children}</span>
	);
	const Green: FC<{ children: ReactNode }> = ({ children }) => (
		<span style={{ color: "#00b894" }}>{children}</span>
	);
	return (
		<div className="max-w-md pl-5 text-coolGrey-7">
			<Text align="center" className="text-coolGrey-7">
				You are merging the{" "}
				<span className="text-blue-400 font-bold ">[branch]</span>{" "}
				<u>{currentContent?.name}</u> into <u>Main</u>.
			</Text>
			<Divider my="xs" className="!border-coolGrey-1 dark:!border-borderDark" />
			<List
				spacing="xs"
				size="sm"
				className="text-coolGrey-7"
				center
				icon={
					<ThemeIcon color="cyan" size={24} radius="sm">
						<IconInfoSquare size={18} />
					</ThemeIcon>
				}
			>
				<List.Item>
					This merge menu will help you resolve any conflicts that may exist
					between the branch and main, allowing you greater control over the
					merge process.
				</List.Item>
				<List.Item>
					This menu is intended for branches where the main has been edited
					since the branch was created as well as where the branch has been
					edited since the main was last edited.
				</List.Item>
				<List.Item
					icon={
						<ThemeIcon color="red" size={24} radius="sm">
							<IconInfoSquare size={18} />
						</ThemeIcon>
					}
				>
					This menu is <span className="bold underline">not</span> intended for
					branches that are completely removed from the main, for that use the
					regular merge menu.
				</List.Item>
			</List>

			<Divider my="xs" className="!border-coolGrey-1 dark:!border-borderDark" />
			<List
				spacing="xs"
				size="sm"
				className="text-coolGrey-7"
				center
				icon={
					<ThemeIcon color="cyan" size={24} radius="sm">
						<IconInfoSquare size={18} />
					</ThemeIcon>
				}
			>
				<List.Item>
					Text highlighted in <Red>red</Red> with a <s>strikethrough</s> are
					changes that exist within main, but have been removed from the branch{" "}
				</List.Item>
				<List.Item>
					Text highlighted in <Green>green</Green> is text that has been added{" "}
				</List.Item>
				<List.Item>
					You can change and edit the text to your liking, and then replace the
					main text with the new text
				</List.Item>
				<List.Item>
					Remove any text that you do not want to keep, and add any text that
					you want to keep
				</List.Item>
				<List.Item>
					Once done, remove any styling that is still persistent before Merging
				</List.Item>
			</List>
			<Divider my="xs" className="!border-coolGrey-1 dark:!border-borderDark" />
			<Text size="sm" className="mb-2">
				Resolve conflicts by clicking the buttons below or by editing the text
				directly
			</Text>
			<List spacing="xs" size="sm" center className="text-coolGrey-7">
				<List.Item>
					<div className="flex gap-1">
						<ActionIcon
							variant="outline"
							color="red"
							size={20}
							onClick={() => {
								{
									editor?.commands.setContent(
										removeConflict(editor?.getHTML())
									);
								}
							}}
						>
							<IconGitCompare size={12} />
						</ActionIcon>
						<Text>
							Delete everything marked <Red>Red</Red>
						</Text>
					</div>
				</List.Item>
				<List.Item>
					<div className="flex gap-1 ">
						<ActionIcon
							variant="outline"
							color="green"
							size={20}
							onClick={() => {
								editor?.commands.setContent(
									removeMergeGreen(editor?.getHTML())
								),
									console.log(editor?.getHTML());
							}}
						>
							<IconGitCompare size={12} />
						</ActionIcon>
						<Text>
							Remove <Green>Green</Green> markers
						</Text>
					</div>
				</List.Item>
			</List>

			{/** NB */}
			<Divider my="xs" className="!border-coolGrey-1 dark:!border-borderDark" />
			<List
				spacing="xs"
				size="sm"
				center
				className="text-coolGrey-7"
				icon={
					<ThemeIcon color="red" size={24} radius="sm">
						<IconInfoSquare size={18} />
					</ThemeIcon>
				}
			>
				<List.Item>
					To undo any changes, click the undo button in the top left corner.
					Alternatively you can click <Green>Ctrl + Z</Green> on your keyboard
					for windows and <Green>Cmd + Z</Green> on your keyboard for Mac
				</List.Item>
			</List>
		</div>
	);
};
