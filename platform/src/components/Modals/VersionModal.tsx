import {
	Button,
	Input,
	Modal,
	TextInput,
	useMantineTheme,
	TypographyStylesProvider,
} from "@mantine/core";
import React, { FC } from "react";
import { IconTrash, IconReplace } from "@tabler/icons-react";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { CancelButton } from "../buttons/CancelButton";
import { CreateChapterButton } from "../buttons";
import { inputStyles } from "../../styles/inputStyles";
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
		},
		[version?.content]
	);

	const editor2 = useBlockNote(
		{
			initialContent: currentContent?.content
				? JSON.parse(currentContent?.content)
				: null,
			editable: false,
		},
		[currentContent?.content]
	);

	if (!version) {
		return null;
	}
	return (
		<>
			<Modal
				size="65rem"
				opened={opened}
				overlayProps={{
					opacity: 0.55,
					blur: 3,
				}}
				styles={() => modalStyles(theme)}
				scrollAreaComponent={Modal.NativeScrollArea}
				onClose={() => setOpened(false)}
				className="text-coolGrey-7 text-sm dark:text-coolGrey-4 dark:!bg-baseDark"
				title="Version"
			>
				<div className="flex flex-wrap mx-auto text-coolGrey-7 dark:text-coolGrey-4">
					<div className="px-5 border-r border-border dark:border-borderDark grow shrink w-1/2 mx-auto">
						<h2 className="text-gray-700 font-medium underline text-md my-2">
							{currentContent?.title || "Main"}
						</h2>
						<div className="h-[calc(100vh-300px)] min-w-[300px] overflow-y-auto text-coolGrey-7 text-xs px-3">
							<BlockNoteView editor={editor2} />
						</div>
					</div>
					<div className="px-5 border-l border-border dark:border-borderDark  grow shrink w-1/2 mx-auto">
						<h2 className="text-gray-700 font-medium underline text-md my-2 dark:text-coolGrey-4">
							{version?.title || version.name}
						</h2>
						<div className="h-[calc(100vh-300px)] min-w-[300px] overflow-y-auto text-coolGrey-7 dark:text-coolGrey-4 text-xs px-3">
							<BlockNoteView editor={editor} className="!px-0" />
						</div>
					</div>
				</div>
				<div className="mt-5 flex">
					<div className="mr-auto">
						<CreateChapterButton
							icon={<IconReplace size={14} />}
							text="Replace"
							createNewChapter={() => {
								setText(version?.content as string);
								setOpened(false);
							}}
						/>
					</div>
					<Button
						variant="light"
						color="red"
						leftIcon={<IconTrash size={14} />}
						onClick={deleteVersion}
					>
						Delete
					</Button>
					<CancelButton onClick={() => setOpened(false)} />
				</div>
			</Modal>
		</>
	);
};
