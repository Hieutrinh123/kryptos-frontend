import "@/common/styles/globals.scss";
import { SVGGradient } from "#/styles/gradients";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import React from "react";
import { ThemeModeProvider } from "#/themes";
import FullLayout from "@/layouts/FullLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CoinBlog</title>
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
      <ThemeModeProvider>
        <FullLayout>
          <CssBaseline enableColorScheme={true} />
          <Component {...pageProps} />
        </FullLayout>
      </ThemeModeProvider>
    </>
  );
}

export default MyApp;
