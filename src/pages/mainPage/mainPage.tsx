import { memo } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import { getAreaData } from "@/functions/communicateApi";
import AreaList from "./parts/areaList";

const ShopList = memo(async ({ areaCode }: { areaCode: string }) => {
  const areaData = await getAreaData(areaCode);
  const { middle_area } = areaData.results;

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
});

export default ShopList;
