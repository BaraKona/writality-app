import { RouterProvider } from "react-router-dom";
import { TabContextWrapper } from "./contexts/TabContext";
import { onboardingRouter, publicRouter, router, verificationRouter } from "./router";
import { MainLoader } from "./components/MainLoader";
import { useUser } from "./hooks/user/useUser";
import { EditorContextWrapper } from "./contexts/EditorContext";
import { DraggableProvider } from "./components/DragAndDrop/DraggableProvider";
import { SocketProvider } from "./Providers/SocketProvider";

export function AuthenticatedApp({}) {
  const { data: currentUser, isLoading } = useUser();

  if (isLoading) {
    return <MainLoader />;
  }

  if (currentUser && currentUser?.emailVerified && currentUser?.isOnboardingCompleted) {
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

  if (currentUser && currentUser?.emailVerified && !currentUser.isOnboardingCompleted) {
    return <RouterProvider router={onboardingRouter} />;
  }

  if (currentUser && !currentUser.emailVerified) {
    return <RouterProvider router={verificationRouter} />;
  }

  return <RouterProvider router={publicRouter} />;
}
