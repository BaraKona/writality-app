import {
	createBrowserRouter,
	Link,
	Navigate,
	redirect,
	RouteObject,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage, RegisterPage, ResetPage } from "./pages/auth";
import { io } from "socket.io-client";
import { Sidebar } from "./components/Navigation";
import { Chapter, Project } from "./pages/dashboard/project";
import { PostsPage } from "./pages/dashboard/PostsPage";
import {
	Collaboration,
	CollaborationChapter,
} from "./pages/dashboard/collaboration";
import { Error } from "./pages/Error";
import { FourOFour } from "./pages/404";

const socket = io(import.meta.env.VITE_API_URL);

const dashboardRoutes: RouteObject[] = [
	{
		path: "*",
		element: <FourOFour />,
	},
	// {
	// 	path: "/auth/reset",
	// 	element: <ResetPage />,
	// 	errorElement: <Error />,
	// },
	{
		path: "/dashboard",
		loader: () => redirect("/dashboard/posts"),
	},
	{
		path: "dashboard/posts",
		element: <PostsPage />,
		errorElement: <Error />,
	},
	{
		path: "dashboard/project/:project",
		element: (
			<div className="h-screen w-screen flex flex-col">
				<Project />
			</div>
		),
		errorElement: <Error />,
	},
	{
		path: "dashboard/project/:project/chapter/:chapter",
		element: <Chapter />,
		errorElement: <Error />,
	},
	{
		path: "dashboard/collaboration/:collaborationId",
		element: <Collaboration socket={socket} />,
		errorElement: <Error />,
	},
	{
		path: "dashboard/collaboration/:collaborationId/chapter/:chapterId",
		element: <CollaborationChapter socket={socket} />,
		errorElement: <Error />,
	},
];

export const router = createBrowserRouter([
	{
		path: "/dashboard",
		element: <Sidebar />,
		children: dashboardRoutes,
	},
	{
		path: "/",
		element: <Home />,
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
]);
