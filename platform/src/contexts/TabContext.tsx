//context for tabs using mantine localstorage hook

import { createContext, useContext, useState, ReactNode } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useAuthContext } from "./AuthContext";
import { ITabs } from "../interfaces/ITabs";
import { v4 as uuidv4 } from "uuid";
type TabContextType = {
	tabs: ITabs;
	setTabs: any;
};

const tabContextDefaultValues: TabContextType = {
	tabs: [{ path: "/library/", title: "Library", id: uuidv4(), active: true }],
	setTabs: () => {},
};

const TabContext = createContext<TabContextType>(tabContextDefaultValues);

export function useTabContext() {
	return useContext(TabContext);
}

export function TabContextWrapper({ children }: { children: ReactNode }) {
	const { currentUser } = useAuthContext();
	const [tabs, setTabs] = useLocalStorage<ITabs>({
		key: currentUser?.uid,
		defaultValue: tabContextDefaultValues.tabs,
	});

	const item = localStorage.getItem(currentUser?.uid);
	if (item) {
		const parsedItem = JSON.parse(item);
		if (parsedItem.length === 0) {
			setTabs(tabContextDefaultValues.tabs);
		}
	}

	return (
		<TabContext.Provider
			value={{
				tabs: item ? JSON.parse(item) : tabContextDefaultValues.tabs,
				setTabs,
			}}
		>
			{children}
		</TabContext.Provider>
	);
}
