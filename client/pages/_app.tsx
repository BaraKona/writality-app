import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextWrapper } from "../contexts/AuthContext";
import { DatabaseContextWrapper } from "../contexts/DatabaseContext";
import { Toaster } from "react-hot-toast";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextWrapper>
      <DatabaseContextWrapper>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "dark",
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
        <Toaster position="top-right" />
      </DatabaseContextWrapper>
    </AuthContextWrapper>
  );
}

export default MyApp;
