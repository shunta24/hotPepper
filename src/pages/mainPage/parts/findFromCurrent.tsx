"use client";

import { memo, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loadingStateAtom } from "@/recoil/loadingAtom";
import { modalStateAtom } from "@/recoil/modalAtom";
import { positionInfoAtom } from "@/recoil/positionInfoAtom";
import { Button } from "@mui/material";
import { ShopData } from "@/types/shopData";
import Accordion from "@/components/accordion";
import { getShopsDataClient } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import {
  DEFAULT_GET_DATA_COUNT,
  DISTANCE_DATA,
} from "@/constants/otherApiData";

type Props = {
  setShopList: (props: ShopData[]) => void;
  setPageNate: (props: number) => void;
  setAreaCode: (props: string) => void;
};

const FindFromCurrent = memo(
  ({ setShopList, setPageNate, setAreaCode }: Props) => {
    const setIsLoading = useSetRecoilState(loadingStateAtom);
    const setIsModal = useSetRecoilState(modalStateAtom);
    const [positionData, setPositionData] = useRecoilState(positionInfoAtom);

    const [currentPositionMsg, setCurrentPositionMsg] =
      useState("現在地取得中...少々お待ちください");

    const searchFindCurrent = async (
      e: React.MouseEvent<HTMLButtonElement>
    ) => {
      const range = e.currentTarget.id;

      try {
        setIsLoading(true);
        const getShopList = await getShopsDataClient({
          ...positionData,
          range,
        });
        setPageNate(
          Math.ceil(getShopList.results_available / DEFAULT_GET_DATA_COUNT)
        );
        setShopList(getShopList.shop);
        setPositionData((prev) => ({ ...prev, range }));
        setAreaCode("");
      } catch (error) {
        logger.error(error);
        setIsModal(true);
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      (async () => {
        try {
          const positionData: GeolocationPosition = await new Promise(
            (resolve, reject) =>
              navigator.geolocation.getCurrentPosition(resolve, reject)
          );
          const { latitude } = positionData.coords;
          const { longitude } = positionData.coords;

          setPositionData((prev) => ({ ...prev, latitude, longitude }));
        } catch (error) {
          logger.error(error);
          setCurrentPositionMsg("位置情報の取得を許可してください");
        }
      })();
    }, []);

    return (
      <div className="bg-green-400">
        <Accordion title="現在地から探す">
          {positionData.latitude ? (
            DISTANCE_DATA.map((data: { code: string; value: string }) => (
              <span
                key={data.code}
                className="m-3 inline-block hover:opacity-70"
              >
                <Button
                  variant="contained"
                  color="success"
                  id={data.code}
                  onClick={searchFindCurrent}
                  sx={{ textTransform: "none" }}
                >
                  {data.value}
                </Button>
              </span>
            ))
          ) : (
            <p className="ml-3 font-bold">{currentPositionMsg}</p>
          )}
        </Accordion>
      </div>
    );
  }
);

export default FindFromCurrent;
