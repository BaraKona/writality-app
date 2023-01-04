import { createBrowserRouter, Link, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage, RegisterPage, ResetPage } from "./pages/auth";

import { Sidebar } from "./components/Navigation";
import { Chapter, Project } from "./pages/dashboard/project";
import {
  Collaboration,
  CollaborationChapter,
} from "./pages/dashboard/collaboration";
import { Error } from "./pages/Error";
import { FourOFour } from "./pages/404";
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
    path: "/dashboard/project/:project",
    element: (
      <Sidebar>
        <Project />
      </Sidebar>
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
        <Collaboration />
      </Sidebar>
    ),
    errorElement: <Error />,
  },
  {
    path: "/dashboard/collaboration/:collaborationId/chapter/:chapterId",
    element: (
      <Sidebar>
        <CollaborationChapter />
      </Sidebar>
    ),
    errorElement: <Error />,
  },
]);
