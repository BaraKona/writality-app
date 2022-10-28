import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextWrapper } from "../contexts/AuthContext";
import { DatabaseContextWrapper } from "../contexts/DatabaseContext";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextWrapper>
      <DatabaseContextWrapper>
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </DatabaseContextWrapper>
    </AuthContextWrapper>
  );
}

export default MyApp;
