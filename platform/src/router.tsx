import {
	createBrowserRouter,
	Link,
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
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { Stories } from "./pages/dashboard/Stories";
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
	{
		path: "/collaboration/:collaborationId",
		element: <Collaboration socket={socket} />,
		errorElement: <Error />,
	},
	{
		path: "/collaboration/:collaborationId/chapter/:chapterId",
		element: <CollaborationChapter socket={socket} />,
		errorElement: <Error />,
	},
];

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Sidebar />,
		children: dashboardRoutes,
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
