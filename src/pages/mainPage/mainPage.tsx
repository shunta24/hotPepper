"use client";

import { memo, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { positionInfoAtom } from "@/recoil/positionInfoAtom";
import { loadingStateAtom } from "@/recoil/loadingAtom";
import { modalStateAtom } from "@/recoil/modalAtom";
import { Button, Pagination } from "@mui/material";
import { ShopData } from "@/types/shopData";
import { AreaData } from "@/types/areaData";
import Loading from "@/components/loading";
import Modals from "@/components/modal";
import CheckBoxArray from "@/components/checkBoxArray";
import { logger } from "@/functions/logger";
import { getShopsDataClient } from "@/functions/communicateApi";
import {
  CATEGORY_DATA,
  DEFAULT_GET_DATA_COUNT,
  GENRE_DATA,
  OTHER_OPTIONS_DATA,
} from "@/constants/otherApiData";
import AreaList from "./parts/areaList";
import ShopList from "./parts/shopList";
import FindFromCurrent from "./parts/findFromCurrent";
import Link from "next/link";
import BudgetSelect from "./parts/budgetSelect";

const MainPage = memo(({ areaData }: { areaData: AreaData[] }) => {
  const [shopsList, setShopList] = useState<ShopData[] | []>([]);
  const [pageNate, setPageNate] = useState(0);
  const [areaCode, setAreaCode] = useState("");
  const [budgetParam, setBudgetParam] = useState<string>("");
  const [genreParams, setGenreParams] = useState<string[]>([]);
  const [categoryParams, setCategoryParams] = useState<string[]>([]);
  const [otherOptionParams, setOtherOptionParams] = useState<string[]>([]);

  const setIsLoading = useSetRecoilState(loadingStateAtom);
  const setIsModal = useSetRecoilState(modalStateAtom);
  const positionData = useRecoilValue(positionInfoAtom);

  const isDisabled =
    budgetParam ||
    categoryParams.length !== 0 ||
    genreParams.length !== 0 ||
    otherOptionParams.length !== 0;

  const areaListProps = {
    areaData,
    setIsLoading,
    setIsModal,
    setPageNate,
    setShopList,
    setAreaCode,
  };

  const findFromCurrentProps = {
    setShopList,
    setPageNate,
    setAreaCode,
  };

  const checkBoxProps = [
    { displayData: GENRE_DATA, state: genreParams, setState: setGenreParams },
    {
      displayData: CATEGORY_DATA,
      state: categoryParams,
      setState: setCategoryParams,
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

  const clickPageNate = async (
    _e: React.ChangeEvent<unknown>,
    page: number
  ) => {
    const startNumber = 1 + DEFAULT_GET_DATA_COUNT * (page - 1);
    try {
      setIsLoading(true);
      const getShopList = await getShopsDataClient(
        areaCode || positionData,
        startNumber
      );
      setShopList(getShopList.shop);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      const errorMessage = error as Error;
      logger.error(errorMessage.message);
      setIsModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const resetButton = () => {
    setBudgetParam("");
    setGenreParams([]);
    setCategoryParams([]);
    setOtherOptionParams([]);
  };

  return (
    <>
      <Loading />
      <Modals />

      <AreaList {...areaListProps} />
      <FindFromCurrent {...findFromCurrentProps} />
      <BudgetSelect {...budgetProps} />

      {checkBoxProps.map((data, index) => (
        <div className="m-5" key={index}>
          <CheckBoxArray {...data} />
        </div>
      ))}
      
      <div className="text-center space-x-8 my-5">
        <Button
          onClick={resetButton}
          variant="contained"
          disabled={!isDisabled}
        >
          リセット
        </Button>

        <Button
          variant="contained"
          disabled={!shopsList.length || !isDisabled}
          onClick={() => {}}
        >
          条件を絞り込む
        </Button>
      </div>

      <ShopList shopsData={shopsList} />

      {shopsList.length !== 0 && (
        <div className="text-center my-5">
          <Pagination
            count={pageNate}
            variant="outlined"
            shape="rounded"
            onChange={clickPageNate}
            sx={{ display: "inline-block" }}
          />
        </div>
      )}

      <div className="text-center my-10 hover:opacity-70">
        <Link href="/" className="">
          <Button variant="contained">TOPに戻る</Button>
        </Link>
      </div>
    </>
  );
});

export default MainPage;
