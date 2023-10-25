import {
	ColorScheme,
	ColorSchemeProvider,
	createEmotionCache,
	MantineProvider as MantineProv,
} from "@mantine/core";
import { FC, ReactNode, useState } from "react";

export const MantineProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	const myCache = createEmotionCache({
		key: "mantine",
		prepend: false,
	});

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProv
				emotionCache={myCache}
				theme={{
					colorScheme,
					colors: {
						greyBlue: [
							"#f6f7f9",
							"#d2d7df",
							"#b4bcca",
							"#96a2b5",
							"#7887a0",
							"#5f6e87",
							"#4a5569",
							"#353d4b",
							"#20252d",
							"#0b0c0f",
						],
						grey: [
							"#ebebeb",
							"#d4d4d4",
							"#bcbcbc",
							"#a5a5a5",
							"#8d8d8d",
							"#757575",
							"#5e5e5e",
							"#464646",
							"#2e2e2e",
							"#171717",
						],
						coolGrey: [
							"#f6f7f9",
							"#cce0ff",
							"#b3d1ff",
							"#b3d6ff",
							"#868e99",
							"#6e7582",
							"#394251",
							"#2a2f3a",
							"#1b1f25",
							"#0c0d0f",
						],
					},
				}}
			>
				{children}
			</MantineProv>
		</ColorSchemeProvider>
	);
};
