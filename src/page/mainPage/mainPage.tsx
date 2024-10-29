"use client";
import { Button, Pagination } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { memo, useEffect } from "react";
import CheckBoxArray from "@/components/checkBoxArray";
import Loading from "@/components/loading";
import Modals from "@/components/modal";
import { SEARCH_TYPE } from "@/constants/buttonValue";
import {
  SPECIAL_CODE_DATA,
  GENRE_DATA,
  OTHER_OPTIONS_DATA,
} from "@/constants/otherApiData";
import { useCurrentPositionSearch } from "@/hooks/useCurrentPositionSearch";
import { useExecuteSearch } from "@/hooks/useExecuteSearch";
import { usePageNate } from "@/hooks/usePageNate";
import { useResponsive } from "@/hooks/useResponsive";
import BudgetSelect from "@/page/commonParts/budgetSelect";
import ShopList from "@/page/commonParts/shopList";
import WordSearch from "@/page/commonParts/wordSearch";
import AreaList from "@/page/mainPage/parts/areaList";
import FindFromCurrent from "@/page/mainPage/parts/findFromCurrent";
import { AreaData } from "@/types/areaData";

const MainPage = memo(({ areaData }: { areaData: AreaData[] }) => {
  const searchParams = useSearchParams();
  const queryParams = searchParams.get("areaCode");

  const {
    scrollRef,
    areaCode,
    pageNate,
    shopsList,
    inputWord,
    budgetParam,
    isDetailArea,
    accordionOpen,
    searchResultMsg,
    searchParamsSeparate,
    isCurrentSearchResult,
    appliedSearchParams,
    register,
    handleSubmit,
    wordSearch,
    executeSearch,
    budgetSelect,
    setParams,
    setShopsList,
    setPageNate,
    searchParamsReset,
    setAccordionOpen,
    resetIsAccordionOpen,
  } = useExecuteSearch(areaData);

  const { isResponsive, isImageResponsive, isDetailAreaButton } =
    useResponsive();

  const { clickPageNate } = usePageNate(
    inputWord,
    isDetailArea,
    setShopsList,
    setPageNate
  );

  const { positionData, currentPositionMsg } = useCurrentPositionSearch();

  const isDisabledReset =
    budgetParam ||
    searchParamsSeparate.genre.length !== 0 ||
    searchParamsSeparate.specialCode.length !== 0 ||
    searchParamsSeparate.otherOption.length !== 0;

  const isDisabledFilterSearch =
    areaCode || shopsList.length || isCurrentSearchResult;

  const areaListProps = {
    areaData,
    areaCode,
    isResponsive,
    isAccordionOpen: accordionOpen.area,
    setAccordionOpen,
    executeSearch,
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
    executeSearch,
    setAccordionOpen,
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
    isDisabledFilterSearch,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              id="detailAreaButton"
              className={`ml-4 self-center hover:opacity-70 ${!areaCode && "pointer-events-none"}`}
              href={{
                pathname: "/main_filtering",
                query: { areaCode: queryParams, detailAreaCode: areaCode },
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
            id="detailAreaButton"
            className={`self-center hover:opacity-70 md:mr-20 ${!areaCode && "pointer-events-none"}`}
            href={{
              pathname: "/main_filtering",
              query: { areaCode: queryParams, detailAreaCode: areaCode },
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
          id="filterReset"
          className="hover:opacity-70"
          onClick={searchParamsReset}
          variant="contained"
          disabled={!isDisabledReset}
          size={isResponsive ? "medium" : "small"}
        >
          リセット
        </Button>

        <Button
          className="hover:opacity-70"
          value={SEARCH_TYPE.filter}
          variant="contained"
          disabled={!isDisabledFilterSearch}
          onClick={executeSearch}
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
            id="pageNation"
            count={pageNate.count}
            variant="outlined"
            shape="rounded"
            onChange={clickPageNate}
            page={pageNate.currentPage}
            sx={{ display: "inline-block" }}
          />
        </div>
      )}

      <Link
        id="returnTopPage"
        href="/"
        className="my-10 block text-center hover:opacity-70"
      >
        <Button variant="contained">TOPに戻る</Button>
      </Link>
    </main>
  );
});

export default MainPage;
MainPage.displayName = "MainPage";
