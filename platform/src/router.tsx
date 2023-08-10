import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";
import { LoginPage, RegisterPage, ResetPage } from "./pages/auth";
import { io } from "socket.io-client";
import { Sidebar } from "./components/Navigation";
import { Chapter, Project } from "./pages/project";
import { PostsPage } from "./pages/post/PostsPage";
import { LibraryPage } from "./pages/LibraryPage";
import { Stories } from "./pages/Stories";
import { Error } from "./pages/Error";
import { FourOFour } from "./pages/404";
import { SinglePost } from "./pages/post/SinglePost";
import { PostCreationPage } from "./pages/post/PostCreationPage";
import { SettingsPage } from "./pages/Settings/SettingsPage";
import { UsersPage } from "./pages/Users/UsersPage";
const socket = io(import.meta.env.VITE_API_URL, {
	withCredentials: true,
	transports: ["websocket", "polling", "flashsocket"],
});

const dashboardRoutes: RouteObject[] = [
	{
		path: "*",
		element: <FourOFour />,
	},
	{ path: "/", loader: () => redirect("/profile") },
	{
		path: "/profile",
		element: <LibraryPage />,
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

export const publicRouter = createBrowserRouter([
	{ path: "/", loader: () => redirect("/auth/login") },
	// if errorElement route does not exist, it will redirect to /
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
