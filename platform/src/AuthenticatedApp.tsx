import { useAuthContext } from "./contexts/AuthContext";
import { RouterProvider } from "react-router-dom";
import { TabContextWrapper } from "./contexts/TabContext";
import { publicRouter, router } from "./router";
import { MainLoader } from "./components/MainLoader";
import { useUser } from "./hooks/user/useUser";
import { EditorContextWrapper } from "./contexts/EditorContext";
import { DraggableProvider } from "./components/DragAndDrop/DraggableProvider";
import { DatesProvider } from "@mantine/dates";
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
			<EditorContextWrapper>
				<DraggableProvider>
					<DatesProvider
						settings={{ locale: "en", firstDayOfWeek: 0, weekendDays: [0] }}
					>
						<RouterProvider router={router} />
					</DatesProvider>
				</DraggableProvider>
			</EditorContextWrapper>
		</TabContextWrapper>
	);
}
