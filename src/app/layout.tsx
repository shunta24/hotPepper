import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import RecoilProvider from "@/components/recoilProvider";
import RichResults from "@/components/richResults";
import { defaultMetaData } from "@/constants/seoMetaData";
import type { Metadata } from "next";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...defaultMetaData,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <RichResults />
      </head>

      <body className={inter.className}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}`}
            height="0"
            width="0"
            className="invisible hidden"
          ></iframe>
        </noscript>

        <GoogleTagManager gtmId={process.env.GTM_ID ?? ""} />
        <AppRouterCacheProvider>
          <RecoilProvider>{children}</RecoilProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
