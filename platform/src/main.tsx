import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContextWrapper } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import "./App.scss";
import { Toaster } from "react-hot-toast";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { Analytics } from "@vercel/analytics/react";

const myCache = createEmotionCache({
	key: "mantine",
	prepend: false,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={new QueryClient()}>
			<MantineProvider
				emotionCache={myCache}
				theme={{
					// colorScheme: "dark",
					colors: {
						greyBlue: [
							"#f6f7f9",
							"#d2d7df",
							"#b4bcca",
							"#96a2b5",
							"#7887a0",
							"#5f6e87",
							"#4a5569",
							"#353d4b",
							"#20252d",
							"#0b0c0f",
						],
						grey: [
							"#ebebeb",
							"#d4d4d4",
							"#bcbcbc",
							"#a5a5a5",
							"#8d8d8d",
							"#757575",
							"#5e5e5e",
							"#464646",
							"#2e2e2e",
							"#171717",
						],
						coolGrey: [
							"#f6f7f9",
							"#cce0ff",
							"#b3d1ff",
							"#b3d6ff",
							"#868e99",
							"#6e7582",
							"#394251",
							"#2a2f3a",
							"#1b1f25",
							"#0c0d0f",
						],
					},
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
