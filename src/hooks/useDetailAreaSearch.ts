import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { DEFAULT_GET_DATA_COUNT } from "@/constants/otherApiData";
import { getShopsDataClient } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import { accordionStateAtom } from "@/recoil/accordionAtom";
import { appliedSearchParamsStateAtom } from "@/recoil/appliedSearchParams";
import { detailAreaCodeStateAtom } from "@/recoil/detailAreaCodeAtom";
import { loadingStateAtom } from "@/recoil/loadingAtom";
import { modalStateAtom } from "@/recoil/modalAtom";
import { pageNateStateAtom } from "@/recoil/pageNateAtom";
import { shopListStateAtom } from "@/recoil/shopListAtom";
import { HotPepperApiResponse } from "@/types/hotPepperApiResponse";

export const useDetailAreaSearch = (
  wordSearchReset: () => void,
  searchParamsReset: () => void
) => {
  const [detailAreaCode, setDetailAreaCode] = useRecoilState(
    detailAreaCodeStateAtom
  );
  const [accordionOpen, setAccordionOpen] = useRecoilState(accordionStateAtom);
  const [pageNate, setPageNate] = useRecoilState(pageNateStateAtom);
  const [shopsList, setShopsList] = useRecoilState(shopListStateAtom);
  const [appliedSearchParams, setAppliedSearchParams] = useRecoilState(
    appliedSearchParamsStateAtom
  );
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
    setAccordionOpen({ area: true, currentPosition: false });
  };

  return {
    shopsList,
    pageNate,
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
