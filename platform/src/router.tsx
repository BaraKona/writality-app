import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";
import { LoginPage, RegisterPage, ResetPage } from "./pages/auth";
import { Sidebar } from "./components/Navigation";
import { Chapter, Project } from "./pages/project";
import { ProfilePage } from "./pages/ProfilePage";
import { Error } from "./pages/Error";
import { FourOFour } from "./pages/404";
import { SinglePost } from "./pages/post/SinglePost";
import { PostCreationPage } from "./pages/post/PostCreationPage";
import { SettingsPage } from "./pages/Settings/SettingsPage";
import { VerifyEmailPage } from "./pages/auth/VerifyEmailPage";
import { VerifiedPage } from "./pages/auth/VerifiedPage";
import { OnboardingPage } from "./pages/onboarding/OnboardingPage";
import { HelpPage } from "./pages/Help";
import { SharedChapter } from "./pages/shared/SharedChapter";
import { UserChat } from "./pages/Users/UserChat";
import { SingleUserPage } from "./pages/Users/SingleUserPage";
import { Stories } from "./pages/Stories";
import { WritingGroupsPage } from "./pages/WritingGroupsPage";
import { PostsPage } from "./pages/post/PostsPage";
import { UsersPage } from "./pages/Users/UsersPage";

const dashboardRoutes: RouteObject[] = [
  {
    path: "*", // catch all routes
    loader: () => redirect("/profile"),
  },
  { path: "/", loader: () => redirect("/profile") },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/help",
    element: <HelpPage />,
  },

  {
    path: "/settings",
    loader: () => redirect("/settings/profile"),
  },
  {
    path: "/settings/:settingsTab",
    element: <SettingsPage />,
    errorElement: <Error />,
  },
  {
    path: "/posts/create",
    element: <PostCreationPage />,
    errorElement: <Error />,
  },
  {
    path: "/posts/:postId",
    element: <SinglePost />,
    errorElement: <Error />,
  },
  {
    path: "/shared/:chapterId",
    element: <SharedChapter />,
    errorElement: <Error />,
  },
  {
    path: "/project/:project/:projectTab/chapter/:chapter/",
    element: <Project />,
    errorElement: <Error />,
  },
  {
    path: "/project/:project/:projectTab",
    element: <Project />,
    errorElement: <Error />,
  },
  {
    path: "/project/:project/chapter/:chapter",
    element: <Chapter />,
    errorElement: <Error />,
  },
];

if (import.meta.env.VITE_API_WITH_FULL_FUNCTIONALITY) {
  dashboardRoutes.push(
    {
      path: "/chat/:userId/:chatId",
      element: <UserChat />,
    },
    {
      path: "/users/:userId",
      element: <SingleUserPage />,
    },
    {
      path: "/stories",
      element: <Stories />,
    },
    {
      path: "/writing-groups",
      element: <WritingGroupsPage />,
    },
    {
      path: "/posts",
      element: <PostsPage />,
      errorElement: <Error />,
    },
    {
      path: "/users",
      element: <UsersPage />,
      errorElement: <Error />,
    },
    {
      path: "/profile/posts/:postId",
      element: <SinglePost />,
      errorElement: <Error />,
    },
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    children: dashboardRoutes,
    errorElement: <Error />,
  },
  {
    path: "*", // catch all routes
    loader: () => redirect("/"),
  },
]);

export const verificationRouter = createBrowserRouter([
  { path: "*", loader: () => redirect("/verification") },

  {
    path: "/verification",
    element: <VerifyEmailPage />,
  },
  {
    path: "/shared/:chapterId",
    element: (
      <section className="flex h-screen grow items-center dark:bg-baseDarker">
        <SharedChapter />
      </section>
    ),
  },
  {
    path: "/verify-email/",
    element: <VerifiedPage />,
  },
  {
    path: "*",
    element: <FourOFour />,
  },
]);

export const onboardingRouter = createBrowserRouter([
  { path: "/", loader: () => redirect("/onboarding") },
  {
    path: "/onboarding",
    element: <OnboardingPage />,
  },
  {
    path: "/shared/:chapterId",
    element: (
      <section className="flex h-screen grow items-center dark:bg-baseDarker">
        <SharedChapter />
      </section>
    ),
  },
  {
    path: "*",
    loader: () => redirect("/"),
  },
]);

export const publicRouter = createBrowserRouter([
  { path: "/", loader: () => redirect("/auth/login") },
  {
    path: "*",
    loader: () => redirect("/"),
  },
  {
    path: "/shared/:chapterId",
    element: (
      <section className="flex h-screen grow items-center dark:bg-baseDarker">
        <SharedChapter />
      </section>
    ),
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
    errorElement: <Error />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
    errorElement: <Error />,
  },
  {
    path: "/auth/reset",
    element: <ResetPage />,
    errorElement: <Error />,
  },
]);
