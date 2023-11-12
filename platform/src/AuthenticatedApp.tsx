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
import Pusher from "pusher-js";

export function AuthenticatedApp({}) {
	const { data: currentUser, isLoading } = useUser();
	const queryClient = useQueryClient();
	const [pusher, setPusher] = useState<Pusher | null>(null);

	useEffect(() => {
		if (currentUser) {
			setPusher(initPusher());

			const channel = pusher?.subscribe(`user-${currentUser?.uid}`);
			channel?.bind("notification", () => {
				queryClient.invalidateQueries(["user"]);
			});
		}
		return () => {
			if (pusher) {
				pusher.disconnect();
				pusher.unsubscribe(`user-${currentUser?.uid}`);
				pusher.unbind("notification");
			}
		};
	}, [currentUser]);

	if (isLoading) {
		return <MainLoader />;
	}

	if (!currentUser) {
		return <RouterProvider router={publicRouter} />;
	}

	return (
		<TabContextWrapper>
			<SocketProvider pusher={pusher}>
				<EditorContextWrapper>
					<DraggableProvider>
						<RouterProvider router={router} />
					</DraggableProvider>
				</EditorContextWrapper>
			</SocketProvider>
		</TabContextWrapper>
	);
}
