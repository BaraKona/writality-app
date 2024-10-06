import { RouterProvider } from "react-router-dom";
import { publicRouter } from "./router";

export function AuthenticatedApp({}) {
  // const { data: currentUser, isLoading } = useUser();

  // if (isLoading) {
  //   return <MainLoader />;
  // }

  // if (currentUser && currentUser?.emailVerified && currentUser?.isOnboardingCompleted) {
  //   return (
  //     <TabContextWrapper>
  //       <SocketProvider>
  //         <EditorContextWrapper>
  //           <DraggableProvider>
  //             <RouterProvider router={router} />
  //           </DraggableProvider>
  //         </EditorContextWrapper>
  //       </SocketProvider>
  //     </TabContextWrapper>
  //   );
  // }

  // if (currentUser && currentUser?.emailVerified && !currentUser.isOnboardingCompleted) {
  //   return <RouterProvider router={onboardingRouter} />;
  // }

  // if (currentUser && !currentUser.emailVerified) {
  //   return <RouterProvider router={verificationRouter} />;
  // }

  return <RouterProvider router={publicRouter} />;
}
