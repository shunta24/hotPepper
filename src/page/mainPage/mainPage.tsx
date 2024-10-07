"use client";
import { Button, Pagination } from "@mui/material";
import Link from "next/link";
import { memo, useEffect, useRef } from "react";
import CheckBoxArray from "@/components/checkBoxArray";
import Loading from "@/components/loading";
import Modals from "@/components/modal";
import {
  SPECIAL_CODE_DATA,
  GENRE_DATA,
  OTHER_OPTIONS_DATA,
} from "@/constants/otherApiData";
import { useAreaSearch } from "@/hooks/useAreaSearch";
import { useCurrentPositionSearch } from "@/hooks/useCurrentPositionSearch";
import { useExecuteSearch } from "@/hooks/useExecuteSearch";
import { usePageNate } from "@/hooks/usePageNate";
import { useResponsive } from "@/hooks/useResponsive";
import { AreaData } from "@/types/areaData";
import AreaList from "./parts/areaList";
import BudgetSelect from "./parts/budgetSelect";
import FindFromCurrent from "./parts/findFromCurrent";
import ShopList from "./parts/shopList";
import WordSearch from "./parts/wordSearch";

const MainPage = memo(({ areaData }: { areaData: AreaData[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    areaCode,
    pageNate,
    shopsList,
    inputWord,
    budgetParam,
    isDetailArea,
    searchResultMsg,
    searchParamsSeparate,
    register,
    handleSubmit,
    wordSearch,
    conditionSearch,
    budgetSelect,
    setParams,
    setShopsList,
    setPageNate,
    wordSearchReset,
    searchParamsReset,
  } = useExecuteSearch();

  const {
    accordionOpen,
    appliedSearchParams,
    changeArea,
    setAccordionOpen,
    resetIsAccordionOpen,
  } = useAreaSearch({ areaData }, wordSearchReset, searchParamsReset);

  const { isResponsive, isImageResponsive, isDetailAreaButton } =
    useResponsive();

  const { clickPageNate } = usePageNate(
    inputWord,
    isDetailArea,
    setShopsList,
    setPageNate
  );

  const {
    positionData,
    currentPositionMsg,
    isCurrentSearchResult,
    searchFindCurrent,
  } = useCurrentPositionSearch(wordSearchReset, searchParamsReset);

  const isDisabledReset =
    budgetParam ||
    searchParamsSeparate.genre.length !== 0 ||
    searchParamsSeparate.specialCode.length !== 0 ||
    searchParamsSeparate.otherOption.length !== 0;

  const isDisabledConditionSearch =
    areaCode || shopsList.length || isCurrentSearchResult;

  const areaListProps = {
    areaData,
    areaCode,
    isResponsive,
    isAccordionOpen: accordionOpen.area,
    setAccordionOpen,
    changeArea,
  };

  const shopListProps = {
    shopsList,
    isResponsive,
    isImageResponsive,
    isDetailArea,
    searchResultMsg,
    scrollRef,
  };

  const findFromCurrentProps = {
    selectedDistance: appliedSearchParams.distance,
    isAccordionOpen: accordionOpen.currentPosition,
    currentPositionMsg,
    isResponsive,
    positionData,
    setAccordionOpen,
    searchFindCurrent,
  };

  const checkBoxProps = [
    {
      id: "genre",
      displayData: GENRE_DATA,
      state: searchParamsSeparate.genre,
      setState: setParams,
    },
    {
      id: "specialCode",
      displayData: SPECIAL_CODE_DATA,
      state: searchParamsSeparate.specialCode,
      setState: setParams,
    },
    {
      id: "otherOption",
      displayData: OTHER_OPTIONS_DATA,
      state: searchParamsSeparate.otherOption,
      setState: setParams,
    },
  ];

  const budgetProps = {
    budgetParam,
    budgetSelect,
  };

  const wordSearchProps = {
    isDisabledConditionSearch,
    isResponsive,
    wordSearch,
    handleSubmit,
    ...register("searchWord"),
  };

  const modalProps = {
    title: "通信エラー",
    contents: "時間をおいて再度お試しください🙇‍♂️",
  };

  useEffect(() => {
    // NOTE:mainページから離れた際にアコーディオンの状態をリセット
    return () => {
      resetIsAccordionOpen();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // NOTE:検索してデータを再取得する度に定位置にスクロールさせる
    // エリアや検索ボタン押下時にスクロール処理を入れるとページを表示して最初の1回目の検索時のスクロール位置がズレる
    // 初回は表示させるデータが0でページ全体の高さが低いためスクロールの発火タイミングをズラした
    // if文はページリロード時にスクロールするのを防ぐ
    if (shopsList.length !== 0) {
      scrollRef?.current?.scrollIntoView();
    }
  }, [shopsList]);

  return (
    <main className="p-2">
      <Loading />
      <Modals {...modalProps} />

      <div className="mb-3">
        <AreaList {...areaListProps} />
      </div>

      <FindFromCurrent {...findFromCurrentProps} />

      <div className="my-3 flex">
        <div>
          <p className="mb-3">
            <span className="text-sm font-bold sm:text-base">
              選択中のエリア:
            </span>
            <span className="text-sm sm:text-base">
              {appliedSearchParams.areaName}
            </span>
          </p>

          {!isDetailAreaButton && (
            <Link
              className={`ml-4 self-center hover:opacity-70 ${!areaCode && "pointer-events-none"}`}
              href={{
                pathname: "/main_filtering",
                query: { detailArea: areaCode },
              }}
            >
              <Button
                variant="contained"
                disabled={!areaCode}
                size={isResponsive ? "medium" : "small"}
              >
                もっとエリアを絞る
              </Button>
            </Link>
          )}
        </div>

        <div className="ml-2  md:ml-20">
          <WordSearch {...wordSearchProps} />
        </div>
      </div>

      <div className="flex w-full justify-between">
        <div className="py-2 sm:p-2">
          <BudgetSelect {...budgetProps} />
        </div>

        {isDetailAreaButton && (
          <Link
            className={`self-center  hover:opacity-70 md:mr-20 ${!areaCode && "pointer-events-none"}`}
            href={{
              pathname: "/main_filtering",
              query: { detailArea: areaCode },
            }}
          >
            <Button
              variant="contained"
              disabled={!areaCode}
              size={isResponsive ? "medium" : "small"}
            >
              もっとエリアを絞る
            </Button>
          </Link>
        )}
      </div>

      {checkBoxProps.map((data, index) => (
        <div className="p-1 sm:p-2" key={index}>
          <CheckBoxArray {...data} />
        </div>
      ))}

      <div ref={scrollRef} className="my-2 space-x-8 text-center sm:my-5">
        <Button
          onClick={searchParamsReset}
          variant="contained"
          disabled={!isDisabledReset}
          size={isResponsive ? "medium" : "small"}
        >
          リセット
        </Button>

        <Button
          variant="contained"
          disabled={!isDisabledConditionSearch}
          onClick={conditionSearch}
          size={isResponsive ? "medium" : "small"}
        >
          条件を絞り込む
        </Button>
      </div>

      <section>
        <ShopList {...shopListProps} />
      </section>

      {shopsList.length !== 0 && (
        <div className="my-5 text-center">
          <Pagination
            count={pageNate.count}
            variant="outlined"
            shape="rounded"
            onChange={clickPageNate}
            page={pageNate.currentPage}
            sx={{ display: "inline-block" }}
          />
        </div>
      )}

      <div className="my-10 text-center hover:opacity-70">
        <Link href="/" className="">
          <Button variant="contained">TOPに戻る</Button>
        </Link>
      </div>
    </main>
  );
});

export default MainPage;
MainPage.displayName = "MainPage";
