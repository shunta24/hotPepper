import { sendGTMEvent } from "@next/third-parties/google";

export const gtmConditionSearch = (
  budget: string,
  isDetailArea: boolean,
  isConditionSearch: boolean,
  otherSearchParams: {
    [key: string]: string[];
  }
) => {
  const isOtherSearchParams =
    otherSearchParams.genre?.length ||
    otherSearchParams.specialCode?.length ||
    otherSearchParams.otherOption?.length;

  const dpId = isDetailArea ? "-dp" : "";

  if (budget || isOtherSearchParams) {
    if (budget) {
      sendGTMEvent({ event: "budget-search" + dpId, value: budget });
    }
    if (isOtherSearchParams) {
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
    }
    // NOTE:詳細エリアページの検索ボタン押下時に条件なしの際はイベント発火させない
    // 詳細エリアページ検索ボタン押下のイベントのみ発火させる
  } else if (isConditionSearch) {
    sendGTMEvent({ event: "empty-condition-search" + dpId, value: "" });
  }
};

export const gtmWordSearch = (searchWord: string, isDetailArea: boolean) => {
  const eventName = searchWord ? "full-word-search" : "empty-word-search";
  const dpId = isDetailArea ? "-dp" : "";

  sendGTMEvent({ event: eventName + dpId, value: searchWord });
};
