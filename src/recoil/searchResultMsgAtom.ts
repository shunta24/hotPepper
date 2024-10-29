import { atom } from "recoil";

export const searchResultMsgAtom = atom<string>({
  key: "hotPepper/searchResultMsg",
  default: "エリアを選択してください",
});
