import { atom } from "recoil";

export const searchParamsStateAtom = atom<string[]>({
  key: "hotPepper/searchConditions",
  default: [],
});
