import { memo } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import { getAreaData } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import AreaList from "./parts/areaList";

const ShopList = memo(async ({ areaCode }: { areaCode: string }) => {
  try {
    const { results } = await getAreaData(areaCode);
    if (results.error) {
      throw new Error(results.error.shift().message);
    }
    const { middle_area } = results;

    return (
      <>
        <AreaList areaData={middle_area} />

        <div className="text-center my-10 hover:opacity-70">
          <Link href="/" className="">
            <Button variant="contained">TOPに戻る</Button>
          </Link>
        </div>
      </>
    );
  } catch (error) {
    const errorMessage = error as Error;
    logger.error(errorMessage.message);
    throw new Error("Failed to Api Error");
  }
});

export default ShopList;
