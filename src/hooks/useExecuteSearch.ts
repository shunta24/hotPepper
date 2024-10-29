import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  DEFAULT_GET_DATA_COUNT,
  DISTANCE_DATA,
} from "@/constants/otherApiData";
import {
  extractingSelectedValue,
  searchTypeDetermine,
} from "@/functions/common";
import { getShopsDataClient } from "@/functions/communicateApi";
import { gtmConditionSearch, gtmWordSearch } from "@/functions/gtmEvent";
import { logger } from "@/functions/logger";
import { useRequestSearchParams } from "@/hooks/useRequestSearchParams";
import { accordionStateAtom } from "@/recoil/accordionAtom";
import { areaCodeStateAtom } from "@/recoil/areaCodeAtom";
import { detailAreaCodeStateAtom } from "@/recoil/detailAreaCodeAtom";
import { loadingStateAtom } from "@/recoil/loadingAtom";
import { modalStateAtom } from "@/recoil/modalAtom";
import { positionInfoAtom } from "@/recoil/positionInfoAtom";
import { searchParamsStateAtom } from "@/recoil/searchParamsAtom";
import { AreaData } from "@/types/areaData";
import { HotPepperApiResponse } from "@/types/hotPepperApiResponse";
import { SearchShopRequest } from "@/types/searchShopParams";

