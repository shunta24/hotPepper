import { atom } from "recoil";

export const modalStateAtom = atom<boolean>({
  key: "hotPepper/modal",
  default: false,
});
