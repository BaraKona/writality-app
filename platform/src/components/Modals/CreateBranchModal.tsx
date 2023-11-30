import { Modal, TextInput } from "@mantine/core";
import React, { FC } from "react";
import { IconGitBranch } from "@tabler/icons-react";
import { modalStyles } from "../../styles/modalStyles";
import { inputStyles } from "../../styles/inputStyles";
import { BlueButton } from "../buttons/BlueButton";
import { useThemeContext } from "../../Providers/ThemeProvider";

export const CreateBranchModal: FC<{
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
	createBranch: () => void;
	branchName: string;
	setBranchName: React.Dispatch<React.SetStateAction<string>>;
}> = ({ opened, setOpened, createBranch, branchName, setBranchName }) => {
	const { theme } = useThemeContext();

	return (
		<Modal
			size="lg"
			opened={opened}
			overlayProps={{
				opacity: 0.55,
				blur: 3,
			}}
			className="text-coolGrey-7 text-xs"
			styles={() => modalStyles(theme)}
			scrollAreaComponent={Modal.NativeScrollArea}
			onClose={() => setOpened(false)}
			title="You are about to create a new branch 🤝"
		>
			<p className="text-xs">
				Branching means you diverge from the main line of chapter and continue
				to do work without messing with that main line. This would be
				particularly useful if you're working with other people and are writing
				chapters that need review before being added to the main story. <br />{" "}
				<br />
				Alternatively, if you are feeling particularly experimental, you may
				want to create a branch and try out a chapter idea without changing what
				is already there. If you decide you like this new version better, you
				can replace it!
			</p>
			<div className="mt-5">
				<TextInput
					className="mb-3"
					placeholder="Branch name"
					onChange={(e) => setBranchName(e.currentTarget.value)}
					styles={inputStyles()}
					value={branchName}
					required
				/>
				<BlueButton onClick={createBranch}>
					<IconGitBranch size={18} className="mr-2" />
					Create new branch
				</BlueButton>
			</div>
		</Modal>
	);
};
