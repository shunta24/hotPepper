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
import { shopListStateAtom } from "@/recoil/shopListAtom";
import { ShopData } from "@/types/shopData";

export const useSearchRequestParams = () => {
  const currentPage = usePathname();
  const isDetailArea = currentPage !== "/main";

  // NOTE:詳細エリア検索ページからメインページに戻った際は検索された状態を維持しておきたいので
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
  }>({ areaName: "未選択" });

  const [searchParamsSeparateMp, setSearchParamsSeparateMp] = useRecoilState(
    searchParamsSeparateStateAtom
  );
  const [searchParamsSeparateDp, setSearchParamsSeparateDp] = useState<{
    [key: string]: string[];
  }>({ genre: [], specialCode: [], otherOption: [] });

  return {
    isDetailArea,
    shopsList: isDetailArea ? shopsListDp : shopsListMp,
    pageNate: isDetailArea ? pageNateDp : pageNateMp,
    inputWord: isDetailArea ? inputWordDp : inputWordMp,
    budgetParam: isDetailArea ? budgetParamDp : budgetParamMp,
    appliedSearchParams: isDetailArea
      ? appliedSearchParamsDp
      : appliedSearchParamsMp,
    searchParamsSeparate: isDetailArea
      ? searchParamsSeparateDp
      : searchParamsSeparateMp,
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
  };
};
