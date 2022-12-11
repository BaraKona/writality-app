import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextWrapper } from "../contexts/AuthContext";
import { DatabaseContextWrapper } from "../contexts/DatabaseContext";
import { Toaster } from "react-hot-toast";
import { MantineProvider } from "@mantine/core";
import { ComponentLoader } from "../components/ComponentLoader";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextWrapper>
      <DatabaseContextWrapper>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "dark",
            loader: "bars",
          }}
        >
          <ComponentLoader>
            <Component {...pageProps} />
          </ComponentLoader>
        </MantineProvider>
        <Toaster position="top-right" />
      </DatabaseContextWrapper>
    </AuthContextWrapper>
  );
}

export default MyApp;
