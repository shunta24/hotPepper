import { memo, useCallback, useState } from "react";
import { Button } from "@mui/material";
import { getShopsDataClient } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import { DEFAULT_GET_DATA_COUNT } from "@/constants/otherApiData";
import Accordion from "../../../components/accordion";
import { AreaData } from "@/types/areaData";
import { ShopData } from "@/types/shopData";

type Props = {
  areaData: AreaData[];
  setIsLoading: (props: boolean) => void;
  setIsModal: (props: boolean) => void;
  setPageNate: (props: number) => void;
  setShopList: (props: ShopData[]) => void;
  setAreaCode: (props: string) => void;
};

const AreaList = memo(
  ({
    areaData,
    setIsLoading,
    setIsModal,
    setPageNate,
    setShopList,
    setAreaCode,
  }: Props) => {
    const [isOpen, setIsOpen] = useState(true);

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
      [setAreaCode, setIsLoading, setIsModal, setPageNate, setShopList]
    );

    return (
      <div className="mb-3 bg-blue-300">
        <Accordion
          title="エリアを選択"
          isInitialOpen={isOpen}
          setIsInitialOpen={setIsOpen}
        >
          {areaData.map((data) => (
            <span key={data.code} className="m-3 inline-block hover:opacity-70">
              <Button variant="contained" id={data.code} onClick={changeArea}>
                {data.name}
              </Button>
            </span>
          ))}
        </Accordion>
      </div>
    );
  }
);

export default AreaList;
AreaList.displayName = "AreaList";
