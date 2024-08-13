import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Inter } from "next/font/google";
import RecoilProvider from "@/components/recoilProvider";
import type { Metadata } from "next";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HotPepper Searcher",
  description:
    "日本全国のお店に対応。目的に合ったお店をすばやく探せます。細かい条件も指定可能。全てホットペッパーに登録済のお店なので安全に利用できます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <RecoilProvider>{children}</RecoilProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
