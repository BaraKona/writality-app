import {
	Button,
	Input,
	Modal,
	TextInput,
	useMantineTheme,
} from "@mantine/core";
import React, { FC } from "react";
import { IconTrash } from "@tabler/icons";
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
					color:
						theme.colorScheme === "dark"
							? theme.colors.dark[9]
							: theme.colors.gray[2],
					opacity: 0.55,
					blur: 3,
				}}
				styles={{
					content: {
						background: theme.colorScheme === "dark" ? "#191a23" : "#fff",
						border: "1px solid #363130",
					},
					header: {
						background: theme.colorScheme === "dark" ? "#191a23" : "#fff",
						borderBottom: "1px solid #363130",
					},
				}}
				scrollAreaComponent={Modal.NativeScrollArea}
				onClose={() => setOpened(false)}
				title={`Are you sure you want to delete this ${type} ? 🤔`}
			>
				<p className="border-t-stone-800">
					This action is irreversible. If you want to recover this {type}, you
					will have to create a new one. Are you sure you want to delete this
					branch?
					{type === "chapter" ||
						(type === "project" && (
							<>
								<br />
								<br />
								<span className="text-red-500">Warning: </span>Deleting this{" "}
								{type} will also delete all of its Versions, Branches and their
								content.
							</>
						))}
				</p>
				<div className="mt-5">
					<Button
						variant="light"
						color="red"
						leftIcon={<IconTrash size={14} />}
						onClick={deleteBranch}
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
