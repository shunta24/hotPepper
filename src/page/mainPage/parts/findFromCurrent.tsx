import { Button } from "@mui/material";
import { memo } from "react";
// eslint-disable-next-line import/named
import { SetterOrUpdater } from "recoil";
import Accordion from "@/components/accordion";
import { SEARCH_TYPE } from "@/constants/buttonValue";
import { DISTANCE_DATA } from "@/constants/otherApiData";
import { DistanceSearchParams } from "@/types/searchShopParams";

type Props = {
  selectedDistance: number;
  isAccordionOpen: boolean;
  isPcLayout: boolean;
  currentPositionMsg: string;
  positionData: DistanceSearchParams;
  executeSearch: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  setAccordionOpen: SetterOrUpdater<{
    area: boolean;
    filter: boolean;
    currentPosition: boolean;
  }>;
};

const FindFromCurrent = memo(
  ({
    selectedDistance,
    isAccordionOpen,
    isPcLayout,
    currentPositionMsg,
    positionData,
    setAccordionOpen,
    executeSearch,
  }: Props) => {
    return (
      <div className="bg-green-300">
        <Accordion
          title="現在地から探す"
          name="currentPosition"
          isInitialOpen={isAccordionOpen}
          setIsInitialOpen={setAccordionOpen}
        >
          {positionData.latitude ? (
            DISTANCE_DATA.map(
              (data: { code: string; value: string }, index: number) => (
                <span
                  key={data.code}
                  className="m-1 inline-block hover:opacity-70 sm:m-3"
                >
                  <Button
                    variant="contained"
                    color="success"
                    id={data.code}
                    value={SEARCH_TYPE.currentPosition}
                    onClick={executeSearch}
                    sx={{ textTransform: "none" }}
                    disabled={selectedDistance === index + 1}
                    size={isPcLayout ? "medium" : "small"}
                  >
                    {data.value}
                  </Button>
                </span>
              )
            )
          ) : (
            <p className="ml-1 text-sm font-bold sm:text-base">
              {currentPositionMsg}
            </p>
          )}

          <p className="text-xs sm:ml-5">
            {!positionData.latitude
              ? ""
              : "※位置情報を再取得する際はリロード(再読み込み)してください"}
          </p>
        </Accordion>
      </div>
    );
  }
);

export default FindFromCurrent;
FindFromCurrent.displayName = "FindFromCurrent";
