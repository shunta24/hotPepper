import { Button } from "@mui/material";
import { memo, RefObject, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Accordion from "@/components/accordion";
import {
  DEFAULT_GET_DATA_COUNT,
  DISTANCE_DATA,
} from "@/constants/otherApiData";
import { extractingSelectedValue } from "@/functions/common";
import { getShopsDataClient } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import { accordionStateAtom } from "@/recoil/accordionAtom";
import { loadingStateAtom } from "@/recoil/loadingAtom";
import { modalStateAtom } from "@/recoil/modalAtom";
import { positionInfoAtom } from "@/recoil/positionInfoAtom";
import { HotPepperApiResponse } from "@/types/hotPepperApiResponse";
import { ShopData } from "@/types/shopData";

type Props = {
  selectedDistance: number;
  scrollPosition: RefObject<HTMLDivElement>;
  setSelectedDistance: (props: number) => void;
  setShopList: (props: ShopData[]) => void;
  setPageNate: (props: number) => void;
  setCurrentPageNate: (props: number) => void;
  setAreaCode: (props: string) => void;
  setSelectedArea: (props: string) => void;
  conditionSearchReset: () => void;
  wordSearchReset: () => void;
};

const FindFromCurrent = memo(
  ({
    selectedDistance,
    scrollPosition,
    setSelectedDistance,
    setShopList,
    setPageNate,
    setCurrentPageNate,
    setAreaCode,
    setSelectedArea,
    conditionSearchReset,
    wordSearchReset,
  }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const [positionData, setPositionData] = useRecoilState(positionInfoAtom);
    const setIsLoading = useSetRecoilState(loadingStateAtom);
    const setIsModal = useSetRecoilState(modalStateAtom);
    const setAreaListAccordion = useSetRecoilState(accordionStateAtom);

    const [currentPositionMsg, setCurrentPositionMsg] =
      useState("現在地取得中...少々お待ちください");

    const searchFindCurrent = async (
      e: React.MouseEvent<HTMLButtonElement>
    ) => {
      const range = e.currentTarget.id;
      try {
        setIsLoading(true);
        const getShopList: HotPepperApiResponse = await getShopsDataClient({
          ...positionData,
          range,
        });
        setPageNate(
          Math.ceil(getShopList.results_available / DEFAULT_GET_DATA_COUNT)
        );
        setShopList(getShopList.shop);
        setSelectedDistance(Number(range));
        setPositionData((prev) => ({ ...prev, range }));
        setAreaCode("");
        setIsOpen(false);
        setAreaListAccordion(false);
        setCurrentPageNate(1);
        setSelectedArea(
          "現在地から" + extractingSelectedValue(DISTANCE_DATA, range)?.value
        );
        conditionSearchReset();
        wordSearchReset();
        scrollPosition?.current?.scrollIntoView();
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className="mr-4 bg-green-400">
        <Accordion
          title="現在地から探す"
          isInitialOpen={isOpen}
          setIsInitialOpen={setIsOpen}
        >
          {positionData.latitude ? (
            DISTANCE_DATA.map(
              (data: { code: string; value: string }, index: number) => (
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
                    disabled={selectedDistance === index + 1}
                  >
                    {data.value}
                  </Button>
                </span>
              )
            )
          ) : (
            <p className="ml-3 font-bold">{currentPositionMsg}</p>
          )}

          {positionData.latitude && (
            <p className="ml-5 text-xs">
              ※位置情報を再取得する際はページをリロード(再読み込み)してください
            </p>
          )}
        </Accordion>
      </div>
    );
  }
);

export default FindFromCurrent;
FindFromCurrent.displayName = "FindFromCurrent";
