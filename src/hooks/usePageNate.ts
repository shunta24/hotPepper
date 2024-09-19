import { useCallback, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DEFAULT_GET_DATA_COUNT } from "@/constants/otherApiData";
import { getShopsDataClient } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import { areaCodeStateAtom } from "@/recoil/areaCodeAtom";
import { detailAreaCodeStateAtom } from "@/recoil/detailAreaCodeAtom";
import { loadingStateAtom } from "@/recoil/loadingAtom";
import { modalStateAtom } from "@/recoil/modalAtom";
import { pageNateStateAtom } from "@/recoil/pageNateAtom";
import { positionInfoAtom } from "@/recoil/positionInfoAtom";
import { searchParamsStateAtom } from "@/recoil/searchParamsAtom";
import { shopListStateAtom } from "@/recoil/shopListAtom";
import { HotPepperApiResponse } from "@/types/hotPepperApiResponse";

export const usePageNate = (inputWord: string, isDetailArea: boolean) => {
  const areaCode = useRecoilValue(areaCodeStateAtom);
  const detailAreaCode = useRecoilValue(detailAreaCodeStateAtom);
  const positionData = useRecoilValue(positionInfoAtom);
  const searchParams = useRecoilValue(searchParamsStateAtom);
  const setIsLoading = useSetRecoilState(loadingStateAtom);
  const setIsModal = useSetRecoilState(modalStateAtom);
  const setShopList = useSetRecoilState(shopListStateAtom);
  const setPageNate = useSetRecoilState(pageNateStateAtom);

  const searchType = useMemo(
    () =>
      isDetailArea ? { areaCode: detailAreaCode.join(",") } : { areaCode },
    [areaCode, detailAreaCode, isDetailArea]
  );

  const clickPageNate = useCallback(
    async (_e: React.ChangeEvent<unknown>, page: number) => {
      const startNumber = 1 + DEFAULT_GET_DATA_COUNT * (page - 1);

      try {
        setIsLoading(true);
        const getShopList: HotPepperApiResponse = await getShopsDataClient(
          areaCode
            ? { ...searchType, shopName: inputWord, searchParams, isDetailArea }
            : positionData,
          startNumber
        );
        setShopList(getShopList.shop);
        setPageNate((prev) => ({
          ...prev,
          currentPage: page,
        }));
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
      searchType,
      searchParams,
      positionData,
      inputWord,
      isDetailArea,
      setShopList,
      setPageNate,
      setIsModal,
      setIsLoading,
    ]
  );

  return {
    clickPageNate,
  };
};
