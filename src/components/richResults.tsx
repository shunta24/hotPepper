import { BreadcrumbJsonLd } from "next-seo";
import { memo } from "react";

const RichResults = memo(() => {
  return (
    <BreadcrumbJsonLd
      useAppDir={true}
      itemListElements={[
        {
          position: 1,
          name: "都道府県選択",
          item: process.env.SITE_URL,
        },
        {
          position: 2,
          name: "エリア検索",
          item: process.env.SITE_URL + "main",
        },
        {
          position: 3,
          name: "詳細エリア検索",
          item: process.env.SITE_URL + "main_filtering",
        },
      ]}
    />
  );
});

export default RichResults;
RichResults.displayName = "RichResults";

