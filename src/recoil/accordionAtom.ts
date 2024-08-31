import { atom } from "recoil";

export const accordionStateAtom = atom<{
  area: boolean;
  currentPosition: boolean;
}>({
  key: "hotPepper/accordion",
  default: { area: false, currentPosition: false },
});
