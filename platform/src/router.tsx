import { createBrowserRouter } from "react-router-dom";
import { PermanentRedirect } from "./pages/PermanentRedirect";

// const dashboardRoutes: RouteObject[] = [
// {
//   path: "*", // catch all routes
//   loader: () => redirect("/profile"),
// },
// { path: "/", loader: () => redirect("/profile") },
// {
//   path: "/profile",
//   element: <ProfilePage />,
// },
// {
//   path: "/help",
//   element: <HelpPage />,
// },
// {
//   path: "/settings",
//   loader: () => redirect("/settings/profile"),
// },
// {
//   path: "/settings/:settingsTab",
//   element: <SettingsPage />,
//   errorElement: <Error />,
// },
// {
//   path: "/posts/create",
//   element: <PostCreationPage />,
//   errorElement: <Error />,
// },
// {
//   path: "/posts/:postId",
//   element: <SinglePost />,
//   errorElement: <Error />,
// },
// {
//   path: "/shared/:chapterId",
//   element: <SharedChapter />,
//   errorElement: <Error />,
// },
// {
//   path: "/project/:project/:projectTab/chapter/:chapter/",
//   element: <Project />,
//   errorElement: <Error />,
// },
// {
//   path: "/project/:project/:projectTab",
//   element: <Project />,
//   errorElement: <Error />,
// },
// {
//   path: "/project/:project/chapter/:chapter",
//   element: <Chapter />,
//   errorElement: <Error />,
// },
// ];

// if (import.meta.env.VITE_API_WITH_FULL_FUNCTIONALITY) {
//   dashboardRoutes.push(
//     {
//       path: "/chat/:userId/:chatId",
//       element: <UserChat />,
//     },
//     {
//       path: "/users/:userId",
//       element: <SingleUserPage />,
//     },
//     {
//       path: "/stories",
//       element: <Stories />,
//     },
//     {
//       path: "/writing-groups",
//       element: <WritingGroupsPage />,
//     },
//     {
//       path: "/posts",
//       element: <PostsPage />,
//       errorElement: <Error />,
//     },
//     {
//       path: "/users",
//       element: <UsersPage />,
//       errorElement: <Error />,
//     },
//     {
//       path: "/profile/posts/:postId",
//       element: <SinglePost />,
//       errorElement: <Error />,
//     },
//   );
// }

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Sidebar />,
//     children: dashboardRoutes,
//     errorElement: <Error />,
//   },
//   {
//     path: "*", // catch all routes
//     loader: () => redirect("/"),
//   },
// ]);
// export const verificationRouter = createBrowserRouter([
//   { path: "*", loader: () => redirect("/verification") },
//   {
//     path: "/verification",
//     element: <VerifyEmailPage />,
//   },
//   {
//     path: "/shared/:chapterId",
//     element: (
//       <section className="flex h-screen grow items-center dark:bg-baseDarker">
//         <SharedChapter />
//       </section>
//     ),
//   },
//   {
//     path: "/verify-email/",
//     element: <VerifiedPage />,
//   },
//   {
//     path: "*",
//     element: <FourOFour />,
//   },
// ]);

// export const onboardingRouter = createBrowserRouter([
// { path: "/", loader: () => redirect("/onboarding") },
// {
//   path: "/onboarding",
//   element: <OnboardingPage />,
// },
// {
//   path: "/shared/:chapterId",
//   element: (
//     <section className="flex h-screen grow items-center dark:bg-baseDarker">
//       <SharedChapter />
//     </section>
//   ),
// },
// {
//   path: "*",
//   loader: () => redirect("/"),
// },
// ]);

export const publicRouter = createBrowserRouter([
  // { path: "/", loader: () => redirect("/auth/login") },
  // {
  //   path: "*",
  //   loader: () => redirect("/"),
  // },
  {
    path: "/*",
    element: <PermanentRedirect />,
  },
  // {
  //   path: "/shared/:chapterId",
  //   element: (
  //     <section className="flex h-screen grow items-center dark:bg-baseDarker">
  //       <SharedChapter />
  //     </section>
  //   ),
  // },
  // {
  //   path: "/auth/login",
  //   element: <LoginPage />,
  //   errorElement: <Error />,
  // },
  // {
  //   path: "/auth/register",
  //   element: <RegisterPage />,
  //   errorElement: <Error />,
  // },
  // {
  //   path: "/auth/reset",
  //   element: <ResetPage />,
  //   errorElement: <Error />,
  // },
]);
