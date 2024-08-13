import { getShopsData } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import { SearchShopRequest } from "@/types/searchShopParams";

export async function POST(request: Request) {
  const requestParams: SearchShopRequest & { start: number } =
    await request.json();

  try {
    const { results } = await getShopsData({
      ...requestParams,
    });

    if (results.error) {
      throw new Error(results.error.shift().message);
    }
    return Response.json(results);
  } catch (error) {
    const errorMessage = error as Error;
    logger.error(errorMessage.message);
    throw new Error("Failed to Client Api Error");
  }
}
