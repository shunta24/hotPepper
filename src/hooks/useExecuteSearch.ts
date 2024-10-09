import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { DEFAULT_GET_DATA_COUNT } from "@/constants/otherApiData";
import { getShopsDataClient } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import { useSearchRequestParams } from "@/hooks/useRequestSearchParams";
import { accordionStateAtom } from "@/recoil/accordionAtom";
import { areaCodeStateAtom } from "@/recoil/areaCodeAtom";
import { detailAreaCodeStateAtom } from "@/recoil/detailAreaCodeAtom";
import { loadingStateAtom } from "@/recoil/loadingAtom";
import { modalStateAtom } from "@/recoil/modalAtom";
import { positionInfoAtom } from "@/recoil/positionInfoAtom";
import { searchParamsStateAtom } from "@/recoil/searchParamsAtom";
import { HotPepperApiResponse } from "@/types/hotPepperApiResponse";

export const useExecuteSearch = () => {
  const {
    isDetailArea,
    shopsList,
    pageNate,
    inputWord,
    budgetParam,
    appliedSearchParams,
    searchParamsSeparate,
    setShopsList,
    setPageNate,
    setInputWord,
    setBudgetParam,
    setAppliedSearchParams,
    setSearchParamsSeparate,
  } = useSearchRequestParams();

  const { register, handleSubmit, reset } = useForm<{
    searchWord: string;
    // NOTE:defaultValuesだと設定した値がファーストレンダーでキャッシュされるので,値が変わっても反映されない時がある
    // 例) 画面描画時にrecoilに値が入っている状態で,値を変化させる処理を実行しても入力欄の値は変わらない
  }>({ values: { searchWord: inputWord } });

  const [areaCode, setAreaCode] = useRecoilState(areaCodeStateAtom);
  const positionData = useRecoilValue(positionInfoAtom);
  const detailAreaCode = useRecoilValue(detailAreaCodeStateAtom);
  const setIsLoading = useSetRecoilState(loadingStateAtom);
  const setIsModal = useSetRecoilState(modalStateAtom);
  const setSearchParams = useSetRecoilState(searchParamsStateAtom);
  const setAccordionOpen = useSetRecoilState(accordionStateAtom);

  const [searchResultMsg, setSearchResultMsg] =
    useState<string>("最初にエリアを選択してください");

  const searchType = useMemo(
    () =>
      isDetailArea
        ? { areaCode: detailAreaCode.join(",") }
        : areaCode
          ? { areaCode }
          : positionData,
    [areaCode, detailAreaCode, isDetailArea, positionData]
  );

  const wordSearchReset = useCallback(() => {
    reset();
    setInputWord("");
  }, [reset, setInputWord]);

  const searchParamsReset = useCallback(() => {
    setBudgetParam("");
    setSearchParamsSeparate({ genre: [], specialCode: [], otherOption: [] });
    setSearchParams([]);
  }, [setBudgetParam, setSearchParams, setSearchParamsSeparate]);

  const wordSearch = useCallback(
    async (value: { searchWord: string }) => {
      const inputValue = value.searchWord;
      try {
        setIsLoading(true);
        const getShopList: HotPepperApiResponse = await getShopsDataClient({
          ...searchType,
          isDetailArea,
          shopName: inputValue,
        });

        if (!getShopList.shop.length) {
          setSearchResultMsg("指定した条件のお店が見つかりませんでした");
          setShopsList([]);
          searchParamsReset();
          setInputWord(inputValue);
          return;
        }
        setShopsList(getShopList.shop);
        setPageNate({
          count: Math.ceil(
            getShopList.results_available / DEFAULT_GET_DATA_COUNT
          ),
          currentPage: 1,
        });
        setInputWord(inputValue);
        setAccordionOpen({ area: false, currentPosition: false });

        // NOTE:店舗名検索の時はその他の検索条件をリセット
        searchParamsReset();
      } catch (error) {
        const errorMessage = error as Error;
        logger.error(errorMessage.message);
        setIsModal(true);
      } finally {
        setIsLoading(false);
      }
    },
    [
      searchType,
      isDetailArea,
      setInputWord,
      setIsLoading,
      setShopsList,
      setPageNate,
      setAccordionOpen,
      searchParamsReset,
      setIsModal,
    ]
  );

  const executeSearch = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      const requestAreaCode = e.currentTarget.id;
      const searchCode = requestAreaCode
        ? { areaCode: requestAreaCode }
        : searchType;

      const requestParams = [];
      if (budgetParam) {
        requestParams.push("budget=" + budgetParam);
      }
      if (searchParamsSeparate.genre.length) {
        requestParams.push("genre=" + searchParamsSeparate.genre.join(","));
      }
      if (searchParamsSeparate.specialCode.length) {
        requestParams.push(
          "special_or=" + searchParamsSeparate.specialCode.join(",")
        );
      }
      if (searchParamsSeparate.otherOption.length) {
        requestParams.push(searchParamsSeparate.otherOption.join(","));
      }

      try {
        setIsLoading(true);
        const getShopList: HotPepperApiResponse = await getShopsDataClient({
          ...searchCode,
          isDetailArea,
          searchParams: requestParams,
        });
        if (requestAreaCode) {
          setAreaCode(requestAreaCode);
        }
        if (!getShopList.shop.length) {
          setSearchResultMsg("指定した条件のお店が見つかりませんでした");
          setShopsList([]);
          wordSearchReset();
          setSearchParams(requestParams);
          setAccordionOpen({ area: false, currentPosition: false });
          return;
        }
        setShopsList(getShopList.shop);
        setSearchParams(requestParams);
        setAccordionOpen({ area: false, currentPosition: false });
        setPageNate({
          count: Math.ceil(
            getShopList.results_available / DEFAULT_GET_DATA_COUNT
          ),
          currentPage: 1,
        });

        // NOTE:条件検索の時は店舗名の検索条件をリセット
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
      searchType,
      budgetParam,
      isDetailArea,
      searchParamsSeparate,
      setAreaCode,
      setIsLoading,
      setIsModal,
      setPageNate,
      setShopsList,
      setSearchParams,
      setAccordionOpen,
      wordSearchReset,
    ]
  );

  const setParams = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const code = e.currentTarget.value;
      const name = e.currentTarget.id;
      setSearchParamsSeparate((prev) => ({
        ...prev,
        [name]: prev[name].includes(code)
          ? prev[name].filter((param) => param !== code)
          : [...prev[name], code],
      }));
    },
    [setSearchParamsSeparate]
  );

  const budgetSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setBudgetParam(e.currentTarget.value);
    },
    [setBudgetParam]
  );

  return {
    areaCode,
    pageNate,
    shopsList,
    inputWord,
    budgetParam,
    isDetailArea,
    searchResultMsg,
    appliedSearchParams,
    searchParamsSeparate,
    register,
    handleSubmit,
    setPageNate,
    setShopsList,
    setParams,
    wordSearch,
    budgetSelect,
    executeSearch,
    wordSearchReset,
    searchParamsReset,
    setAppliedSearchParams,
  };
};
