"use client";

import { Button } from "@mui/material";
import Accordion from "../../../components/accordion";
import { loadingStateAtom } from "@/recoil/loadingAtom";
import { ShopData } from "@/types/shopData";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import Loading from "../../../components/loading";
import ShopList from "./shopList";

const AreaList = ({
  areaData,
}: {
  areaData: { code: string; name: string }[];
}) => {
  const [shopsList, setShopList] = useState<ShopData[] | []>([]);
  const [isOpen, setIsOpen] = useState(true);
  const setIsLoading = useSetRecoilState(loadingStateAtom);

  const changeArea = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      setIsLoading(true);
      const getShopList = await fetch("api/hotPepper", {
        method: "POST",
        body: JSON.stringify(e.currentTarget.id),
      })
        .then((a) => a.json())
        .catch((e) => e);

      setShopList(getShopList.results.shop);
      setIsOpen(false);
    } catch (error) {
      throw new Error("API Connection Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loading />

      <div className="bg-blue-300 mb-3">
        <Accordion
          title="エリアを選択"
          isInitialOpen={isOpen}
          setIsInitialOpen={setIsOpen}
        >
          {areaData.map((data: { code: string; name: string }) => (
            <span key={data.code} className="m-3 inline-block hover:opacity-70">
              <Button variant="contained" id={data.code} onClick={changeArea}>
                {data.name}
              </Button>
            </span>
          ))}
        </Accordion>
      </div>

      <ShopList shopsData={shopsList} />
    </>
  );
};

export default AreaList;
