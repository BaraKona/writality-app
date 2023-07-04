import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";
import { LoginPage, RegisterPage, ResetPage } from "./pages/auth";
import { io } from "socket.io-client";
import { Sidebar } from "./components/Navigation";
import { Chapter, Project } from "./pages/project";
import { PostsPage } from "./pages/PostsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { Stories } from "./pages/Stories";
import { Error } from "./pages/Error";
import { FourOFour } from "./pages/404";

const socket = io(import.meta.env.VITE_API_URL);

const dashboardRoutes: RouteObject[] = [
	{
		path: "*",
		element: <FourOFour />,
	},
	{ path: "/", loader: () => redirect("/dashboard") },
	{
		path: "/dashboard",
		element: <DashboardPage />,
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
		path: "/project/:project",
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
