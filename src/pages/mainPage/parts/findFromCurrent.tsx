import { Button } from "@mui/material";
import { memo } from "react";
// eslint-disable-next-line import/named
import { SetterOrUpdater } from "recoil";
import Accordion from "@/components/accordion";
import { DISTANCE_DATA } from "@/constants/otherApiData";
import { DistanceSearchParams } from "@/types/searchShopParams";

type Props = {
  selectedDistance: number;
  isAccordionOpen: boolean;
  currentPositionMsg: string;
  positionData: DistanceSearchParams;
  setIsAccordionOpen: SetterOrUpdater<{
    area: boolean;
    currentPosition: boolean;
  }>;
  searchFindCurrent: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
};

const FindFromCurrent = memo(
  ({
    selectedDistance,
    isAccordionOpen,
    currentPositionMsg,
    positionData,
    setIsAccordionOpen,
    searchFindCurrent,
  }: Props) => {
    return (
      <div className="mr-4 bg-green-400">
        <Accordion
          title="現在地から探す"
          isInitialOpen={isAccordionOpen}
          setIsInitialOpen={setIsAccordionOpen}
          name="currentPosition"
        >
          {positionData.latitude ? (
            DISTANCE_DATA.map(
              (data: { code: string; value: string }, index: number) => (
                <span
                  key={data.code}
                  className="m-3 inline-block hover:opacity-70"
                >
                  <Button
                    variant="contained"
                    color="success"
                    id={data.code}
                    onClick={searchFindCurrent}
                    sx={{ textTransform: "none" }}
                    disabled={selectedDistance === index + 1}
                  >
                    {data.value}
                  </Button>
                </span>
              )
            )
          ) : (
            <p className="ml-3 font-bold">{currentPositionMsg}</p>
          )}

          <p className="ml-5 text-xs">
            {!positionData.latitude
              ? ""
              : "位置情報を再取得する際はページをリロード(再読み込み)してください"}
          </p>
        </Accordion>
      </div>
    );
  }
);

export default FindFromCurrent;
FindFromCurrent.displayName = "FindFromCurrent";
