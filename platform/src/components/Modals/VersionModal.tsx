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
export const VersionModal: FC<{
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
	deleteVersion: () => void;
	version: IChapterVersion;
	setText: React.Dispatch<React.SetStateAction<string>>;
	currentContent: IChapterVersion;
	editor: any;
}> = ({
	opened,
	setOpened,
	deleteVersion,
	version,
	currentContent,
	setText,
	editor,
}) => {
	const theme = useMantineTheme();

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
				styles={modalStyles}
				scrollAreaComponent={Modal.NativeScrollArea}
				onClose={() => setOpened(false)}
				className="text-blueText text-sm"
				title="Version"
			>
				<div className="flex flex-wrap mx-auto text-blueText">
					<div className="px-5 border-r border-border grow shrink w-1/2 mx-auto">
						<h2 className="text-gray-700 font-medium underline text-md my-2">
							{currentContent?.name || "Main"}
						</h2>
						<TypographyStylesProvider>
							<div
								className="h-[calc(100vh-300px)] min-w-[300px] overflow-y-auto text-blueText text-xs px-3"
								dangerouslySetInnerHTML={{ __html: currentContent?.content }}
							/>
						</TypographyStylesProvider>
					</div>
					<div className="px-5 border-l border-border grow shrink w-1/2 mx-auto">
						<h2 className="text-gray-700 font-medium underline text-md my-2">
							{version?.name}
						</h2>
						<TypographyStylesProvider>
							<div
								className="h-[calc(100vh-300px)] min-w-[300px] overflow-y-auto text-blueText text-xs px-3"
								dangerouslySetInnerHTML={{ __html: version?.content }}
							/>
						</TypographyStylesProvider>
					</div>
				</div>
				<div className="mt-5 flex">
					<div className="mr-auto">
						<CreateChapterButton
							icon={<IconReplace size={14} />}
							text="Replace"
							createNewChapter={() => {
								editor.commands.setContent(version.content), setOpened(false);
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
