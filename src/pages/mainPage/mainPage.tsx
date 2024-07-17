import { memo } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import AreaList from "./parts/areaList";

const ShopList = memo(async ({ areaCode }: { areaCode: string }) => {
  const getShopData = await fetch(
    `http://webservice.recruit.co.jp/hotpepper/middle_area/v1/?format=json&key=${process.env.HOT_PEPPER_API_KEY}&count=20&large_area=${areaCode}`
  ).then((a) => a.json());

  const { middle_area } = getShopData.results;

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
