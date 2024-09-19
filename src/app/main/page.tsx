import { redirect } from "next/navigation";
import { AREA_CODE } from "@/constants/prefecturesData";
import { getAreaData } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import MainPage from "@/page/mainPage/mainPage";
import { AreaData } from "@/types/areaData";

const Main = async ({ searchParams }: { searchParams: { area: string } }) => {
  const { area } = searchParams;
  const isPrefectureName = Object.keys(AREA_CODE).some(
    (prefectureName) => prefectureName === area
  );
  // NOTE:パラメーターが存在しない都道府県名の場合TOPページへリダイレクト
  if (!area || !isPrefectureName) {
    redirect("/");
  }

  try {
    const { results } = await getAreaData(AREA_CODE[area]);
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
