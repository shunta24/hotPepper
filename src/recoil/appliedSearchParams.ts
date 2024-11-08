import { atom } from "recoil";

export const appliedSearchParamsStateAtom = atom<{
  areaName: string;
  distance: number;
}>({
  key: "hotPepper/appliedSearchParams",
  default: { areaName: "未選択", distance: 0 },
});
