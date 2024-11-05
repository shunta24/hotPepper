import { ChangeEvent, memo, useCallback } from "react";
// eslint-disable-next-line import/named
import { SetterOrUpdater } from "recoil";
import Accordion from "@/components/accordion";
import CheckBoxArray from "@/components/checkBoxArray";
import { DETAIL_AREA_CODE_SELECTABLE_NUMBER } from "@/constants/otherApiData";
import { AreaData } from "@/types/areaData";

type Props = {
  areaData: AreaData[];
  detailAreaCode: string[];
  accordionOpen: boolean;
  setDetailAreaCode: SetterOrUpdater<string[]>;
  setAccordionOpen: SetterOrUpdater<{
    area: boolean;
    filter: boolean;
    currentPosition: boolean;
  }>;
};

const DetailAreaList = memo(
  ({
    areaData,
    accordionOpen,
    setAccordionOpen,
    detailAreaCode,
    setDetailAreaCode,
  }: Props) => {
    const displayAreaData = areaData.map((data) => ({
      code: data.code,
      value: data.name,
    }));

    const setParams = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const code = e.currentTarget.value;
        setDetailAreaCode((prev) =>
          prev.includes(code)
            ? prev.filter((params) => params !== code)
            : [...prev, code]
        );
      },
      [setDetailAreaCode]
    );

    const isDetailAreaCodeCount =
      detailAreaCode.length >= DETAIL_AREA_CODE_SELECTABLE_NUMBER;

    return (
      <div className="bg-blue-300">
        <Accordion
          title="エリアを選択"
          name="area"
          isInitialOpen={accordionOpen}
          setIsInitialOpen={setAccordionOpen}
        >
          <CheckBoxArray
            state={detailAreaCode}
            displayData={displayAreaData}
            isStyles={true}
            setState={setParams}
            disabled={isDetailAreaCodeCount}
          />
          <p className="text-sm">※エリアは5つまで選択可能です</p>
        </Accordion>
      </div>
    );
  }
);

export default DetailAreaList;
DetailAreaList.displayName = "DetailAreaList";
