import { atom } from "recoil";
import { DistanceParams } from "@/types/distanceParams";

export const positionInfoAtom = atom<DistanceParams>({
  key: "hotPepper/positionInfo",
  default: { latitude: NaN, longitude: NaN, range: "" },
});
