import { createContext, useContext, ReactNode, useEffect } from "react";
import { useLocalStorage } from "@mantine/hooks";
type ThemeType = {
	theme: "light" | "dark";
	toggleTheme: () => void;
};

const defaultTheme: ThemeType = {
	theme: "light",
	toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeType>(defaultTheme);

export function useThemeContext() {
	return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";

	const [theme, setTheme] = useLocalStorage<"light" | "dark">({
		key: "theme",
		defaultValue: systemTheme,
	});

	useEffect(() => {
		if (
			theme === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

	return (
		<ThemeContext.Provider
			value={{
				theme: theme,
				toggleTheme: () => {
					if (theme === "dark") {
						setTheme("light");
					} else {
						setTheme("dark");
					}
				},
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}
