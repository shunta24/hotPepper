import { atom } from "recoil";

export const searchResultMsgAtom = atom<string>({
  key: "hotPepper/searchResultMsg",
  default: "最初にエリアを選択してください",
});
