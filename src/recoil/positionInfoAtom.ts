import { atom } from "recoil";
import { DistanceSearchParams } from "@/types/searchShopParams";

export const positionInfoAtom = atom<DistanceSearchParams>({
  key: "hotPepper/positionInfo",
  default: { latitude: NaN, longitude: NaN, range: "" },
});
