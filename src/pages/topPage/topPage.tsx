import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import Accordion from "@/components/accordion";
import { AREA_NAME, PREFECTURES_DATA } from "@/constants/prefecturesData";

const TopPage = memo(() => {
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <main className="bg-topBgImage bg-cover bg-no-repeat p-3 pb-14">
      <div className="mx-auto flex w-1/2 justify-center p-8 text-center">
        <Image src={"/topIcon.png"} alt={"iconImg"} width={70} height={50} />
        <div className="p-3">
          <h1 className="whitespace-nowrap text-2xl font-bold">
            全国の飲食店を素早く検索！
          </h1>
          <h2>最初にエリアを選択してください</h2>
        </div>
      </div>

      <section className="grid gap-1">
        {AREA_NAME.map((areaName, index) => (
          <Accordion title={areaName} key={index}>
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
        ))}
      </section>
    </main>
  );
});

export default TopPage;
TopPage.displayName = "TopPage";
