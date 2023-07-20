import {
	Button,
	Input,
	Modal,
	TextInput,
	useMantineTheme,
} from "@mantine/core";
import React, { FC } from "react";
import { IconTrash } from "@tabler/icons";
import { CreateChapterButton } from "../buttons";
import { CancelButton } from "../buttons/CancelButton";
import { modalStyles } from "../../styles/modalStyles";

export const DeleteModal: FC<{
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
	deleteBranch: () => void;
	type: string;
}> = ({ opened, setOpened, deleteBranch, type }) => {
	const theme = useMantineTheme();
	return (
		<>
			<Modal
				size="lg"
				opened={opened}
				overlayProps={{
					opacity: 0.55,
					blur: 3,
				}}
				className="text-blueText text-xs"
				styles={modalStyles}
				scrollAreaComponent={Modal.NativeScrollArea}
				onClose={() => setOpened(false)}
				title={`Are you sure you want to delete this ${type} ? 🤔`}
			>
				<p className="border-t-stone-800">
					This action is irreversible. If you want to recover this {type}, you
					will have to create a new one. Are you sure you want to delete this{" "}
					{type}?
					{type === ("chapter" || "project") && (
						<>
							<br />
							<br />
							<span className="text-red-500">Warning: </span>Deleting this{" "}
							{type} will also delete all of its Versions, Branches and their
							content.
						</>
					)}
				</p>
				<div className="mt-5 flex gap-2">
					<CreateChapterButton
						text="Delete"
						iconColour="red-500"
						icon={<IconTrash size={14} />}
						createNewChapter={deleteBranch}
					/>
					<CancelButton onClick={() => setOpened(false)} />
				</div>
			</Modal>
		</>
	);
};
