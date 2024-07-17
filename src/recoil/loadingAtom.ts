import { atom } from "recoil";

export const loadingStateAtom=atom<boolean>({
    key:'hotPepper/loading',
    default:false
})