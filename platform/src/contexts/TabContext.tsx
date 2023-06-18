//context for tabs using mantine localstorage hook

import { createContext, useContext, useState, ReactNode } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useAuthContext } from "./AuthContext";
import { ITabs } from "../interfaces/ITabs";
import { IUser } from "../interfaces/IUser";
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

export function TabContextWrapper({
	children,
	currentUser,
}: {
	children: ReactNode;
	currentUser: IUser;
}) {
	const [tabs, setTabs] = useLocalStorage<ITabs>({
		key: currentUser?.uid + "-tabs",
		defaultValue: tabContextDefaultValues.tabs,
	});

	return (
		<TabContext.Provider
			value={{
				tabs,
				setTabs,
			}}
		>
			{children}
		</TabContext.Provider>
	);
}
