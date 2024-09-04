import Image from "next/image";
import { memo } from "react";
import { AreaSelect } from "./parts/areaSelect";

const TopPage = memo(() => {
  return (
    <>
      {/* // NOTE:bg-fixedとbg-coverを使うとiPhoneで適用されない(背景画像が動く)→擬似要素で画像を設定する */}
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
          <AreaSelect />
        </section>
      </main>
    </>
  );
});

export default TopPage;
TopPage.displayName = "TopPage";
