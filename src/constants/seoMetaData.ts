import { Metadata } from "next";

const META_TITLE = "HotPepper Searcher";
const META_DESCRIPTION =
  "日本全国のお店に対応。細かい条件で目的に合ったお店をすばやく探せます。";

export const SITE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.VERCEL_PROJECT_PRODUCTION_URL
    : "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const META_DESCRIPTION_COMMON =
  "全てホットペッパーに登録済のお店なので安全に利用できます。";

export const defaultMetaData: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION + META_DESCRIPTION_COMMON,
  openGraph: {
    title: META_TITLE,
    siteName: META_TITLE,
    type: "website",
    // NOTE:url設定しても変わらない(LINE,Instgram,Twitter) 常に開いているページのURLになる 検証でトップページのURLを指定
    url: SITE_URL,
    description: META_DESCRIPTION + META_DESCRIPTION_COMMON,
    images: [
      {
        url: "topIcon.png",
      },
    ],
  },
};
