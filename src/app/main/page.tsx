import { redirect } from "next/navigation";
import { AREA_CODE } from "@/constants/prefecturesData";
import MainPage from "@/pages/mainPage/mainPage";
import { getAreaData } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import { AreaData } from "@/types/areaData";

const Main = async ({ searchParams }: { searchParams: { area: string } }) => {
  const { area } = searchParams;
  const isPrefectureName = Object.keys(AREA_CODE).some(
    (prefectureName) => prefectureName === area
  );
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
  }
};

export default Main;
