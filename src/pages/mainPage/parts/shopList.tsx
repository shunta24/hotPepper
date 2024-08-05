"use client";
import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TrainIcon from "@mui/icons-material/Train";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { ShopData } from "@/types/shopData";

const ShopList = memo(({ shopsData }: { shopsData: [] | ShopData[] }) => {
  return (
    <section className={`${shopsData.length && "grid grid-cols-2 gap-5"} p-2`}>
      {shopsData.length ? (
        shopsData.map((data, index) => {
          const imageUrl = data.photo.pc.l;
          return (
            <Card
              sx={{
                // maxWidth: 500,
                minWidth: "400px",
                // minHeight: "200px",
                // height:'300px',
                display: "flex",
                // position:'relative',
                justifyContent: "space-between",
                // alignItems: "center",
                // display: "grid",
                // gridTemplateColumns: "auto 300px",
                margin: "0 auto",
                // position:'relative'
                // bgcolor: "blue",
              }}
              key={index}
            >
              <div className="w-4/5 p-3">
                <Link
                  href={data.urls.pc}
                  target="_new"
                  rel="noopener"
                  className={`text-lg font-bold hover:opacity-70 
                    ${data.name.length < 35 && "whitespace-nowrap"}
                    `}
                >
                  {data.name}
                </Link>
                <ul className="mt-1.5">
                  <li className="flex">
                    <HomeIcon sx={{ marginRight: "4px" }} />
                    {data.address}
                  </li>
                  <li className="flex">
                    <TrainIcon sx={{ marginRight: "4px" }} />
                    {data.access}
                  </li>
                  <li className="flex">
                    <CurrencyYenIcon sx={{ marginRight: "4px" }} />
                    {data.budget.average}
                  </li>
                  <li className="flex">
                    <AccessTimeIcon sx={{ marginRight: "4px" }} />
                    {data.open}
                  </li>
                  <li className="flex">
                    <SmokingRoomsIcon sx={{ marginRight: "4px" }} />
                    {data.non_smoking}
                  </li>
                  <li className="flex">
                    <DirectionsCarIcon sx={{ marginRight: "4px" }} />
                    {data.parking}
                  </li>
                </ul>
              </div>

              <Link
                href={data.urls.pc}
                target="_new"
                rel="noopener"
                className="self-center hover:opacity-70"
              >
                <Image
                  key={index}
                  src={imageUrl}
                  alt={data.name}
                  width={300}
                  height={300}
                  // fill
                  // className="object-cover"
                  // className="object-contain"
                  // className="object-fill"
                />
              </Link>
            </Card>
          );
        })
      ) : (
        <h1 className="text-center text-lg font-bold">
          最初にエリアを選択してください
        </h1>
      )}
    </section>
  );
});
export default ShopList;
ShopList.displayName='ShopList'