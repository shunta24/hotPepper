import { atom } from "recoil";

export const detailAreaCodeStateAtom = atom<string[]>({
  key: "hotPepper/detailAreaCode",
  default: [],
});
