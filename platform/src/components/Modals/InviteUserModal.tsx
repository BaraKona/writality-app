import { Button, Modal, TextInput } from "@mantine/core";
import { IconCubeSend } from "@tabler/icons-react";
import React, { FC, useState } from "react";
import { useThemeContext } from "../../Providers/ThemeProvider";
import { modalStyles } from "../../styles/modalStyles";
import { inputStyles } from "../../styles/inputStyles";

export const InviteUserModal: FC<{
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
	users: any;
	projectId: string;
	addProjectCollaborator: ({
		projectId,
		userId,
	}: {
		projectId: string;
		userId: string;
	}) => void;
}> = ({ opened, setOpened, users, addProjectCollaborator, projectId }) => {
	const [value, setValue] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");
	const { theme } = useThemeContext();
	function findUser(name: string) {
		setSuccess("");
		setError("");

		if (users.filter((user: any) => user.name === name).length > 0) {
			setError("");
			setValue("");
			setSuccess(
				"User found! They will receive a notification shortly if they are not already a member of the project."
			);

			addProjectCollaborator({
				projectId,
				userId: users.find((user: any) => user.name === name).uid,
			});
			return;
		}

		setError("Hm, that didn't work. Double-check the name is correct");
	}

	function close() {
		setOpened(false);
		setSuccess("");
		setError("");
		setValue("");
	}
	return (
		<Modal
			size="lg"
			opened={opened}
			overlayProps={{
				opacity: 0.55,
				blur: 3,
			}}
			radius="md"
			styles={modalStyles(theme)}
			scrollAreaComponent={Modal.NativeScrollArea}
			onClose={close}
			title="Invite users to collaborate with you 🤗"
		>
			<p className="text-sm">
				Adding collaborators to your story allows you to work with other people
				on the same story. You can add collaborators by entering their username
				below. <br /> <br />
				Collaborators will be able to edit the story, but they will not be able
				to delete it or add collaborators. If you want to remove a collaborator,
				you can do so in the collaborators tab.
			</p>
			<div className="mt-5 flex gap-2 items-center">
				<div className="grow">
					<TextInput
						label="Find user (username)"
						placeholder="Select user"
						value={value}
						onChange={(e) => setValue(e.currentTarget.value)}
						styles={inputStyles()}
					/>
				</div>
				<Button
					variant="outline"
					color="gray"
					className="mt-5"
					onClick={() => findUser(value)}
					type="submit"
					disabled={value.length === 0}
				>
					<IconCubeSend size={24} />
				</Button>
			</div>
			<div>
				{error && (
					<div className="-mt-1 px-2">
						<p className="text-rose-500 text-xs">{error}</p>
					</div>
				)}
				{success && (
					<div className="-mt-1 px-2">
						<p className="text-lime-700 text-xs">{success}</p>
					</div>
				)}
			</div>
		</Modal>
	);
};
