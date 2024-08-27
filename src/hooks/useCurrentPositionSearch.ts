import { useCallback, useEffect, useState } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  DEFAULT_GET_DATA_COUNT,
  DISTANCE_DATA,
} from "@/constants/otherApiData";
import { extractingSelectedValue } from "@/functions/common";
import { getShopsDataClient } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import { accordionStateAtom } from "@/recoil/accordionAtom";
import { appliedSearchParamsStateAtom } from "@/recoil/appliedSearchParams";
import { areaCodeStateAtom } from "@/recoil/areaCodeAtom";
import { loadingStateAtom } from "@/recoil/loadingAtom";
import { modalStateAtom } from "@/recoil/modalAtom";
import { pageNateStateAtom } from "@/recoil/pageNateAtom";
import { positionInfoAtom } from "@/recoil/positionInfoAtom";
import { shopListStateAtom } from "@/recoil/shopListAtom";
import { HotPepperApiResponse } from "@/types/hotPepperApiResponse";

export const useCurrentPositionSearch = (
  wordSearchReset: () => void,
  searchParamsReset: () => void
) => {
  const setIsLoading = useSetRecoilState(loadingStateAtom);
  const setIsModal = useSetRecoilState(modalStateAtom);
  const setShopList = useSetRecoilState(shopListStateAtom);
  const setPageNate = useSetRecoilState(pageNateStateAtom);
  const setIsAccordionOpen = useSetRecoilState(accordionStateAtom);
  const setAreaCode = useSetRecoilState(areaCodeStateAtom);
  const setAppliedSearchParams = useSetRecoilState(
    appliedSearchParamsStateAtom
  );
  const [positionData, setPositionData] = useRecoilState(positionInfoAtom);
  const [currentPositionMsg, setCurrentPositionMsg] =
    useState<string>("現在地取得中...少々お待ちください");
  // NOTE:現在地検索＋条件を加えた時の検索結果が0の場合に検索ボタンを活性化させるフラグ
  const [isCurrentSearchResult, setIsCurrentSearchResult] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const positionData: GeolocationPosition = await new Promise(
          (resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        const { latitude, longitude } = positionData.coords;

        setPositionData((prev) => ({ ...prev, latitude, longitude }));
      } catch (error) {
        logger.error(error);
        setCurrentPositionMsg("位置情報の取得を許可してください");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchFindCurrent = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      const range = e.currentTarget.id;
      try {
        setIsLoading(true);
        const getShopList: HotPepperApiResponse = await getShopsDataClient({
          ...positionData,
          range,
        });
        setPageNate({
          count: Math.ceil(
            getShopList.results_available / DEFAULT_GET_DATA_COUNT
          ),
          currentPage: 1,
        });
        setShopList(getShopList.shop);
        setPositionData((prev) => ({ ...prev, range }));
        setAreaCode("");
        setIsAccordionOpen({ area: false, currentPosition: false });
        setAppliedSearchParams({
          distance: Number(range),
          areaName:
            "現在地から" + extractingSelectedValue(DISTANCE_DATA, range)?.value,
        });
        searchParamsReset();
        wordSearchReset();
        setIsCurrentSearchResult(true);
      } catch (error) {
        logger.error(error);
        setIsModal(true);
      } finally {
        setIsLoading(false);
      }
    },
    [
      positionData,
      searchParamsReset,
      setAppliedSearchParams,
      setAreaCode,
      setIsAccordionOpen,
      setIsLoading,
      setIsModal,
      setPageNate,
      setPositionData,
      setShopList,
      wordSearchReset,
    ]
  );

  return {
    currentPositionMsg,
    isCurrentSearchResult,
    searchFindCurrent,
  };
};
