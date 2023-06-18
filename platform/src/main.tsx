import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthContextWrapper } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MantineProvider } from "@mantine/core";
import { router } from "./router";
import { TabContextWrapper } from "./contexts/TabContext";
import { UserLoader } from "./UserLoader";
import "./App.scss";
import { Toaster } from "react-hot-toast";
import { AuthenticatedApp } from "./AuthenticatedApp";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={new QueryClient()}>
			<MantineProvider
				theme={{
					colorScheme: "dark",
					// fontFamily: "Noto Sans JP, sans-serif",
				}}
			>
				<AuthContextWrapper>
					<AuthenticatedApp />
				</AuthContextWrapper>
				<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
				<Toaster position="top-center" />
			</MantineProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
