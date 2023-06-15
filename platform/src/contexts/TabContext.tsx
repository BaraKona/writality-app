//context for tabs using mantine localstorage hook

import { createContext, useContext, useState, ReactNode } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useAuthContext } from "./AuthContext";
import { ITabs } from "../interfaces/ITabs";
type TabContextType = {
	tabs: ITabs;
	setTabs: any;
};

const tabContextDefaultValues: TabContextType = {
	tabs: [{ path: "/dashboard/", title: "Dashboard", id: "dashboard" }],
	setTabs: () => {},
};

const TabContext = createContext<TabContextType>(tabContextDefaultValues);

export function useTabContext() {
	return useContext(TabContext);
}

export function TabContextWrapper({ children }: { children: ReactNode }) {
	const { currentUser } = useAuthContext();
	// check if the tab userid matches current user id
	// if not, then use default tab and add userId to tab

	const [tab, currentTab] = useLocalStorage({
		key: `${currentUser?.uid}-tabs`,
		defaultValue: [
			{ path: "/dashboard/", title: "Dashboard", id: "dashboard" },
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
