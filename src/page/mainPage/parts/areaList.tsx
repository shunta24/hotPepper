import { Button } from "@mui/material";
import { memo } from "react";
// eslint-disable-next-line import/named
import { SetterOrUpdater } from "recoil";
import { extractingSelectedValue } from "@/functions/common";
import { AreaData } from "@/types/areaData";
import Accordion from "../../../components/accordion";

type Props = {
  areaData: AreaData[];
  areaCode: string;
  isResponsive: boolean;
  isAccordionOpen: boolean;
  executeSearch: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  setAccordionOpen: SetterOrUpdater<{
    area: boolean;
    currentPosition: boolean;
  }>;
};

const AreaList = memo(
  ({
    areaData,
    areaCode,
    isResponsive,
    isAccordionOpen,
    setAccordionOpen,
    executeSearch,
  }: Props) => {
    return (
      <div className="bg-blue-300">
        <Accordion
          title="エリアを選択"
          name="area"
          isInitialOpen={isAccordionOpen}
          setIsInitialOpen={setAccordionOpen}
        >
          {areaData.map((data) => (
            <span
              key={data.code}
              className="m-2 inline-block hover:opacity-70 sm:m-3"
            >
              <Button
                variant="contained"
                id={data.code}
                onClick={executeSearch}
                disabled={
                  data.name ===
                  extractingSelectedValue(areaData, areaCode)?.name
                }
                size={isResponsive ? "medium" : "small"}
              >
                {data.name}
              </Button>
            </span>
          ))}
        </Accordion>
      </div>
    );
  }
);

export default AreaList;
AreaList.displayName = "AreaList";
