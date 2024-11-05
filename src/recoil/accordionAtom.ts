import { atom } from "recoil";

export const accordionStateAtom = atom<{
  area: boolean;
  filter: boolean;
  currentPosition: boolean;
}>({
  key: "hotPepper/accordion",
  default: { area: true, filter: false, currentPosition: false },
});
