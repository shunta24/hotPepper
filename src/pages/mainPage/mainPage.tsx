"use client";
import { Button, Pagination } from "@mui/material";
import Link from "next/link";
import { memo } from "react";
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
    isAccordionOpen: isAccordionOpen.area,
    setIsAccordionOpen,
    changeArea,
  };

  const shopListProps = {
    shopsList,
    searchResultMsg,
  };

  const findFromCurrentProps = {
    selectedDistance: appliedSearchParams.distance,
    isAccordionOpen: isAccordionOpen.currentPosition,
    currentPositionMsg,
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
    wordSearch,
    handleSubmit,
    ...register("searchWord"),
  };

  return (
    <main className="p-2">
      <Loading />
      <Modals />

      <div className="mb-3">
        <AreaList {...areaListProps} />
      </div>
      <FindFromCurrent {...findFromCurrentProps} />

      <div className="flex">
        <p className="p-3">
          <span className="font-bold">選択中のエリア：</span>
          <span>{appliedSearchParams.areaName}</span>
        </p>

        <div className="ml-20 self-center">
          <WordSearch {...wordSearchProps} />
        </div>
      </div>

      <div className="flex w-full">
        <div className="px-2">
          <BudgetSelect {...budgetProps} />
        </div>
      </div>

      {checkBoxProps.map((data, index) => (
        <div className="p-2" key={index}>
          <CheckBoxArray {...data} />
        </div>
      ))}

      <div className="my-5 space-x-8 text-center">
        <Button
          onClick={searchParamsReset}
          variant="contained"
          disabled={!isDisabledReset}
        >
          リセット
        </Button>

        <Button
          variant="contained"
          disabled={!isDisabledConditionSearch}
          onClick={conditionSearch}
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
