import { Drawer, useMantineTheme } from "@mantine/core";
import React, { FC, ReactNode } from "react";
import { IconDatabase } from "@tabler/icons-react";

export const InviteUserDrawer: FC<{
	opened: boolean;
	children: ReactNode;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ opened, setOpened, children }) => {
	const theme = useMantineTheme();
	return (
		<Drawer
			position="right"
			opened={opened}
			onClose={() => setOpened(false)}
			title="Collaborators"
			padding="md"
			size="md"
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
			scrollAreaComponent={Drawer.NativeScrollArea}
		>
			{children}
		</Drawer>
	);
};
