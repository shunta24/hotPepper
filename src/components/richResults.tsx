import { BreadcrumbJsonLd } from "next-seo";
import { memo } from "react";
import { SITE_URL } from "@/constants/seoMetaData";

const RichResults = memo(() => {
  return (
    <BreadcrumbJsonLd
      useAppDir={true}
      itemListElements={[
        {
          position: 1,
          name: "都道府県選択",
          item: SITE_URL,
        },
        {
          position: 2,
          name: "エリア検索",
          // NOTE:areaCodeが取得できないのでパラメータは付けられない
          item: SITE_URL + "/main",
        },
        {
          position: 3,
          name: "詳細エリア検索",
          item: SITE_URL + "/main_filtering",
        },
      ]}
    />
  );
});

export default RichResults;
RichResults.displayName = "RichResults";
