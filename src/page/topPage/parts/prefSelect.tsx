"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import { memo, useEffect } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import Accordion from "@/components/accordion";
import Loading from "@/components/loading";
import { AREA_NAME, PREFECTURES_DATA } from "@/constants/prefecturesData";
import { appliedSearchParamsStateAtom } from "@/recoil/appliedSearchParams";
import { areaCodeStateAtom } from "@/recoil/areaCodeAtom";
import { loadingStateAtom } from "@/recoil/loadingAtom";
import {
  inputWordStateAtom,
  budgetParamStateAtom,
  searchParamsSeparateStateAtom,
} from "@/recoil/searchParamsAtom";
import { shopListStateAtom } from "@/recoil/shopListAtom";

export const PrefSelect = memo(() => {
  const shopList = useRecoilValue(shopListStateAtom);
  const setIsLoading = useSetRecoilState(loadingStateAtom);
  const resetShopList = useResetRecoilState(shopListStateAtom);
  const resetAreaCode = useResetRecoilState(areaCodeStateAtom);
  const resetInputWord = useResetRecoilState(inputWordStateAtom);
  const resetBudgetParam = useResetRecoilState(budgetParamStateAtom);
  const resetSearchParamsSeparate = useResetRecoilState(
    searchParamsSeparateStateAtom
  );
  const resetSelectedAreaName = useResetRecoilState(
    appliedSearchParamsStateAtom
  );

  useEffect(() => {
    // NOTE:遷移先のURL判定が不可なので,戻るボタンでトップに戻った際はrecoilリセット
    if (shopList.length !== 0) {
      resetShopList();
      resetAreaCode();
      resetInputWord();
      resetBudgetParam();
      resetSelectedAreaName();
      resetSearchParamsSeparate();
    }
    // NOTE:loadingが残ってしまうのでページ遷移時に消す
    return () => {
      setIsLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Loading />
      {AREA_NAME.map((areaName, index) => (
        // NOTE:/80→ bg-colorにopacityを設定する書き方
        <div className="bg-white/80" key={index}>
          <Accordion title={areaName}>
            {PREFECTURES_DATA[index].map((prefName) => (
              <Link
                className="p-2"
                href={{
                  pathname: "/main",
                  query: { area: prefName.params },
                }}
                key={prefName.params}
                // NOTE:一度エリアを選択したらページ遷移するまで他のボタンを押せないようにする
                onClick={() => setIsLoading(true)}
              >
                <Button
                  id={prefName.params}
                  variant="contained"
                  sx={{ marginTop: "10px" }}
                  key={prefName.params}
                >
                  {prefName.name}
                </Button>
              </Link>
            ))}
          </Accordion>
        </div>
      ))}
    </>
  );
});

export default PrefSelect;
PrefSelect.displayName = "AreaSelect";
