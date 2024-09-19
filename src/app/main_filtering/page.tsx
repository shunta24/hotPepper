import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDetailAreaData } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import DetailAreaPage from "@/page/detailAreaPage/detailAreaPage";
import { DetailAreaData } from "@/types/areaData";

const MainFiltering = async ({
  searchParams,
}: {
  searchParams: { detailArea: string };
}) => {
  const { detailArea } = searchParams;
  const headersList = headers();
  const referrer = headersList.get("referer");
  // NOTE:URL直打ちはreferrerがnullになるのでTOPページへリダイレクト
  if (!referrer) {
    redirect("/");
  }

  try {
    const { results } = await getDetailAreaData(detailArea);
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
