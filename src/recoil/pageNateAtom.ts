import { atom } from "recoil";

export const pageNateStateAtom = atom<{
  count: number;
  currentPage: number;
}>({
  key: "hotPepper/pageNate",
  default: { count: 0, currentPage: 1 },
});
