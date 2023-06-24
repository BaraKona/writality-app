import {
	Button,
	Input,
	Modal,
	TextInput,
	useMantineTheme,
	TypographyStylesProvider,
} from "@mantine/core";
import React, { FC } from "react";
import { IconTrash, IconReplace } from "@tabler/icons";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { CancelButton } from "../buttons/CancelButton";
import { CreateChapterButton } from "../buttons";
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
				styles={{
					content: {
						background: "#fff",
						border: "1px solid #394251",
					},
					header: {
						background: "#fff",
						borderBottom: "1px solid #394251",
					},
				}}
				scrollAreaComponent={Modal.NativeScrollArea}
				onClose={() => setOpened(false)}
				title="Version"
			>
				<div className="flex flex-wrap mx-auto text-blueText">
					<div className="px-5 border-r border-baseBorder grow shrink w-1/2 mx-auto">
						<h2 className="text-blue-400 font-bold text-lg my-2">
							{currentContent?.name || "Main"}
						</h2>
						<TypographyStylesProvider>
							<div
								className="h-[calc(100vh-300px)] min-w-[300px] overflow-y-auto text-blueText"
								dangerouslySetInnerHTML={{ __html: currentContent?.content }}
							/>
						</TypographyStylesProvider>
					</div>
					<div className="px-5 border-l border-baseBorder grow shrink w-1/2 mx-auto">
						<h2 className="text-blue-400 font-bold text-lg my-2">
							{version?.name}
						</h2>
						<TypographyStylesProvider>
							<div
								className="h-[calc(100vh-300px)] min-w-[300px] overflow-y-auto text-blueText"
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
