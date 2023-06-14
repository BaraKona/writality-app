//context for tabs using mantine localstorage hook

import { createContext, useContext, useState, ReactNode } from "react";
import { useLocalStorage } from "@mantine/hooks";

type TabContextType = {
	tabs: {
		path: string;
		title: string;
		id: string;
	}[];
	setTabs: any;
};

const tabContextDefaultValues: TabContextType = {
	tabs: [
		{
			path: "/dashboard",
			title: "Dashboard",
			id: "1",
		},
	],
	setTabs: () => {},
};

const TabContext = createContext<TabContextType>(tabContextDefaultValues);

export function useTabContext() {
	return useContext(TabContext);
}

export function TabContextWrapper({ children }: { children: ReactNode }) {
	const [tab, currentTab] = useLocalStorage({
		key: "tabs  ",
		defaultValue: [
			{
				path: "/dashboard",
				title: "Dashboard",
				id: "1",
			},
		],
	});

	return (
		<TabContext.Provider
			value={{
				tabs: tab,
				setTabs: currentTab,
			}}
		>
			{children}
		</TabContext.Provider>
	);
}
