import { atom } from "recoil";

export const accordionStateAtom=atom<boolean>({
    key:'hotPepper/accordion',
    default:true
})