import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PREFECTURES_DATA } from "@/constants/prefecturesData";
import { isExistingPrefCode } from "@/functions/common";
import { getDetailAreaData } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import DetailAreaPage from "@/page/detailAreaPage/detailAreaPage";
import { DetailAreaData } from "@/types/areaData";

type Props = { searchParams: { areaCode: string; detailAreaCode: string } };

const MainFiltering = async ({ searchParams }: Props) => {
  const { areaCode, detailAreaCode } = searchParams;
  const headersList = headers();
  const referrer = headersList.get("referer");

  const isPrefectureCode = isExistingPrefCode(PREFECTURES_DATA, areaCode);

  // NOTE:URL直打ちはreferrerがnullになる 存在する都道府県コードか判定
  if (!referrer) {
    if (isPrefectureCode) {
      redirect(process.env.SITE_URL + "main?areaCode=" + areaCode);
    }
    redirect("/");
  }

  try {
    const { results } = await getDetailAreaData(detailAreaCode);
    if (results.error) {
      throw new Error(results.error.shift().message);
    }

    const { small_area }: { small_area: DetailAreaData[] } = results;

    return <DetailAreaPage areaData={small_area} />;
  } catch (error) {
    const errorMessage = error as Error;
    logger.error(errorMessage.message);
    throw new Error("Failed to Api Error");
  } finally {
  }
};

export default MainFiltering;
