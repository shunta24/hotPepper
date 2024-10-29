import { SEARCH_TYPE } from "@/constants/buttonValue";

export const extractingSelectedValue = (
  data: { code: string; name?: string; value?: string }[],
  selectedValue: string
) => {
  return data.filter((data) => selectedValue === data.code).pop();
};

export const extractingSelectedPref = (
  prefData: { params: string; name: string }[][],
  areaCode: string
) => {
  const selectedPref = prefData.map((data) =>
    data.filter((pref) => pref.params === areaCode)
  );

  const selectedPrefData = selectedPref.find((a) => a.length)?.pop();
  const prefName =
    // NOTE:都道府県コードで北海道は除く条件
    selectedPrefData?.params !== "Z041"
      ? selectedPrefData?.name + "県"
      : selectedPrefData.name;

  return prefName;
};

export const isExistingPrefCode = (
  prefData: { params: string; name: string }[][],
  areaCode: string
) => {
  return prefData.some((data) =>
    data.some((prefData) => prefData.params === areaCode)
  );
};

export const searchTypeDetermine = (searchType: string) => {
  const isAreaSearch = searchType === SEARCH_TYPE.area;
  const isCurrentPositionSearch = searchType === SEARCH_TYPE.currentPosition;
  const isFilterSearch = searchType === SEARCH_TYPE.filter;

  return { isAreaSearch, isCurrentPositionSearch, isFilterSearch };
};
