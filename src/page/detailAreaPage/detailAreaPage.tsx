"use client";
import { Button, Pagination } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useExecuteSearch } from "@/hooks/useExecuteSearch";
import { usePageNate } from "@/hooks/usePageNate";
import { useResponsive } from "@/hooks/useResponsive";
import BudgetSelect from "@/page/commonParts/budgetSelect";
import ShopList from "@/page/commonParts/shopList";
import WordSearch from "@/page/commonParts/wordSearch";
import DetailAreaList from "@/page/detailAreaPage/parts/detailAreaList";
import { AreaData } from "@/types/areaData";

const DetailAreaPage = memo(({ areaData }: { areaData: AreaData[] }) => {
  const router = useRouter();

  const {
    scrollRef,
    accordionOpen,
    detailAreaCode,
    shopsList,
    pageNate,
    inputWord,
    budgetParam,
    isDetailArea,
    appliedSearchParams,
    searchResultMsg,
    searchParamsSeparate,
    register,
    handleSubmit,
    setParams,
    budgetSelect,
    setShopsList,
    setPageNate,
    wordSearch,
    executeSearch,
    searchParamsReset,
    resetDetailAreaCode,
    setAccordionOpen,
    setDetailAreaCode,
    clickClearButton,
  } = useExecuteSearch(areaData);

  const { clickPageNate } = usePageNate(
    inputWord,
    isDetailArea,
    setShopsList,
    setPageNate
  );

  const { isResponsive, isImageResponsive } = useResponsive();

  const isDisabledButton =
    budgetParam ||
    searchParamsSeparate.genre.length !== 0 ||
    searchParamsSeparate.specialCode.length !== 0 ||
    searchParamsSeparate.otherOption.length !== 0;

  const isDisabledFilterSearch = detailAreaCode.length;

  const detailAreaListProps = {
    areaData,
    detailAreaCode,
    accordionOpen: accordionOpen.area,
    setAccordionOpen,
    setDetailAreaCode,
  };

  const shopListProps = {
    shopsList,
    isResponsive,
    isDetailArea,
    isImageResponsive,
    searchResultMsg,
    scrollRef,
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
    isResponsive,
    isDisabledFilterSearch,
    wordSearch,
    handleSubmit,
    ...register("searchWord"),
  };

  const modalProps = {
    title: "通信エラー",
    contents: "時間をおいて再度お試しください🙇‍♂️",
  };

  useEffect(() => {
    return () => {
      resetDetailAreaCode();
      setAccordionOpen((prev) => ({ ...prev, area: false }));
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
        <DetailAreaList {...detailAreaListProps} />
      </div>

      <div className="text-right [&>button]:mx-2">
        <Button
          id="resetDetailAreaCheckBox"
          variant="outlined"
          disabled={!detailAreaCode.length}
          size={isResponsive ? "medium" : "small"}
          onClick={clickClearButton}
        >
          クリア
        </Button>
        <Button
          value={SEARCH_TYPE.area}
          variant="contained"
          disabled={!detailAreaCode.length}
          size={isResponsive ? "medium" : "small"}
          onClick={executeSearch}
        >
          検索
        </Button>
      </div>

      <div className="my-3 flex">
        <p>
          <span className="text-sm font-bold sm:text-base">
            選択中のエリア:
          </span>
          <span className="text-sm sm:text-base">
            {appliedSearchParams.areaName}
          </span>
        </p>

        <div className="ml-2 self-end md:ml-20">
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
          id="filterResetDP"
          onClick={searchParamsReset}
          variant="contained"
          disabled={!isDisabledButton}
          size={isResponsive ? "medium" : "small"}
        >
          リセット
        </Button>

        <Button
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
            id="pageNationDP"
            count={pageNate.count}
            variant="outlined"
            shape="rounded"
            onChange={clickPageNate}
            page={pageNate.currentPage}
            sx={{ display: "inline-block" }}
          />
        </div>
      )}

      <div className="my-10 text-center [&>button]:mx-4">
        <Button
          id="returnAreaSearchPage"
          variant="contained"
          className="hover:opacity-70"
          onClick={() => {
            // NOTE:router.back()で戻ったページのページビューイベント(履歴の変更)は2回発火するのでGTMのトリガーで条件指定
            router.back();
          }}
        >
          前のページに戻る
        </Button>

        <Link id="returnTopPageDP" href="/" className="hover:opacity-70">
          <Button variant="contained">TOPに戻る</Button>
        </Link>
      </div>
    </main>
  );
});

export default DetailAreaPage;
DetailAreaPage.displayName = "DetailAreaPage";
