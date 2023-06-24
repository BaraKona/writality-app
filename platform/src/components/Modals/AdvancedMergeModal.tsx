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
					title: {
						color: "#394251",
					},
				}}
				scrollAreaComponent={Modal.NativeScrollArea}
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
