"use client";
import { Button, Pagination, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { memo, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
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
import { accordionStateAtom } from "@/recoil/accordionAtom";
import { appliedSearchParamsStateAtom } from "@/recoil/appliedSearchParams";
import { areaCodeStateAtom } from "@/recoil/areaCodeAtom";
import { pageNateStateAtom } from "@/recoil/pageNateAtom";
import { positionInfoAtom } from "@/recoil/positionInfoAtom";
import { shopListStateAtom } from "@/recoil/shopListAtom";
import { AreaData } from "@/types/areaData";
import AreaList from "./parts/areaList";
import BudgetSelect from "./parts/budgetSelect";
import FindFromCurrent from "./parts/findFromCurrent";
import ShopList from "./parts/shopList";
import WordSearch from "./parts/wordSearch";

const MainPage = memo(({ areaData }: { areaData: AreaData[] }) => {
  const areaCode = useRecoilValue(areaCodeStateAtom);
  const shopsList = useRecoilValue(shopListStateAtom);
  const positionData = useRecoilValue(positionInfoAtom);
  const appliedSearchParams = useRecoilValue(appliedSearchParamsStateAtom);
  const pageNate = useRecoilValue(pageNateStateAtom);
  const [isAccordionOpen, setIsAccordionOpen] =
    useRecoilState(accordionStateAtom);

  const isResponsive = useMediaQuery("(min-width:640px)");
  const isImageSize = useMediaQuery("(min-width:450px)");

  const scrollRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset } = useForm<{
    searchWord: string;
  }>();

  const {
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
  } = useExecuteSearch(reset);

  const { clickPageNate } = usePageNate(inputWord);

  const { changeArea } = useAreaSearch(
    { areaData },
    wordSearchReset,
    searchParamsReset
  );
  const { currentPositionMsg, isCurrentSearchResult, searchFindCurrent } =
    useCurrentPositionSearch(wordSearchReset, searchParamsReset);

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
    isAccordionOpen: isAccordionOpen.area,
    setIsAccordionOpen,
    changeArea,
  };

  const shopListProps = {
    shopsList,
    isResponsive,
    isImageSize,
    searchResultMsg,
    scrollRef,
  };

  const findFromCurrentProps = {
    selectedDistance: appliedSearchParams.distance,
    isAccordionOpen: isAccordionOpen.currentPosition,
    currentPositionMsg,
    isResponsive,
    positionData,
    setIsAccordionOpen,
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
        <p>
          <span className="text-sm font-bold sm:text-base">
            選択中のエリア:
          </span>
          <span className="text-sm sm:text-base">
            {appliedSearchParams.areaName}
          </span>
        </p>

        <div className="ml-2 self-center md:ml-20">
          <WordSearch {...wordSearchProps} />
        </div>
      </div>

      <div className="flex w-full">
        <div className="py-2 sm:p-2">
          <BudgetSelect {...budgetProps} />
        </div>
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
