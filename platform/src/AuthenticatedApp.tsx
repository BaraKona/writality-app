import { RouterProvider } from "react-router-dom";
import { TabContextWrapper } from "./contexts/TabContext";
import { publicRouter, router } from "./router";
import { MainLoader } from "./components/MainLoader";
import { useUser } from "./hooks/user/useUser";
import { EditorContextWrapper } from "./contexts/EditorContext";
import { DraggableProvider } from "./components/DragAndDrop/DraggableProvider";
import { SocketProvider } from "./Providers/SocketProvider";
import { useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { initPusher } from "./api/external/pusher";
export function AuthenticatedApp({}) {
	const { data: currentUser, isLoading } = useUser();

	if (isLoading) {
		return <MainLoader />;
	}

	if (!currentUser) {
		return <RouterProvider router={publicRouter} />;
	}

	return (
		<TabContextWrapper>
			<SocketProvider>
				<EditorContextWrapper>
					<DraggableProvider>
						<RouterProvider router={router} />
					</DraggableProvider>
				</EditorContextWrapper>
			</SocketProvider>
		</TabContextWrapper>
	);
}
