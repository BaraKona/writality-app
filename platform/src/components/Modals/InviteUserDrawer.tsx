import { Drawer, useMantineTheme } from "@mantine/core";
import React, { FC, ReactNode } from "react";
import { IconDatabase } from "@tabler/icons-react";
import { useThemeContext } from "../../Providers/ThemeProvider";
import { modalStyles } from "../../styles/modalStyles";

export const InviteUserDrawer: FC<{
	opened: boolean;
	children: ReactNode;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ opened, setOpened, children }) => {
	const { theme } = useThemeContext();
	return (
		<Drawer
			position="right"
			opened={opened}
			onClose={() => setOpened(false)}
			title="Collaborators"
			padding="md"
			size="md"
			overlayProps={{
				opacity: 0.55,
				blur: 3,
			}}
			styles={modalStyles(theme)}
			scrollAreaComponent={Drawer.NativeScrollArea}
		>
			{children}
		</Drawer>
	);
};
