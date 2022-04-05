import { AlertProvider } from "#/hooks/useShowAlert";
import { SVGGradient } from "#/styles/gradients";
import { ThemeModeProvider } from "#/themes";
import createEmotionCache from "#/utils/createEmotionCache";
import { PageSettings, PageSettingsProvider } from "@/api";
import "@/common/styles/globals.scss";
import LoadingScreen from "@/containers/LoadingScreen";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  pageSettings: PageSettings;
}

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
  return (
    <>
      <Head>
        <title>KryptosNews</title>
        <meta name="description" content="CoinBlog" />
        <meta httpEquiv="content-language" content="vi" />
        <meta name="ROBOTS" content="INDEX, FOLLOW" />
        <meta name="author" content="CoinBlog" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="copyright" content="CoinBlog" />
        <meta name="keywords" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CoinBlog" />
        <meta name="geo.region" content="VN" />
        <meta httpEquiv="Content-Type" content="text/html" charSet="UTF-8" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>

      <SVGGradient />
      <CacheProvider value={emotionCache}>
        <ThemeModeProvider>
          <PageSettingsProvider settings={pageProps.pageSettings}>
            <AlertProvider>
              <CssBaseline enableColorScheme />
              {loading ? <LoadingScreen /> : <Component {...pageProps} />}
            </AlertProvider>
          </PageSettingsProvider>
        </ThemeModeProvider>
      </CacheProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
