import { useCallback, useEffect } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { DEFAULT_GET_DATA_COUNT } from "@/constants/otherApiData";
import { extractingSelectedValue } from "@/functions/common";
import { getShopsDataClient } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import { accordionStateAtom } from "@/recoil/accordionAtom";
import { appliedSearchParamsStateAtom } from "@/recoil/appliedSearchParams";
import { areaCodeStateAtom } from "@/recoil/areaCodeAtom";
import { loadingStateAtom } from "@/recoil/loadingAtom";
import { modalStateAtom } from "@/recoil/modalAtom";
import { pageNateStateAtom } from "@/recoil/pageNateAtom";
import { shopListStateAtom } from "@/recoil/shopListAtom";
import { AreaData } from "@/types/areaData";
import { HotPepperApiResponse } from "@/types/hotPepperApiResponse";

export const useAreaSearch = (
  { areaData }: { areaData: AreaData[] },
  wordSearchReset: () => void,
  searchParamsReset: () => void
) => {
  const setIsLoading = useSetRecoilState(loadingStateAtom);
  const setIsModal = useSetRecoilState(modalStateAtom);
  const setShopList = useSetRecoilState(shopListStateAtom);
  const setPageNate = useSetRecoilState(pageNateStateAtom);
  const setAreaCode = useSetRecoilState(areaCodeStateAtom);
  const setIsAccordionOpen = useSetRecoilState(accordionStateAtom);
  const setAppliedSearchParams = useSetRecoilState(
    appliedSearchParamsStateAtom
  );
  const resetIsAccordionOpen = useResetRecoilState(accordionStateAtom);

  useEffect(() => {
    // NOTE:mainページから離れた際にアコーディオンの状態をリセット
    return () => {
      resetIsAccordionOpen();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeArea = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      const requestAreaCode = e.currentTarget.id;

      try {
        setIsLoading(true);
        const getShopList: HotPepperApiResponse = await getShopsDataClient({
          areaCode: requestAreaCode,
        });
        setPageNate({
          count: Math.ceil(
            getShopList.results_available / DEFAULT_GET_DATA_COUNT
          ),
          currentPage: 1,
        });
        setShopList(getShopList.shop);
        setIsAccordionOpen({ area: false, currentPosition: false });
        setAreaCode(requestAreaCode);
        setAppliedSearchParams({
          distance: 0,
          areaName:
            extractingSelectedValue(areaData, requestAreaCode)?.name ?? "",
        });
        searchParamsReset();
        wordSearchReset();
      } catch (error) {
        const errorMessage = error as Error;
        logger.error(errorMessage.message);
        setIsModal(true);
      } finally {
        setIsLoading(false);
      }
    },
    [
      areaData,
      searchParamsReset,
      setAppliedSearchParams,
      setAreaCode,
      setIsAccordionOpen,
      setIsLoading,
      setIsModal,
      setPageNate,
      setShopList,
      wordSearchReset,
    ]
  );

  return {
    changeArea,
  };
};
