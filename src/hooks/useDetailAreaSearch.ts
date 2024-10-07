import { useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { DEFAULT_GET_DATA_COUNT } from "@/constants/otherApiData";
import { getShopsDataClient } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import { accordionStateAtom } from "@/recoil/accordionAtom";
import { detailAreaCodeStateAtom } from "@/recoil/detailAreaCodeAtom";
import { loadingStateAtom } from "@/recoil/loadingAtom";
import { modalStateAtom } from "@/recoil/modalAtom";
import { HotPepperApiResponse } from "@/types/hotPepperApiResponse";
import { ShopData } from "@/types/shopData";

export const useDetailAreaSearch = (
  wordSearchReset: () => void,
  searchParamsReset: () => void,
  setShopsList: (props: ShopData[]) => void,
  setPageNate: (props: { count: number; currentPage: number }) => void
) => {
  const [detailAreaCode, setDetailAreaCode] = useRecoilState(
    detailAreaCodeStateAtom
  );
  const [accordionOpen, setAccordionOpen] = useRecoilState(accordionStateAtom);
  const [appliedSearchParams, setAppliedSearchParams] = useState<{
    areaName: string;
  }>({ areaName: "未選択" });

  const setIsLoading = useSetRecoilState(loadingStateAtom);
  const setIsModal = useSetRecoilState(modalStateAtom);
  const resetDetailAreaCode = useResetRecoilState(detailAreaCodeStateAtom);

  const changeDetailArea = async () => {
    try {
      setIsLoading(true);
      const getShopList: HotPepperApiResponse = await getShopsDataClient({
        areaCode: detailAreaCode.join(","),
        isDetailArea: true,
      });

      setPageNate({
        count: Math.ceil(
          getShopList.results_available / DEFAULT_GET_DATA_COUNT
        ),
        currentPage: 1,
      });
      setShopsList(getShopList.shop);
      setAccordionOpen({ area: false, currentPosition: false });
      searchParamsReset();
      wordSearchReset();
    } catch (error) {
      const errorMessage = error as Error;
      logger.error(errorMessage.message);
      setIsModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const clickClearButton = () => {
    resetDetailAreaCode();
    setShopsList([]);
    setAccordionOpen((prev) => ({ ...prev, area: true }));
  };

  return {
    detailAreaCode,
    accordionOpen,
    appliedSearchParams,
    setAppliedSearchParams,
    setAccordionOpen,
    setDetailAreaCode,
    changeDetailArea,
    clickClearButton,
    resetDetailAreaCode,
  };
};
