import {
	createBrowserRouter,
	Link,
	Navigate,
	redirect,
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

const socket = io(import.meta.env.VITE_API_URL as string);

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
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
	{
		path: "/dashboard",
		element: (
			<Sidebar>
				<Dashboard />
			</Sidebar>
		),
		errorElement: <Error />,
	},
	{
		path: "/dashboard/posts",
		element: (
			<Sidebar>
				<PostsPage />
			</Sidebar>
		),
		errorElement: <Error />,
	},
	{
		path: "/dashboard/project/:project",
		element: (
			<div className="h-screen w-screen flex flex-col">
				<Sidebar>
					<Project />
				</Sidebar>
			</div>
		),
		errorElement: <Error />,
	},
	{
		path: "/dashboard/project/:project/chapter/:chapter",
		element: (
			<Sidebar>
				<Chapter />
			</Sidebar>
		),
		errorElement: <Error />,
	},
	{
		path: "/dashboard/collaboration/:collaborationId",
		element: (
			<Sidebar>
				<Collaboration socket={socket} />
			</Sidebar>
		),
		errorElement: <Error />,
	},
	{
		path: "/dashboard/collaboration/:collaborationId/chapter/:chapterId",
		element: (
			<Sidebar>
				<CollaborationChapter socket={socket} />
			</Sidebar>
		),
		errorElement: <Error />,
	},
]);
