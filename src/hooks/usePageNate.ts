import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DEFAULT_GET_DATA_COUNT } from "@/constants/otherApiData";
import { getShopsDataClient } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import { areaCodeStateAtom } from "@/recoil/areaCodeAtom";
import { loadingStateAtom } from "@/recoil/loadingAtom";
import { modalStateAtom } from "@/recoil/modalAtom";
import { pageNateStateAtom } from "@/recoil/pageNateAtom";
import { positionInfoAtom } from "@/recoil/positionInfoAtom";
import { searchParamsStateAtom } from "@/recoil/searchParamsAtom";
import { shopListStateAtom } from "@/recoil/shopListAtom";
import { HotPepperApiResponse } from "@/types/hotPepperApiResponse";

export const usePageNate = (inputWord: string) => {
  const setIsLoading = useSetRecoilState(loadingStateAtom);
  const setIsModal = useSetRecoilState(modalStateAtom);
  const setShopList = useSetRecoilState(shopListStateAtom);
  const setPageNate = useSetRecoilState(pageNateStateAtom);
  const positionData = useRecoilValue(positionInfoAtom);
  const areaCode = useRecoilValue(areaCodeStateAtom);
  const searchParams = useRecoilValue(searchParamsStateAtom);

  const clickPageNate = useCallback(
    async (_e: React.ChangeEvent<unknown>, page: number) => {
      const startNumber = 1 + DEFAULT_GET_DATA_COUNT * (page - 1);

      try {
        setIsLoading(true);
        const getShopList: HotPepperApiResponse = await getShopsDataClient(
          areaCode
            ? { areaCode, shopName: inputWord, searchParams }
            : positionData,
          startNumber
        );
        setShopList(getShopList.shop);
        setPageNate((prev) => ({
          ...prev,
          currentPage: page,
        }));
        window.scroll({ top: 0 });
      } catch (error) {
        const errorMessage = error as Error;
        logger.error(errorMessage.message);
        setIsModal(true);
      } finally {
        setIsLoading(false);
      }
    },
    [
      areaCode,
      positionData,
      searchParams,
      inputWord,
      setIsLoading,
      setIsModal,
      setPageNate,
      setShopList,
    ]
  );

  return {
    clickPageNate,
  };
};
