import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";
import { LoginPage, RegisterPage, ResetPage } from "./pages/auth";
import { Sidebar } from "./components/Navigation";
import { Chapter, Project } from "./pages/project";
import { PostsPage } from "./pages/post/PostsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Stories } from "./pages/Stories";
import { Error } from "./pages/Error";
import { FourOFour } from "./pages/404";
import { SinglePost } from "./pages/post/SinglePost";
import { PostCreationPage } from "./pages/post/PostCreationPage";
import { SettingsPage } from "./pages/Settings/SettingsPage";
import { UsersPage } from "./pages/Users/UsersPage";
import { UserChat } from "./pages/UserChat";
import { SingleUserPage } from "./pages/Users/SingleUserPage";
import { VerifyEmailPage } from "./pages/auth/VerifyEmailPage";
import { VerifiedPage } from "./pages/auth/VerifiedPage";
import { OnboardingPage } from "./pages/onboarding/OnboardingPage";

const dashboardRoutes: RouteObject[] = [
	// {
	// 	path: "*", // catch all routes
	// 	loader: () => redirect("/"),
	// },
	{ path: "/", loader: () => redirect("/profile") },
	{
		path: "/profile",
		element: <ProfilePage />,
	},
	{
		path: "chat/:userId/:chatId",
		element: <UserChat />,
	},
	{
		path: "users/:userId",
		element: <SingleUserPage />,
	},
	{
		path: "/stories",
		element: <Stories />,
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
		path: "/profile/posts/:postId",
		element: <SinglePost />,
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

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Sidebar />,
		children: dashboardRoutes,
	},
]);

export const verificationRouter = createBrowserRouter([
	{ path: "*", loader: () => redirect("/verification") },

	{
		path: "/verification",
		element: <VerifyEmailPage />,
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
		path: "*",
		loader: () => redirect("/onboarding"),
	},
]);

export const publicRouter = createBrowserRouter([
	{ path: "/", loader: () => redirect("/auth/login") },
	{
		path: "*",
		element: <FourOFour />,
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
