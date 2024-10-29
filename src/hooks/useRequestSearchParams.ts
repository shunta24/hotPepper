import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { appliedSearchParamsStateAtom } from "@/recoil/appliedSearchParams";
import { pageNateStateAtom } from "@/recoil/pageNateAtom";
import {
  inputWordStateAtom,
  budgetParamStateAtom,
  searchParamsSeparateStateAtom,
} from "@/recoil/searchParamsAtom";
import { searchResultMsgAtom } from "@/recoil/searchResultMsgAtom";
import { shopListStateAtom } from "@/recoil/shopListAtom";
import { ShopData } from "@/types/shopData";

export const useRequestSearchParams = () => {
  const currentPage = usePathname();
  const isDetailArea = currentPage !== "/main";

  // NOTE:詳細エリア検索ページからメインエリアページに戻った際は検索された状態を維持しておきたいので
  // メインページの値はrecoil,詳細ページから離れた際は値は全てリセットでOKなのでuseStateを使用
  const [shopsListMp, setShopsListMp] = useRecoilState(shopListStateAtom);
  const [shopsListDp, setShopsListDp] = useState<ShopData[]>([]);

  const [pageNateMp, setPageNateMp] = useRecoilState(pageNateStateAtom);
  const [pageNateDp, setPageNateDp] = useState<{
    count: number;
    currentPage: number;
  }>({ count: 0, currentPage: 1 });

  const [inputWordMp, setInputWordMp] = useRecoilState(inputWordStateAtom);
  const [inputWordDp, setInputWordDp] = useState<string>("");

  const [budgetParamMp, setBudgetParamMp] =
    useRecoilState(budgetParamStateAtom);
  const [budgetParamDp, setBudgetParamDp] = useState<string>("");

  const [appliedSearchParamsMp, setAppliedSearchParamsMp] = useRecoilState(
    appliedSearchParamsStateAtom
  );
  const [appliedSearchParamsDp, setAppliedSearchParamsDp] = useState<{
    areaName: string;
    distance: number;
  }>({ areaName: "未選択", distance: 0 });

  const [searchParamsSeparateMp, setSearchParamsSeparateMp] = useRecoilState(
    searchParamsSeparateStateAtom
  );
  const [searchParamsSeparateDp, setSearchParamsSeparateDp] = useState<{
    [key: string]: string[];
  }>({ genre: [], specialCode: [], otherOption: [] });

  const [searchResultMsgMp, setSearchResultMsgMp] =
    useRecoilState(searchResultMsgAtom);
  const [searchResultMsgDp, setSearchResultMsgDp] =
    useState<string>("エリアを選択してください");

  const budgetParam = isDetailArea ? budgetParamDp : budgetParamMp;
  const searchParamsSeparate = isDetailArea
    ? searchParamsSeparateDp
    : searchParamsSeparateMp;

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

  return {
    isDetailArea,
    requestParams,
    budgetParam,
    searchParamsSeparate,

    shopsList: isDetailArea ? shopsListDp : shopsListMp,
    pageNate: isDetailArea ? pageNateDp : pageNateMp,
    inputWord: isDetailArea ? inputWordDp : inputWordMp,
    searchResultMsg: isDetailArea ? searchResultMsgDp : searchResultMsgMp,
    appliedSearchParams: isDetailArea
      ? appliedSearchParamsDp
      : appliedSearchParamsMp,

    setShopsList: isDetailArea ? setShopsListDp : setShopsListMp,
    setPageNate: isDetailArea ? setPageNateDp : setPageNateMp,
    setInputWord: isDetailArea ? setInputWordDp : setInputWordMp,
    setBudgetParam: isDetailArea ? setBudgetParamDp : setBudgetParamMp,
    setAppliedSearchParams: isDetailArea
      ? setAppliedSearchParamsDp
      : setAppliedSearchParamsMp,
    setSearchParamsSeparate: isDetailArea
      ? setSearchParamsSeparateDp
      : setSearchParamsSeparateMp,
    setSearchResultMsg: isDetailArea
      ? setSearchResultMsgDp
      : setSearchResultMsgMp,
  };
};
