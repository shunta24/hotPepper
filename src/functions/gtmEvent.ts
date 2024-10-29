import { sendGTMEvent } from "@next/third-parties/google";

export const gtmConditionSearch = (
  budget: string,
  isDetailArea: boolean,
  searchType: {
    isAreaSearch: boolean;
    isCurrentPositionSearch: boolean;
    isFilterSearch: boolean;
  },
  otherSearchParams: {
    [key: string]: string[];
  }
) => {
  const isOtherSearchParams =
    otherSearchParams.genre?.length ||
    otherSearchParams.specialCode?.length ||
    otherSearchParams.otherOption?.length;

  const dpId = isDetailArea ? "-dp" : "";

  // NOTE:各検索実行のボタン押下時に絞り込み条件の有無を判定
  if (searchType.isAreaSearch) {
    const eventName =
      budget || isOtherSearchParams
        ? "with-condition-area-search"
        : "no-condition-area-search";
    sendGTMEvent({ event: eventName + dpId });
  } else if (searchType.isFilterSearch) {
    const eventName =
      budget || isOtherSearchParams
        ? "with-condition-filter-search"
        : "no-condition-filter-search";
    sendGTMEvent({ event: eventName + dpId });
  } else if (searchType.isCurrentPositionSearch) {
    const eventName =
      budget || isOtherSearchParams
        ? "with-condition-current-position-search"
        : "no-condition-current-position-search";
    sendGTMEvent({ event: eventName });
  }

  // NOTE:使用された絞り込み条件を判定(複数可)
  if (budget) {
    sendGTMEvent({ event: "budget-search" + dpId, value: budget });
  }
  if (otherSearchParams.genre?.length) {
    const selectedValue = otherSearchParams.genre?.join(",");
    sendGTMEvent({ event: "genre-search" + dpId, value: selectedValue });
  }
  if (otherSearchParams.specialCode?.length) {
    const selectedValue = otherSearchParams.specialCode?.join(",");
    sendGTMEvent({
      event: "special-code-search" + dpId,
      value: selectedValue,
    });
  }
  if (otherSearchParams.otherOption?.length) {
    const selectedValue = otherSearchParams.otherOption?.join(",");
    sendGTMEvent({
      event: "other-option-search" + dpId,
      value: selectedValue,
    });
  }
};

export const gtmWordSearch = (searchWord: string, isDetailArea: boolean) => {
  const eventName = searchWord ? "full-word-search" : "empty-word-search";
  const dpId = isDetailArea ? "-dp" : "";

  sendGTMEvent({ event: eventName + dpId, value: searchWord });
};
