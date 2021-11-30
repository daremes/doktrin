import "../styles/globals.css";
import type { AppProps } from "next/app";
import Player from "../components/Player";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