// TODO:ファイルが肥大化している ページごとにhooks分割 リファクタ
export const useExecuteSearch = (areaData: AreaData[]) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    isDetailArea,
    shopsList,
    pageNate,
    inputWord,
    budgetParam,
    requestParams,
    searchResultMsg,
    appliedSearchParams,
    searchParamsSeparate,
    setShopsList,
    setPageNate,
    setInputWord,
    setBudgetParam,
    setSearchResultMsg,
    setAppliedSearchParams,
    setSearchParamsSeparate,
  } = useRequestSearchParams();

  const { register, handleSubmit, reset } = useForm<{
    searchWord: string;
    // NOTE:defaultValuesだと設定した値がファーストレンダーでキャッシュされるので,値が変わっても反映されない時がある
    // 例) 画面描画時にrecoilに値が入っている状態で,値を変化させる処理を実行しても入力欄の値は変わらない
  }>({ values: { searchWord: inputWord } });

  const [accordionOpen, setAccordionOpen] = useRecoilState(accordionStateAtom);
  const [areaCode, setAreaCode] = useRecoilState(areaCodeStateAtom);
  const [positionData, setPositionData] = useRecoilState(positionInfoAtom);
  const [detailAreaCode, setDetailAreaCode] = useRecoilState(
    detailAreaCodeStateAtom
  );
  const setIsLoading = useSetRecoilState(loadingStateAtom);
  const setIsModal = useSetRecoilState(modalStateAtom);
  const setSearchParams = useSetRecoilState(searchParamsStateAtom);

  const resetAreaCode = useResetRecoilState(areaCodeStateAtom);
  const resetIsAccordionOpen = useResetRecoilState(accordionStateAtom);
  const resetDetailAreaCode = useResetRecoilState(detailAreaCodeStateAtom);

  // NOTE:現在地検索＋条件を加えた時の検索結果が0の場合に「条件を絞り込む」ボタンを活性化させるフラグ
  const [isCurrentSearchResult, setIsCurrentSearchResult] = useState(false);

  const detailAreaParams = useMemo(
    () => ({ areaCode: detailAreaCode.join(",") }),
    [detailAreaCode]
  );

  // NOTE:詳細エリアページで選択されたエリアが変わっているかの判定
  const selectedDetailArea = areaData.filter((data) =>
    detailAreaCode.includes(data.code)
  );
  const convertToSelectedDetailArea = selectedDetailArea
    .map((data) => data.name)
    .join("・");

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

  const searchParamsReset = useCallback(() => {
    setBudgetParam("");
    setSearchParamsSeparate({ genre: [], specialCode: [], otherOption: [] });
    setSearchParams([]);
  }, [setBudgetParam, setSearchParams, setSearchParamsSeparate]);

  const wordSearchReset = useCallback(() => {
    reset();
    setInputWord("");
  }, [reset, setInputWord]);

  const clickClearButton = () => {
    resetDetailAreaCode();
    setShopsList([]);
    setAccordionOpen((prev) => ({ ...prev, area: true }));
  };

  // TODO:詳細エリアページでは一発目でワード検索が可能だが、メインエリアページでは一度エリアを選択しないとワード検索ができない
  const wordSearch = useCallback(
    async (value: { searchWord: string }) => {
      const inputValue = value.searchWord;
      const searchParams = isDetailArea
        ? detailAreaParams
        : areaCode
          ? { areaCode }
          : positionData;

      try {
        setIsLoading(true);
        const getShopList: HotPepperApiResponse = await getShopsDataClient({
          ...searchParams,
          isDetailArea,
          shopName: inputValue,
        });

        if (
          isDetailArea &&
          appliedSearchParams.areaName !== convertToSelectedDetailArea
        ) {
          setAppliedSearchParams({
            distance: 0,
            areaName: convertToSelectedDetailArea,
          });
        }

        if (!getShopList.shop.length) {
          setSearchResultMsg("指定した条件のお店が見つかりませんでした");
          setShopsList([]);
          searchParamsReset();
          setInputWord(inputValue);
          gtmWordSearch(inputValue, isDetailArea);
          scrollRef?.current?.scrollIntoView();
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
        gtmWordSearch(inputValue, isDetailArea);
      } catch (error) {
        const errorMessage = error as Error;
        logger.error(errorMessage.message);
        setIsModal(true);
      } finally {
        setIsLoading(false);
      }
    },
    [
      isDetailArea,
      areaCode,
      positionData,
      detailAreaParams,
      appliedSearchParams,
      convertToSelectedDetailArea,
      setIsModal,
      setIsLoading,
      setShopsList,
      setPageNate,
      setInputWord,
      setAccordionOpen,
      searchParamsReset,
      setSearchResultMsg,
      setAppliedSearchParams,
    ]
  );

  const executeSearch = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      const requestAreaCode = e.currentTarget.id;
      const searchTypeValue = e.currentTarget.value;

      const searchType = searchTypeDetermine(searchTypeValue);

      let searchParams: SearchShopRequest;

      // NOTE:検索方法ごとに使用するパラメーターを設定
      if (!isDetailArea && searchType.isFilterSearch) {
        if (areaCode) {
          searchParams = { areaCode, searchParams: requestParams };
        } else {
          searchParams = { ...positionData, searchParams: requestParams };
        }
      } else if (!isDetailArea && searchType.isAreaSearch) {
        searchParams = {
          areaCode: requestAreaCode,
          searchParams: requestParams,
        };
      } else if (searchType.isCurrentPositionSearch) {
        searchParams = {
          ...positionData,
          range: requestAreaCode,
          searchParams: requestParams,
        };
      } else {
        // NOTE:詳細エリアページでの検索はここに入る
        searchParams = { ...detailAreaParams, searchParams: requestParams };
      }

      try {
        setIsLoading(true);
        const getShopList: HotPepperApiResponse = await getShopsDataClient({
          ...searchParams,
          isDetailArea,
        });

        // NOTE:エリア検索・現在地検索の際はrecoilに値を保存(詳細エリアページでは値を維持しないのでメインエリアページのみ)
        if (!isDetailArea) {
          if (searchType.isCurrentPositionSearch) {
            resetAreaCode();
            setPositionData((prev) => ({ ...prev, range: requestAreaCode }));
            setAppliedSearchParams({
              distance: Number(positionData.range),
              areaName:
                "現在地から" +
                extractingSelectedValue(DISTANCE_DATA, requestAreaCode)?.value,
            });
          } else if (searchType.isAreaSearch) {
            setAreaCode(requestAreaCode);
            setPositionData((prev) => ({ ...prev, range: "" }));
            setAppliedSearchParams((prev) => ({
              ...prev,
              areaName:
                extractingSelectedValue(areaData, requestAreaCode)?.name ?? "",
            }));
          }
        } else if (
          isDetailArea &&
          appliedSearchParams.areaName !== convertToSelectedDetailArea
        ) {
          setAppliedSearchParams({
            distance: 0,
            areaName: convertToSelectedDetailArea,
          });
        }

        if (!getShopList.shop.length) {
          setSearchResultMsg("指定した条件のお店が見つかりませんでした");
          setShopsList([]);
          wordSearchReset();
          setSearchParams(requestParams);
          setIsCurrentSearchResult(true);
          setAccordionOpen({ area: false, currentPosition: false });
          gtmConditionSearch(
            budgetParam,
            isDetailArea,
            searchType,
            searchParamsSeparate
          );
          scrollRef?.current?.scrollIntoView();
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
        gtmConditionSearch(
          budgetParam,
          isDetailArea,
          searchType,
          searchParamsSeparate
        );
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
      areaCode,
      positionData,
      isDetailArea,
      budgetParam,
      requestParams,
      detailAreaParams,
      appliedSearchParams,
      convertToSelectedDetailArea,
      searchParamsSeparate,
      setIsModal,
      setIsLoading,
      setShopsList,
      setPageNate,
      setAreaCode,
      resetAreaCode,
      setSearchParams,
      setAccordionOpen,
      wordSearchReset,
      setPositionData,
      setSearchResultMsg,
      setAppliedSearchParams,
    ]
  );

  return {
    scrollRef,
    areaCode,
    pageNate,
    shopsList,
    inputWord,
    budgetParam,
    isDetailArea,
    accordionOpen,
    detailAreaCode,
    searchResultMsg,
    appliedSearchParams,
    searchParamsSeparate,
    isCurrentSearchResult,
    register,
    handleSubmit,
    setParams,
    setPageNate,
    setShopsList,
    budgetSelect,
    wordSearch,
    executeSearch,
    searchParamsReset,
    setAccordionOpen,
    setDetailAreaCode,
    resetDetailAreaCode,
    resetIsAccordionOpen,
    clickClearButton,
  };
};
