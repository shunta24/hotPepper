import { atom } from "recoil";

export const searchParamsStateAtom = atom<string[]>({
  key: "hotPepper/searchFilters",
  default: [],
});

export const inputWordStateAtom = atom<string>({
  key: "hotPepper/inputWord",
  default: "",
});

export const budgetParamStateAtom = atom<string>({
  key: "hotPepper/budget",
  default: "",
});

export const searchParamsSeparateStateAtom = atom<{ [key: string]: string[] }>({
  key: "hotPepper/searchParamsSeparate",
  default: { genre: [], specialCode: [], otherOption: [] },
});
