import { Modal } from "@mantine/core";
import React, { FC } from "react";
import { IconTrash, IconReplace } from "@tabler/icons-react";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { CreateChapterButton } from "../buttons";
import { modalStyles } from "../../styles/modalStyles";
import { useBlockNote, BlockNoteView } from "@blocknote/react";
import { useThemeContext } from "../../Providers/ThemeProvider";

export const VersionModal: FC<{
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
	deleteVersion: () => void;
	version: IChapterVersion;
	setText: React.Dispatch<React.SetStateAction<string>>;
	currentContent: IChapterVersion;
}> = ({
	opened,
	setOpened,
	deleteVersion,
	version,
	currentContent,
	setText,
}) => {
	const { theme } = useThemeContext();
	const editor = useBlockNote(
		{
			initialContent: version?.content ? JSON.parse(version?.content) : null,
			editable: false,
			domAttributes: {
				blockContainer: {
					class: "text-sm -mx-16 !pr-2 dark:!text-coolGrey-4 !text-coolGrey-6",
				},
				editor: {
					class: "dark:!bg-transparent !bg-base",
				},
			},
		},
		[version?.content]
	);

	const editor2 = useBlockNote(
		{
			initialContent: currentContent?.content
				? JSON.parse(currentContent?.content)
				: null,
			editable: false,
			domAttributes: {
				blockContainer: {
					class: "text-sm -mx-16 !pr-2 dark:!text-coolGrey-4 !text-coolGrey-6",
				},
				editor: {
					class: "dark:!bg-transparent !bg-base",
				},
			},
		},
		[currentContent?.content]
	);

	if (!version) {
		return null;
	}
	return (
		<>
			<Modal
				size="100rem"
				opened={opened}
				overlayProps={{
					opacity: 0.55,
					blur: 3,
				}}
				styles={() => modalStyles(theme)}
				scrollAreaComponent={Modal.NativeScrollArea}
				onClose={() => setOpened(false)}
				className="text-coolGrey-7 text-sm dark:!text-coolGrey-4 dark:!bg-baseDark !rounded-lg"
				title="Version"
			>
				<div className="flex flex-wrap mx-auto text-coolGrey-7 dark:text-coolGrey-4">
					<div className="px-5 border-r border-border dark:border-borderDark grow shrink w-1/2 mx-auto">
						<h2 className="text-gray-700 font-medium text-md my-2 dark:text-coolGrey-4">
							{"[Main] " + currentContent?.title}
						</h2>
						<div className="h-[calc(100dvh-300px)] min-w-[300px] overflow-y-auto text-coolGrey-7 text-xs px-3">
							<BlockNoteView editor={editor2} />
						</div>
					</div>
					<div className="px-5 border-l border-border dark:border-borderDark  grow shrink w-1/2 mx-auto">
						<h2 className="text-gray-700 font-medium text-md my-2 dark:text-coolGrey-4">
							[Version] {version?.title || version.name}
						</h2>
						<div className="h-[calc(100dvh-300px)] min-w-[300px] overflow-y-auto text-coolGrey-7 dark:text-coolGrey-4 text-xs px-3">
							<BlockNoteView editor={editor} className="!px-0" />
						</div>
					</div>
				</div>
				<div className="mt-5 flex">
					<button
						className="ml-auto p-1.5 rounded-md cursor-pointer hover:bg-coolGrey-1 dark:hover:bg-hoverDark mr-2"
						onClick={deleteVersion}
					>
						<IconTrash size={18} />
					</button>
					<button
						className="p-1.5 rounded-md cursor-pointer hover:bg-coolGrey-1 dark:hover:bg-hoverDark gap-2 flex"
						onClick={() => {
							setText(version?.content as string);
							setOpened(false);
						}}
					>
						<IconReplace size={18} />
					</button>
				</div>
			</Modal>
		</>
	);
};
