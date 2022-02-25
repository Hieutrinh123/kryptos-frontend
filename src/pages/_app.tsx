import "@/common/styles/globals.scss";
import { ThemeModeProvider } from "#/themes";
import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

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
        <link rel="icon" href="/vercel.svg" />
      </Head>

      <ThemeModeProvider>
        <CssBaseline enableColorScheme={true}/>
        <Component {...pageProps} />
      </ThemeModeProvider>
    </>
  );
}

export default MyApp;
