import { ChangeEvent, memo } from "react";
// eslint-disable-next-line import/named
import { SetterOrUpdater } from "recoil";
import Accordion from "@/components/accordion";
import CheckBoxArray from "@/components/checkBoxArray";
import {
  GENRE_DATA,
  OTHER_OPTIONS_DATA,
  SPECIAL_CODE_DATA,
} from "@/constants/otherApiData";

type Props = {
  isPcLayout: boolean;
  isAccordionOpen: boolean;
  searchParamsSeparate: {
    [key: string]: string[];
  };
  setParams: (e: ChangeEvent<HTMLInputElement>) => void;
  setAccordionOpen: SetterOrUpdater<{
    area: boolean;
    filter: boolean;
    currentPosition: boolean;
  }>;
};

const SettingCondition = memo(
  ({
    isPcLayout,
    isAccordionOpen,
    searchParamsSeparate,
    setParams,
    setAccordionOpen,
  }: Props) => {
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
    return (
      <>
        {isPcLayout ? (
          checkBoxProps.map((data, index) => (
            <div className="p-1 sm:p-2" key={index}>
              <CheckBoxArray {...data} />
            </div>
          ))
        ) : (
          <div className="bg-gray-300">
            <Accordion
              title="詳細条件で絞る"
              name="filter"
              isInitialOpen={isAccordionOpen}
              setIsInitialOpen={setAccordionOpen}
            >
              {checkBoxProps.map((data, index) => (
                <div className="p-1 sm:p-2" key={index}>
                  <CheckBoxArray {...data} />
                </div>
              ))}
            </Accordion>
          </div>
        )}
      </>
    );
  }
);

export default SettingCondition;
SettingCondition.displayName = "SettingCondition";
