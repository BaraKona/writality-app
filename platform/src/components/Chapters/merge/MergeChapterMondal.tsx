import { Modal, useMantineTheme, Space } from "@mantine/core";
import React, { FC } from "react";
import { modalStyles } from "../../../styles/modalStyles";
import { IChapterVersion } from "../../../interfaces/IChapterVersion";
import { BlueButton } from "../../buttons/BlueButton";
import { IconGitMerge } from "@tabler/icons-react";
import { useThemeContext } from "../../../Providers/ThemeProvider";

export const MergeBranchModal: FC<{
	opened: boolean;
	setMergeOpened: React.Dispatch<React.SetStateAction<boolean>>;
	mergeBranch: () => void;
	currentBranch: IChapterVersion;
}> = ({ opened, setMergeOpened, currentBranch, mergeBranch }) => {
	const { theme } = useThemeContext();

	return (
		<>
			<Modal
				size="lg"
				opened={opened}
				styles={() => modalStyles(theme)}
				className="text-coolGrey-7 text-sm"
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
				<Space h="md" />
				<BlueButton onClick={mergeBranch}>
					<IconGitMerge size={18} className="mr-2" /> Merge branch content into
					main
				</BlueButton>
			</Modal>
		</>
	);
};
