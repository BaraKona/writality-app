import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AuthContextWrapper } from "../contexts/AuthContext";
import { DatabaseContextWrapper } from "../contexts/DatabaseContext";
import { Toaster } from "react-hot-toast";
import { MantineProvider } from "@mantine/core";
import { ComponentLoader } from "../components/ComponentLoader";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Layout } from "../components/Layout";
function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <AuthContextWrapper>
      <DatabaseContextWrapper>
        <QueryClientProvider client={queryClient}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: "dark",
              loader: "bars",
            }}
          >
            <ComponentLoader>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ComponentLoader>
          </MantineProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
          <Toaster position="top-right" />
        </QueryClientProvider>
      </DatabaseContextWrapper>
    </AuthContextWrapper>
  );
}

export default MyApp;
