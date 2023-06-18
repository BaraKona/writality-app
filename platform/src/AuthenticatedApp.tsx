import React from "react";
import { AuthContextWrapper, useAuthContext } from "./contexts/AuthContext";
import { RouterProvider } from "react-router-dom";
import { TabContextWrapper } from "./contexts/TabContext";
import { publicRouter, router } from "./router";

export function AuthenticatedApp({}) {
	const { currentUser } = useAuthContext();

	if (!currentUser) {
		return <RouterProvider router={publicRouter} />;
	}

	return (
		<TabContextWrapper currentUser={currentUser}>
			<RouterProvider router={router} />
		</TabContextWrapper>
	);
}
