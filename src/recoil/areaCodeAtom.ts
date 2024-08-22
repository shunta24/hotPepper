import { atom } from "recoil";

export const areaCodeStateAtom = atom<string>({
  key: "hotPepper/areaCode",
  default: "",
});
