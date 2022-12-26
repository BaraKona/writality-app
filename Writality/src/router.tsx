import { createBrowserRouter, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/auth";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
]);
