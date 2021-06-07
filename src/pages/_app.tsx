import "normalize.css";
import { useEffect } from "react";
import { AppProps } from "next/app";
import { MediaProvider } from "../hooks/useMedia";
// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
import "../../public/styles/global.css";
import GlobalStyles from "./../components/GlobalStyles";
import LoadFonts from "../../load-fonts";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    LoadFonts();
  }, []);

  return (
    <MediaProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </MediaProvider>
  );
}
