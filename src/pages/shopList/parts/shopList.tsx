"use client";

import { ShopData } from "@/types/shopData";
import { Card } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const ShopList = ({ shopsData }: { shopsData: [] | ShopData[] }) => {
  return (
    <section className={`${shopsData.length && "grid grid-cols-2 gap-5"} p-2`}>
      {shopsData.length ? (
        shopsData.map((data, index) => {
          const imageUrl = data.photo.pc.l;
          const couponUrl = data.coupon_urls.pc;
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
              <div className="p-3 w-[80%]">
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
                  <li>
                    <span className="font-bold">住所:</span>
                    {data.address}
                  </li>
                  <li>
                    <span className="font-bold">アクセス:</span>
                    {data.access}
                  </li>
                  <li>
                    <span className="font-bold">価格帯:</span>
                    {data.budget.average}
                  </li>
                  <li>
                    <span className="font-bold">営業時間:</span>
                    {data.open}
                  </li>
                  <li>
                    <span className="font-bold">タバコ🚬:</span>
                    {data.non_smoking}
                  </li>
                  <li>
                    <span className="font-bold">駐車場:</span>
                    {data.parking}
                  </li>
                </ul>
              </div>

              <Link
                href={data.urls.pc}
                target="_new"
                rel="noopener"
                className="hover:opacity-70 self-center"
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
        <h1 className="font-bold text-center text-lg">
          最初にエリアを選択してください
        </h1>
      )}
    </section>
  );
};

export default ShopList;
