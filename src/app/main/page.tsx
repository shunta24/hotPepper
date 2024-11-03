import { Metadata } from "next";
import { redirect } from "next/navigation";
import { PREFECTURES_DATA } from "@/constants/prefecturesData";
import {
  defaultMetaData,
  META_DESCRIPTION_COMMON,
  SITE_URL,
} from "@/constants/seoMetaData";
import { extractingSelectedPref, isExistingPrefCode } from "@/functions/common";
import { getAreaData } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import MainPage from "@/page/mainPage/mainPage";
import { AreaData } from "@/types/areaData";

type Props = {
  searchParams: { areaCode: string };
};

export function generateMetadata({ searchParams }: Props): Metadata {
  // const { areaCode } = searchParams;
  const prefName = extractingSelectedPref(
    PREFECTURES_DATA,
    searchParams.areaCode
  );

  return {
    description: `${prefName}のお店を探す。` + META_DESCRIPTION_COMMON,
    openGraph: {
      ...defaultMetaData.openGraph,
      // NOTE:設定なしでもデフォルトで開いているページのURLになるので,常にトップページのURLになる事象が起きたら使用する
      // 今は検証でトップページのURLを設定
      // url: "https://" + process.env.VERCEL_URL+`/main?areaCode=${areCode}`,
      description: `${prefName}のお店を探す。` + META_DESCRIPTION_COMMON,
    },
    alternates: {
      canonical: SITE_URL,
    },
    robots: {
      follow: false,
    },
  };
}

const Main = async ({ searchParams }: Props) => {
  const { areaCode } = searchParams;
  const isPrefectureCode = isExistingPrefCode(PREFECTURES_DATA, areaCode);
  // NOTE: パラメーターが存在しない都道府県名の場合TOPページへリダイレクト;
  if (!areaCode || !isPrefectureCode) {
    redirect("/");
  }

  try {
    const { results } = await getAreaData(areaCode);
    if (results.error) {
      throw new Error(results.error.shift().message);
    }

    const { middle_area }: { middle_area: AreaData[] } = results;

    return <MainPage areaData={middle_area} />;
  } catch (error) {
    const errorMessage = error as Error;
    logger.error(errorMessage.message);
    throw new Error("Failed to Api Error");
  } finally {
  }
};

export default Main;
