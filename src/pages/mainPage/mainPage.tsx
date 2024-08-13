"use client";

import { Button, Pagination } from "@mui/material";
import Link from "next/link";
import { memo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import CheckBoxArray from "@/components/checkBoxArray";
import Loading from "@/components/loading";
import Modals from "@/components/modal";
import {
  SPECIAL_CODE_DATA,
  DEFAULT_GET_DATA_COUNT,
  GENRE_DATA,
  OTHER_OPTIONS_DATA,
} from "@/constants/otherApiData";
import { getShopsDataClient } from "@/functions/communicateApi";
import { logger } from "@/functions/logger";
import { loadingStateAtom } from "@/recoil/loadingAtom";
import { modalStateAtom } from "@/recoil/modalAtom";
import { positionInfoAtom } from "@/recoil/positionInfoAtom";
import { AreaData } from "@/types/areaData";
import { HotPepperApiResponse } from "@/types/hotPepperApiResponse";
import { ShopData } from "@/types/shopData";
import AreaList from "./parts/areaList";
import BudgetSelect from "./parts/budgetSelect";
import FindFromCurrent from "./parts/findFromCurrent";
import ShopList from "./parts/shopList";
import WordSearch from "./parts/wordSearch";

const MainPage = memo(({ areaData }: { areaData: AreaData[] }) => {
  const [shopsList, setShopList] = useState<ShopData[] | []>([]);
  const [pageNate, setPageNate] = useState<number>(0);
  const [currentPageNate, setCurrentPageNate] = useState<number>(1);
  const [selectedDistance, setSelectedDistance] = useState<number>(0);
  const [areaCode, setAreaCode] = useState<string>("");
  const [budgetParam, setBudgetParam] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [inputWord, setInputWord] = useState<string>("");
  const [searchResultMsg, setSearchResultMsg] =
    useState<string>("最初にエリアを選択してください");
  const [genreParams, setGenreParams] = useState<string[]>([]);
  const [specialCodeParams, setSpecialCodeParams] = useState<string[]>([]);
  const [otherOptionParams, setOtherOptionParams] = useState<string[]>([]);
  const [searchConditions, setSearchConditions] = useState<string[]>([]);

  // TODO:アコーディオンの自動開閉によりスクロール位置がズレる
  const scrollPosition = useRef<HTMLDivElement>(null);

  const setIsLoading = useSetRecoilState(loadingStateAtom);
  const setIsModal = useSetRecoilState(modalStateAtom);
  const positionData = useRecoilValue(positionInfoAtom);

  const { register, handleSubmit, reset } = useForm<{
    searchWord: string;
  }>();

  const isDisabledReset =
    budgetParam ||
    specialCodeParams.length !== 0 ||
    genreParams.length !== 0 ||
    otherOptionParams.length !== 0;

  const isDisabledConditionSearch = areaCode || shopsList.length;
  const searchType = areaCode ? { areaCode } : positionData;

  const clickPageNate = async (
    _e: React.ChangeEvent<unknown>,
    page: number
  ) => {
    const startNumber = 1 + DEFAULT_GET_DATA_COUNT * (page - 1);

    try {
      setIsLoading(true);
      const getShopList: HotPepperApiResponse = await getShopsDataClient(
        areaCode
          ? { areaCode, shopName: inputWord, searchConditions }
          : positionData,
        startNumber
      );
      setShopList(getShopList.shop);
      setCurrentPageNate(page);
      scrollPosition?.current?.scrollIntoView();
    } catch (error) {
      const errorMessage = error as Error;
      logger.error(errorMessage.message);
      setIsModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const executeSearch = async () => {
    const requestParams = [];

    if (budgetParam) {
      requestParams.push("budget=" + budgetParam);
    }

    if (genreParams.length) {
      requestParams.push("genre=" + genreParams.join(","));
    }

    if (specialCodeParams.length) {
      requestParams.push("special_or=" + specialCodeParams.join(","));
    }

    if (otherOptionParams.length) {
      requestParams.push(otherOptionParams.join(","));
    }

    setSearchConditions(requestParams);

    logger.info({
      selectedArea,
      budgetParam,
      genreParams,
      specialCodeParams,
      otherOptionParams,
    });

    try {
      setIsLoading(true);
      const getShopList: HotPepperApiResponse = await getShopsDataClient({
        ...searchType,
        searchConditions: requestParams,
      });

      if (!getShopList.shop.length) {
        setSearchResultMsg("指定した条件のお店が見つかりませんでした");
      }
      setShopList(getShopList.shop);
      setPageNate(
        Math.ceil(getShopList.results_available / DEFAULT_GET_DATA_COUNT)
      );
      setCurrentPageNate(1);

      // NOTE:条件検索の時は店舗名の検索条件をリセット
      wordSearchReset();
      scrollPosition?.current?.scrollIntoView();
    } catch (error) {
      const errorMessage = error as Error;
      logger.error(errorMessage.message);
      setIsModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const wordSearch = async (value: { searchWord: string }) => {
    try {
      setIsLoading(true);
      const getShopList: HotPepperApiResponse = await getShopsDataClient({
        ...searchType,
        searchConditions,
        shopName: value.searchWord,
      });

      if (!getShopList.shop.length) {
        setSearchResultMsg("指定した条件のお店が見つかりませんでした");
      }
      setShopList(getShopList.shop);
      setPageNate(
        Math.ceil(getShopList.results_available / DEFAULT_GET_DATA_COUNT)
      );
      setCurrentPageNate(1);
      setInputWord(value.searchWord);

      // NOTE:店舗名検索の時はその他の検索条件をリセット
      conditionSearchReset();
      scrollPosition?.current?.scrollIntoView();
    } catch (error) {
      const errorMessage = error as Error;
      logger.error(errorMessage.message);
      setIsModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const conditionSearchReset = () => {
    setBudgetParam("");
    setGenreParams([]);
    setSpecialCodeParams([]);
    setOtherOptionParams([]);
    setSearchConditions([]);
  };

  const wordSearchReset = () => {
    reset();
    setInputWord("");
  };

  const areaListProps = {
    areaData,
    areaCode,
    scrollPosition,
    setIsLoading,
    setIsModal,
    setPageNate,
    setCurrentPageNate,
    setSelectedDistance,
    setShopList,
    setAreaCode,
    setSelectedArea,
    conditionSearchReset,
    wordSearchReset,
  };

  const shopListProps = {
    shopsList,
    searchResultMsg,
    scrollPosition,
  };

  const findFromCurrentProps = {
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
  };

  const checkBoxProps = [
    { displayData: GENRE_DATA, state: genreParams, setState: setGenreParams },
    {
      displayData: SPECIAL_CODE_DATA,
      state: specialCodeParams,
      setState: setSpecialCodeParams,
    },
    {
      displayData: OTHER_OPTIONS_DATA,
      state: otherOptionParams,
      setState: setOtherOptionParams,
    },
  ];

  const budgetProps = {
    budgetParam,
    setBudgetParam,
  };

  const wordSearchProps = {
    shopsList,
    isDisabledConditionSearch,
    wordSearch,
    handleSubmit,
    ...register("searchWord"),
  };
  return (
    <>
      <Loading />
      <Modals />

      <AreaList {...areaListProps} />
      <FindFromCurrent {...findFromCurrentProps} />
      <p>
        <span className="font-bold">選択中のエリア：</span>
        <span>{selectedArea}</span>
      </p>
      <WordSearch {...wordSearchProps} />

      <BudgetSelect {...budgetProps} />

      {checkBoxProps.map((data, index) => (
        <div className="m-5" key={index}>
          <CheckBoxArray {...data} />
        </div>
      ))}

      <div className="my-5 space-x-8 text-center">
        <Button
          onClick={conditionSearchReset}
          variant="contained"
          disabled={!isDisabledReset}
        >
          リセット
        </Button>

        <Button
          variant="contained"
          disabled={!isDisabledConditionSearch}
          onClick={executeSearch}
        >
          条件を絞り込む
        </Button>
      </div>

      <ShopList {...shopListProps} />

      {shopsList.length !== 0 && (
        <div className="my-5 text-center">
          <Pagination
            count={pageNate}
            variant="outlined"
            shape="rounded"
            onChange={clickPageNate}
            page={currentPageNate}
            sx={{ display: "inline-block" }}
          />
        </div>
      )}

      <div className="my-10 text-center hover:opacity-70">
        <Link href="/" className="">
          <Button variant="contained">TOPに戻る</Button>
        </Link>
      </div>
    </>
  );
});

export default MainPage;
MainPage.displayName = "MainPage";
