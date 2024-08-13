import { Button } from "@mui/material";
import { memo, RefObject } from "react";
import { useRecoilState } from "recoil";
import { DEFAULT_GET_DATA_COUNT } from "@/constants/otherApiData";
import { extractingSelectedValue } from "@/functions/common";
import { getShopsDataClient } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import { accordionStateAtom } from "@/recoil/accordionAtom";
import { AreaData } from "@/types/areaData";
import { HotPepperApiResponse } from "@/types/hotPepperApiResponse";
import { ShopData } from "@/types/shopData";
import Accordion from "../../../components/accordion";

type Props = {
  areaData: AreaData[];
  areaCode: string;
  scrollPosition: RefObject<HTMLDivElement>;
  setIsLoading: (props: boolean) => void;
  setIsModal: (props: boolean) => void;
  setPageNate: (props: number) => void;
  setCurrentPageNate: (props: number) => void;
  setSelectedDistance: (props: number) => void;
  setShopList: (props: ShopData[]) => void;
  setAreaCode: (props: string) => void;
  setSelectedArea: (props: string) => void;
  conditionSearchReset: () => void;
  wordSearchReset: () => void;
};

const AreaList = memo(
  ({
    areaData,
    areaCode,
    scrollPosition,
    setIsLoading,
    setIsModal,
    setPageNate,
    setCurrentPageNate,
    setSelectedDistance,
    setShopList,
    setAreaCode,
    setSelectedArea,
    conditionSearchReset,
    wordSearchReset,
  }: Props) => {
    const [isOpen, setIsOpen] = useRecoilState(accordionStateAtom);

    const changeArea = async (e: React.MouseEvent<HTMLButtonElement>) => {
      const requestAreaCode = e.currentTarget.id;

      try {
        setIsLoading(true);
        const getShopList: HotPepperApiResponse = await getShopsDataClient({
          areaCode: requestAreaCode,
        });
        setPageNate(
          Math.ceil(getShopList.results_available / DEFAULT_GET_DATA_COUNT)
        );
        setShopList(getShopList.shop);
        setIsOpen(false);
        setAreaCode(requestAreaCode);
        setSelectedDistance(0);
        setCurrentPageNate(1);
        setSelectedArea(
          extractingSelectedValue(areaData, requestAreaCode)?.name ?? ""
        );
        conditionSearchReset();
        wordSearchReset();
        scrollPosition?.current?.scrollIntoView();
      } catch (error) {
        const errorMessage = error as Error;
        logger.error(errorMessage.message);
        setIsModal(true);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="mb-3 bg-blue-300">
        <Accordion
          title="エリアを選択"
          isInitialOpen={isOpen}
          setIsInitialOpen={setIsOpen}
        >
          {areaData.map((data) => (
            <span key={data.code} className="m-3 inline-block hover:opacity-70">
              <Button
                variant="contained"
                id={data.code}
                onClick={changeArea}
                disabled={
                  data.name ===
                  extractingSelectedValue(areaData, areaCode)?.name
                }
              >
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
