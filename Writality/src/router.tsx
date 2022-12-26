import { createBrowserRouter, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage } from "./pages/auth";
import { Project } from "./pages/dashboard/Project";
import { Sidebar } from "./components/Navigation";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: (
      <Sidebar>
        <Dashboard />
      </Sidebar>
    ),
  },
  {
    path: "/dashboard/project/:project",
    element: (
      <Sidebar>
        <Project />
      </Sidebar>
    ),
  },
]);
