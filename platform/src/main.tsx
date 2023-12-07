import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContextWrapper } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.scss";
import { Toaster } from "react-hot-toast";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { Analytics } from "@vercel/analytics/react";
import { MantineProvider } from "./Providers/MantineProvider";
import { ThemeProvider } from "./Providers/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={new QueryClient()}>
        <MantineProvider>
          <AuthContextWrapper>
            <AuthenticatedApp />
            {/* <UserLoader> */}
            <Analytics />
            {/* </UserLoader> */}
          </AuthContextWrapper>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          <Toaster position="bottom-right" />
        </MantineProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
