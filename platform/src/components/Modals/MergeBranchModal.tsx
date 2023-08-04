import {
	Button,
	Input,
	Modal,
	TextInput,
	useMantineTheme,
	Select,
	Space,
} from "@mantine/core";
import React, { FC, useState } from "react";
import { VscGitMerge, VscGitCompare } from "react-icons/vsc";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { IChapterContent } from "../../interfaces/IChapterContent";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { modalStyles } from "../../styles/modalStyles";
import { BlueButton } from "../buttons/BlueButton";
import { inputStyles } from "../../styles/inputStyles";
import { ButtonWrapper } from "../buttons/ButtonWrapper";

export const MergeBranchModal: FC<{
	mergeOpened: boolean;
	setMergeOpened: React.Dispatch<React.SetStateAction<boolean>>;
	mergeBranch: () => void;
	replaceMain: (content: string) => void;
	currentBranch: IChapterVersion;
	setPosition: React.Dispatch<React.SetStateAction<string | null>>;
	position: string;
	openAdvancedMerge: () => void;
}> = ({
	mergeOpened,
	setMergeOpened,
	mergeBranch,
	replaceMain,
	currentBranch,
	setPosition,
	position,
	openAdvancedMerge,
}) => {
	const theme = useMantineTheme();

	const selectionData = [
		{ label: "Merge at top", value: "before" },
		{ label: "Merge at bottom", value: "after" },
	];
	return (
		<>
			<Modal
				size="lg"
				opened={mergeOpened}
				overlayProps={{
					color:
						theme.colorScheme === "dark"
							? theme.colors.dark[9]
							: theme.colors.gray[2],
					opacity: 0.55,
					blur: 3,
				}}
				styles={modalStyles}
				className="text-blueText text-sm"
				scrollAreaComponent={Modal.NativeScrollArea}
				onClose={() => setMergeOpened(false)}
				title={`Merging ${currentBranch?.name} into main 🤝`}
			>
				<p className="text-xs mb-3">
					Merging{" "}
					<span className="text-gray-400 underline">{currentBranch?.name}</span>{" "}
					into <span className="text-gray-400 underline">main</span> will
					replace the main content of your chapter with that of{" "}
					{currentBranch?.name}. However, do not worry. A copy of your current
					main will be saved in case you ever want to go back!
					<br />
					<br />
					<span className="text-gray-400 underline">Note:</span> Merging
					branches will not delete the branch. You can always go back to it
					later. However, if you want to delete the branch, you can do so in the
					branch manager.
				</p>
				<BlueButton onClick={() => replaceMain(currentBranch?.content)}>
					<VscGitMerge size={18} /> Replace Main
				</BlueButton>
				<Space h="md" />
				<BlueButton onClick={openAdvancedMerge}>
					<VscGitCompare size={18} /> Advanced Merge
				</BlueButton>
				<div className="my-5 flex gap-2">
					<Select
						placeholder="Merge into Main"
						data={selectionData}
						clearable
						className="basis-[100rem]"
						value={position}
						onChange={setPosition}
						color="orange"
						styles={inputStyles}
					/>
					<BlueButton onClick={mergeBranch}>
						<VscGitMerge size={18} />
					</BlueButton>
				</div>
			</Modal>
		</>
	);
};
