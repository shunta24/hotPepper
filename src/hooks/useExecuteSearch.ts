import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { UseFormReset } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DEFAULT_GET_DATA_COUNT } from "@/constants/otherApiData";
import { getShopsDataClient } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import { appliedSearchParamsStateAtom } from "@/recoil/appliedSearchParams";
import { areaCodeStateAtom } from "@/recoil/areaCodeAtom";
import { loadingStateAtom } from "@/recoil/loadingAtom";
import { modalStateAtom } from "@/recoil/modalAtom";
import { pageNateStateAtom } from "@/recoil/pageNateAtom";
import { positionInfoAtom } from "@/recoil/positionInfoAtom";
import { searchParamsStateAtom } from "@/recoil/searchParamsAtom";
import { shopListStateAtom } from "@/recoil/shopListAtom";
import { HotPepperApiResponse } from "@/types/hotPepperApiResponse";

export const useExecuteSearch = (
  reset: UseFormReset<{
    searchWord: string;
  }>
) => {
  const positionData = useRecoilValue(positionInfoAtom);
  const areaCode = useRecoilValue(areaCodeStateAtom);
  const appliedSearchParams = useRecoilValue(appliedSearchParamsStateAtom);
  const setIsLoading = useSetRecoilState(loadingStateAtom);
  const setIsModal = useSetRecoilState(modalStateAtom);
  const setShopList = useSetRecoilState(shopListStateAtom);
  const setPageNate = useSetRecoilState(pageNateStateAtom);
  const setSearchParams = useSetRecoilState(searchParamsStateAtom);

  const [inputWord, setInputWord] = useState<string>("");
  const [budgetParam, setBudgetParam] = useState<string>("");
  const [searchResultMsg, setSearchResultMsg] =
    useState<string>("最初にエリアを選択してください");
  const [searchParamsSeparate, setSearchParamsSeparate] = useState<{
    [key: string]: string[];
  }>({ genre: [], specialCode: [], otherOption: [] });

  const searchType = useMemo(
    () => (areaCode ? { areaCode } : positionData),
    [areaCode, positionData]
  );

  const wordSearchReset = useCallback(() => {
    reset();
    setInputWord("");
  }, [reset]);

  const searchParamsReset = useCallback(() => {
    setBudgetParam("");
    setSearchParamsSeparate({ genre: [], specialCode: [], otherOption: [] });
    setSearchParams([]);
  }, [setSearchParams]);

  const wordSearch = useCallback(
    async (value: { searchWord: string }) => {
      try {
        setIsLoading(true);
        const getShopList: HotPepperApiResponse = await getShopsDataClient({
          ...searchType,
          shopName: value.searchWord,
        });

        if (!getShopList.shop.length) {
          setSearchResultMsg("指定した条件のお店が見つかりませんでした");
          setShopList([]);
          searchParamsReset();
          return;
        }
        setShopList(getShopList.shop);
        setPageNate({
          count: Math.ceil(
            getShopList.results_available / DEFAULT_GET_DATA_COUNT
          ),
          currentPage: 1,
        });
        setInputWord(value.searchWord);
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
      setIsLoading,
      setShopList,
      setPageNate,
      searchParamsReset,
      setIsModal,
    ]
  );

  const conditionSearch = useCallback(async () => {
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

    logger.info({
      selectedArea: appliedSearchParams.areaName,
      budget: budgetParam,
      genre: searchParamsSeparate.genre,
      specialCode: searchParamsSeparate.specialCode,
      otherOption: searchParamsSeparate.otherOption,
    });

    try {
      setIsLoading(true);
      const getShopList: HotPepperApiResponse = await getShopsDataClient({
        ...searchType,
        searchParams: requestParams,
      });

      if (!getShopList.shop.length) {
        setSearchResultMsg("指定した条件のお店が見つかりませんでした");
        setShopList([]);
        wordSearchReset();
        return;
      }
      setShopList(getShopList.shop);
      setSearchParams(requestParams);
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
  }, [
    budgetParam,
    searchType,
    appliedSearchParams.areaName,
    searchParamsSeparate,
    setIsLoading,
    setIsModal,
    setPageNate,
    setSearchParams,
    setShopList,
    wordSearchReset,
  ]);

  const setParams = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const code = e.currentTarget.value;
    const name = e.currentTarget.id;

    setSearchParamsSeparate((prev) => ({
      ...prev,
      [name]: prev[name].includes(code)
        ? prev[name].filter((param) => param !== code)
        : [...prev[name], code],
    }));
  }, []);

  const budgetSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setBudgetParam(e.currentTarget.value);
  }, []);

  return {
    wordSearch,
    conditionSearch,
    budgetSelect,
    setParams,
    wordSearchReset,
    searchParamsReset,
    inputWord,
    budgetParam,
    searchResultMsg,
    searchParamsSeparate,
  };
};
