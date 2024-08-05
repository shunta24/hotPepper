import { getShopsDataFromCurrent } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";

export async function POST(request: Request) {
  const params = await request.json();
  try {
    const { results } = await getShopsDataFromCurrent({ ...params });

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
