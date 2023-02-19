import { Button, Modal, useMantineTheme } from "@mantine/core";
import React, { FC, useEffect } from "react";
import { AdvancedMergeSidebar } from "../Merge/AdvancedMergeSidebar";
import { IconGitMerge } from "@tabler/icons";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { advancedMerge } from "../../utils/advancedMerge";

import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import TextStyle from "@tiptap/extension-text-style";
import SubScript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";
import { BaseEditor } from "../Editor";
import { useEditor } from "@tiptap/react";
import CharacterCount from "@tiptap/extension-character-count";
import { extensions } from "../Editor/utils/editorExtensions";

export const AdvancedMergeModal: FC<{
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
	main: IChapterVersion;
	setText: React.Dispatch<React.SetStateAction<string>>;
	currentContent: IChapterVersion;
	mergeBranch: (content: string) => void;
}> = ({ opened, setOpened, main, currentContent, setText, mergeBranch }) => {
	const theme = useMantineTheme();
	const editor = useEditor({
		extensions,
	});
	if (!main || !currentContent) {
		return null;
	}

	useEffect(() => {
		editor?.commands.setContent(
			advancedMerge(main.content, currentContent.content)
		);
	}, [main, currentContent, editor]);
	return (
		<>
			<Modal
				size="100"
				opened={opened}
				closeOnClickOutside={false}
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
				title="Advanced Merge"
			>
				<div className="flex flex-wrap max-w-[1600px] gap-3">
					<div className=" border-r border-baseBorder grow shrink max-w-2xl overflow-y-auto ">
						<BaseEditor editor={editor} height="650px" />
					</div>
					<AdvancedMergeSidebar
						currentContent={currentContent}
						editor={editor}
					/>
				</div>
				<div className="mt-5 flex justify-end gap-2">
					<Button color="gray" onClick={() => setOpened(false)}>
						Cancel
					</Button>
					<Button
						variant="light"
						color="green"
						leftIcon={<IconGitMerge size={18} />}
						onClick={() => mergeBranch(editor?.getHTML() || "")}
					>
						Merge
					</Button>
				</div>
			</Modal>
		</>
	);
};
