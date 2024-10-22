import { Metadata } from "next";

const META_TITLE = "HotPepper Searcher";
const META_DESCRIPTION =
  "日本全国のお店に対応。細かい条件で目的に合ったお店をすばやく探せます。";

export const META_DESCRIPTION_COMMON =
  "全てホットペッパーに登録済のお店なので安全に利用できます。";

export const defaultMetaData: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION + META_DESCRIPTION_COMMON,
  openGraph: {
    url: process.env.SITE_URL,
    title: META_TITLE,
    description: META_DESCRIPTION + META_DESCRIPTION_COMMON,
    images: [
      {
        url: process.env.SITE_URL + "topIcon.png",
      },
    ],
  },
};
