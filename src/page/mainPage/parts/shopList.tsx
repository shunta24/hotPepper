import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeIcon from "@mui/icons-material/Home";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import TrainIcon from "@mui/icons-material/Train";
import { Card } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { memo, RefObject } from "react";
import { ShopData } from "@/types/shopData";

type Props = {
  shopsList: [] | ShopData[];
  searchResultMsg: string;
  isResponsive: boolean;
  isImageSize: boolean;
  scrollRef: RefObject<HTMLDivElement>;
};

const ShopList = memo(
  ({
    shopsList,
    searchResultMsg,
    isResponsive,
    isImageSize,
    scrollRef,
  }: Props) => {
    const imageWidth = isResponsive ? 300 : isImageSize ? 200 : 150;
    return (
      <section
        ref={scrollRef}
        className={`${shopsList.length && "grid gap-2 sm:grid-cols-2 sm:gap-5"}`}
      >
        {shopsList.length ? (
          shopsList.map((data, index) => {
            const imageUrl = isResponsive
              ? data.photo.pc.l
              : data.photo.mobile.l;
            return (
              <Card
                sx={{
                  // NOTE:画像のself-end効かせるためにgrid必要
                  display: "grid",
                  margin: "0 auto",
                  justifyContent: "space-between",
                }}
                key={index}
              >
                <div className="p-2">
                  <Link
                    href={data.urls.pc}
                    target="_new"
                    rel="noopener"
                    className={`font-bold hover:opacity-70 sm:text-lg
                    `}
                  >
                    {data.name}
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

                <div className="self-end text-center">
                  <Link
                    href={data.urls.pc}
                    target="_new"
                    rel="noopener"
                    className="inline-block hover:opacity-70"
                  >
                    <Image
                      key={index}
                      src={imageUrl}
                      alt={data.name}
                      width={imageWidth}
                      height={imageWidth}

                      // NOTE:fillにすると絶対配置になるので親要素にrelative必要
                      // fill
                    />
                  </Link>
                </div>
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
