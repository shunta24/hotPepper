import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeIcon from "@mui/icons-material/Home";
import LaunchIcon from "@mui/icons-material/Launch";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import TrainIcon from "@mui/icons-material/Train";
import { Card } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { ShopData } from "@/types/shopData";

type Props = {
  shopsList: [] | ShopData[];
  searchResultMsg: string;
  isPcLayout: boolean;
  isDetailArea: boolean;
  isImageResponsive: boolean;
};

const ShopList = memo(
  ({
    shopsList,
    searchResultMsg,
    isPcLayout,
    isDetailArea,
    isImageResponsive,
  }: Props) => {
    const imageWidth = isPcLayout ? 300 : isImageResponsive ? 200 : 150;
    const dpId = isDetailArea ? "DP" : "";

    return (
      <section
        className={`${shopsList.length && "grid gap-2 sm:grid-cols-2 sm:gap-5"}`}
      >
        {shopsList.length ? (
          shopsList.map((data, index) => {
            const imageUrl = isPcLayout ? data.photo.pc.l : data.photo.mobile.l;
            return (
              <Card
                sx={{
                  // NOTE:画像のselfとjustify効かせるためにgrid必要
                  display: "grid",
                  margin: "0 auto",
                  justifyContent: "space-between",
                }}
                key={index}
              >
                <div className="p-2">
                  <Link
                    id={`${"transitionDetailPage" + dpId}`}
                    href={data.urls.pc}
                    target="_new"
                    rel="noopener"
                    className="flex cursor-pointer justify-between rounded-xl border-2 bg-gray-100 p-1 font-bold hover:opacity-70 sm:text-lg"
                  >
                    {data.name}
                    <LaunchIcon fontSize="small" />
                  </Link>

                  <ul className="mt-2 sm:*:my-2">
                    <li className="flex text-sm sm:text-base">
                      <HomeIcon sx={{ marginRight: "4px" }} />
                      {data.address}
                    </li>
                    <li className="flex text-sm sm:text-base">
                      <TrainIcon sx={{ marginRight: "4px" }} />
                      {data.access}
                    </li>
                    <li className="flex text-sm sm:text-base">
                      <CurrencyYenIcon sx={{ marginRight: "4px" }} />
                      {data.budget.average}
                    </li>
                    <li className="flex text-sm sm:text-base">
                      <AccessTimeIcon sx={{ marginRight: "4px" }} />
                      {data.open}
                    </li>
                    <li className="flex text-sm sm:text-base">
                      <SmokingRoomsIcon sx={{ marginRight: "4px" }} />
                      {data.non_smoking}
                    </li>
                    <li className="flex text-sm sm:text-base">
                      <DirectionsCarIcon sx={{ marginRight: "4px" }} />
                      {data.parking}
                    </li>
                  </ul>
                </div>

                <Link
                  id={`${"transitionDetailPageImg" + dpId}`}
                  href={data.urls.pc}
                  target="_new"
                  rel="noopener"
                  className="self-end justify-self-center hover:opacity-70"
                >
                  <Image
                    key={index}
                    src={imageUrl}
                    alt={data.name}
                    width={imageWidth}
                    height={imageWidth}
                    // NOTE:styleにも指定しないとwarningが出る
                    style={{
                      width: imageWidth,
                      height: imageWidth,
                    }}
                    // NOTE:画像最適化を無効化
                    // vercel側で画像最適化の実行数に一ヶ月で上限がある 上限超えると画像が表示されなくなる
                    unoptimized={true}

                    // NOTE:fillにすると絶対配置になるので基準となる親要素にrelative必要
                    // fill
                  />
                </Link>
              </Card>
            );
          })
        ) : (
          <h1 className="text-center text-lg font-bold">{searchResultMsg}</h1>
        )}
      </section>
    );
  }
);
export default ShopList;
ShopList.displayName = "ShopList";
