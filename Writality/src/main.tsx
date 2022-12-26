import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthContextWrapper } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MantineProvider } from "@mantine/core";
import { router } from "./router";
import App from "./App";
import "./App.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <AuthContextWrapper>
          <RouterProvider router={router} />
          <App />
        </AuthContextWrapper>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
