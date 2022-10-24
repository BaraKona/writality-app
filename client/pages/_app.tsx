import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextWrapper } from "../contexts/AuthContext";
import { DatabaseContextWrapper } from "../contexts/DatabaseContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextWrapper>
      <DatabaseContextWrapper>
        <Component {...pageProps} />
      </DatabaseContextWrapper>
    </AuthContextWrapper>
  );
}

export default MyApp;
