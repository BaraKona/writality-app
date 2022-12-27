import { createBrowserRouter, Link, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage, RegisterPage, ResetPage } from "./pages/auth";
import { Project } from "./pages/dashboard/Project";
import { Sidebar } from "./components/Navigation";
import { Chapter } from "./pages/dashboard/Chapter";
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
]);
