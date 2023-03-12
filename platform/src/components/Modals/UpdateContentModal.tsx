import {
	Button,
	Input,
	Modal,
	TextInput,
	useMantineTheme,
} from "@mantine/core";
import React, { FC } from "react";
import { IconDatabase } from "@tabler/icons";
export const UpdateContentModal: FC<{
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
	setText: () => void;
}> = ({ opened, setOpened, setText }) => {
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
				title="We found a backup of your chapter! 🤩"
			>
				<p className="border-t-stone-800">
					We found a backup of your chapter that is more recent than the current
					version. Would you like to recover it?
				</p>
				<div className="mt-5">
					<Button
						variant="light"
						color="orange"
						leftIcon={<IconDatabase size={14} />}
						onClick={setText}
					>
						Recover
					</Button>
					<Button color="gray" onClick={() => setOpened(false)}>
						Cancel
					</Button>
				</div>
			</Modal>
		</>
	);
};
