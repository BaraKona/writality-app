import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContextWrapper } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MantineProvider } from "@mantine/core";
import "./App.scss";
import { Toaster } from "react-hot-toast";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={new QueryClient()}>
			<MantineProvider
				theme={{
					colorScheme: "light",
					// fontFamily: "Noto Sans JP, sans-serif",
				}}
			>
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
	</React.StrictMode>
);
