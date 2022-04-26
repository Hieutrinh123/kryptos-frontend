import { AlertProvider } from "#/hooks/useShowAlert";
import { SVGGradient } from "#/styles/gradients";
import { ThemeModeProvider } from "#/themes";
import createEmotionCache from "#/utils/createEmotionCache";
import { PageSettings, PageSettingsProvider } from "@/api";
import "#/styles/globals.scss";
import LoadingScreen from "@/containers/LoadingScreen";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import _ from "lodash";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { DefaultSeo } from "next-seo";
import mainThumbnail from "public/mainThumbnail.png";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  pageProps: {
    pageSettings: PageSettings;
  };
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
    const handleComplete = (url: string) => {
      // @ts-ignore
      window.gtag("config", "G-4HHQ534D0S", {
        page_path: url,
      });
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const pageUrl =
    "https://www.kryptos.news/" +
      (router.locale === router.defaultLocale ? "" : router.locale) ?? "";
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-4HHQ534D0S"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4HHQ534D0S');
            `}
      </Script>

      <Head>
        <title>Kryptos</title>
        <meta name="description" content="CoinBlog" />
        <meta httpEquiv="content-language" content="vi" />
        <meta name="ROBOTS" content="INDEX, FOLLOW" />
        <meta name="author" content="YoungIT" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="copyright" content="Kryptos" />
        <meta name="keywords" content="" />
        <meta name="geo.region" content={router.locale?.toUpperCase()} />
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
      <DefaultSeo
        canonical="https://www.kryptos.news/"
        title="Kryptos"
        openGraph={{
          type: "website",
          locale: router.locale ?? router.defaultLocale ?? "vi",
          url: pageUrl,
          site_name: "Kryptos",
          images: [{ url: "https://www.kryptos.news" + mainThumbnail.src }],
        }}
        twitter={{
          handle: "@kryptos_news",
          site: "@kryptos_news",
          cardType: "summary_large_image",
        }}
      />
      <SVGGradient />
      <CacheProvider value={emotionCache}>
        <ThemeModeProvider>
          <PageSettingsProvider settings={pageProps.pageSettings}>
            <AlertProvider>
              <CssBaseline enableColorScheme />
              {loading ? (
                <LoadingScreen />
              ) : (
                <Component {..._.omit(pageProps, "pageSettings")} />
              )}
            </AlertProvider>
          </PageSettingsProvider>
        </ThemeModeProvider>
      </CacheProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
