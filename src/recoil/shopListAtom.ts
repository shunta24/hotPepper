import { atom } from "recoil";
import { ShopData } from "@/types/shopData";

export const shopListStateAtom = atom<ShopData[]>({
  key: "hotPepper/shopList",
  default: [],
});
