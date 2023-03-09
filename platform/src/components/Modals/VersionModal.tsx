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
				size="calc(100vw - 20%)"
				opened={opened}
				overlayColor={
					theme.colorScheme === "dark"
						? theme.colors.dark[9]
						: theme.colors.gray[2]
				}
				styles={{
					modal: { backgroundColor: "#1b1c25", border: "solid 1px #363130" },
				}}
				overlayOpacity={0.55}
				overlayBlur={3}
				onClose={() => setOpened(false)}
				title="Version"
			>
				<div className="flex flex-wrap max-w-[1600px] mx-auto">
					<div className="px-5 border-r border-baseBorder grow shrink max-w-2xl mx-auto">
						<h2 className="text-blue-400 font-bold text-lg my-2">
							{currentContent?.name || "Main"}
						</h2>
						<TypographyStylesProvider>
							<div
								className="h-[calc(100vh-300px)] min-w-[300px] overflow-y-auto"
								dangerouslySetInnerHTML={{ __html: currentContent?.content }}
							/>
						</TypographyStylesProvider>
					</div>
					<div className="px-5 border-l border-baseBorder grow shrink max-w-2xl mx-auto">
						<h2 className="text-blue-400 font-bold text-lg my-2">
							{version?.name}
						</h2>
						<TypographyStylesProvider>
							<div
								className="h-[calc(100vh-300px)] min-w-[300px] overflow-y-auto"
								dangerouslySetInnerHTML={{ __html: version?.content }}
							/>
						</TypographyStylesProvider>
					</div>
				</div>
				<div className="mt-5 flex">
					<Button
						variant="light"
						color="green"
						className="mr-auto"
						leftIcon={<IconReplace size={14} />}
						onClick={() => {
							editor.commands.setContent(version.content), setOpened(false);
						}}
					>
						Replace
					</Button>
					<Button
						variant="light"
						color="red"
						leftIcon={<IconTrash size={14} />}
						onClick={deleteVersion}
					>
						Delete
					</Button>
					<Button color="gray" onClick={() => setOpened(false)}>
						Cancel
					</Button>
				</div>
			</Modal>
		</>
	);
};
