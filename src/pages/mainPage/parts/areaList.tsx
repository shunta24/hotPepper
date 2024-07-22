"use client";
import { memo, useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import { loadingStateAtom } from "@/recoil/loadingAtom";
import { Button, Pagination } from "@mui/material";
import { ShopData } from "@/types/shopData";
import { DEFAULT_GET_DATA_COUNT } from "@/constants/otherApiData";
import { getShopsDataClient } from "@/functions/communicateApi";
import { modalStateAtom } from "@/recoil/modalAtom";
import { logger } from "@/functions/logger";
import Modals from "@/components/modal";
import Accordion from "../../../components/accordion";
import Loading from "../../../components/loading";
import ShopList from "./shopList";

const AreaList = memo(
  ({ areaData }: { areaData: { code: string; name: string }[] }) => {
    const [shopsList, setShopList] = useState<ShopData[] | []>([]);
    const [isOpen, setIsOpen] = useState(true);
    const [pageNate, setPageNate] = useState(0);
    const [areaCode, setAreaCode] = useState("");
    const setIsLoading = useSetRecoilState(loadingStateAtom);
    const setIsModal = useSetRecoilState(modalStateAtom);

    const changeArea = useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        const requestAreaCode = e.currentTarget.id;
        try {
          setIsLoading(true);
          const getShopList = await getShopsDataClient(requestAreaCode);
          setPageNate(
            Math.ceil(getShopList.results_available / DEFAULT_GET_DATA_COUNT)
          );
          setShopList(getShopList.shop);
          setIsOpen(false);
          setAreaCode(requestAreaCode);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
          const errorMessage = error as Error;
          logger.error(errorMessage.message);
          setIsModal(true);
        } finally {
          setIsLoading(false);
        }
      },
      []
    );

    const clickPageNate = async (
      _e: React.ChangeEvent<unknown>,
      page: number
    ) => {
      const startNumber = 1 + DEFAULT_GET_DATA_COUNT * (page - 1);

      try {
        setIsLoading(true);
        const getShopList = await getShopsDataClient(areaCode, startNumber);
        setShopList(getShopList.shop);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        const errorMessage = error as Error;
        logger.error(errorMessage.message);
        setIsModal(true);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <>
        <Loading />
        <Modals />

        <div className="bg-blue-300 mb-3">
          <Accordion
            title="エリアを選択"
            isInitialOpen={isOpen}
            setIsInitialOpen={setIsOpen}
          >
            {areaData.map((data: { code: string; name: string }) => (
              <span
                key={data.code}
                className="m-3 inline-block hover:opacity-70"
              >
                <Button variant="contained" id={data.code} onClick={changeArea}>
                  {data.name}
                </Button>
              </span>
            ))}
          </Accordion>
        </div>

        <ShopList shopsData={shopsList} />

        {shopsList.length !== 0 && (
          <div className="text-center my-5">
            <Pagination
              count={pageNate}
              variant="outlined"
              shape="rounded"
              onChange={clickPageNate}
              sx={{ display: "inline-block" }}
            />
          </div>
        )}
      </>
    );
  }
);

export default AreaList;
