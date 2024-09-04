import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import Accordion from "@/components/accordion";
import { AREA_NAME, PREFECTURES_DATA } from "@/constants/prefecturesData";

const TopPage = memo(() => {
  return (
    // NOTE:bg-fixedとbg-coverを使うとiPhoneで適用されない(背景画像が動く)→擬似要素で画像を設定する
    <main className="before:fixed before:-z-10 before:size-full before:bg-topBgImage before:bg-cover before:bg-no-repeat">
      <div className="mx-auto flex w-1/2 justify-center p-4 text-center">
        <Image
          src={"/topIcon.png"}
          alt={"iconImg"}
          width={70}
          height={50}
          style={{ width: 70, height: "auto" }}
        />
        <div className="mx-1 py-3 sm:p-3">
          <h1 className="whitespace-nowrap font-bold sm:text-2xl">
            全国の飲食店を素早く検索！
          </h1>
          <h2 className="whitespace-nowrap text-sm sm:text-xl">
            最初にエリアを選択してください
          </h2>
        </div>
      </div>

      <section className="grid gap-1">
        {AREA_NAME.map((areaName, index) => (
          // NOTE:/80→ bg-colorにopacityを設定する新しい書き方
          <div className="bg-white/80" key={index}>
            <Accordion title={areaName}>
              {PREFECTURES_DATA[index].map((prefName) => (
                <Link
                  className="p-2"
                  href={{
                    pathname: "/main",
                    query: { area: prefName.params },
                  }}
                  key={prefName.params}
                >
                  <Button variant="contained" sx={{ marginTop: "10px" }}>
                    {prefName.name}
                  </Button>
                </Link>
              ))}
            </Accordion>
          </div>
        ))}
      </section>
    </main>
  );
});

export default TopPage;
TopPage.displayName = "TopPage";
