import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { accordionStateAtom } from "@/recoil/accordionAtom";
import { appliedSearchParamsStateAtom } from "@/recoil/appliedSearchParams";

export const useAreaSearch = () => {
  const [accordionOpen, setAccordionOpen] = useRecoilState(accordionStateAtom);
  const appliedSearchParams = useRecoilValue(appliedSearchParamsStateAtom);
  const resetIsAccordionOpen = useResetRecoilState(accordionStateAtom);

  return {
    accordionOpen,
    appliedSearchParams,
    setAccordionOpen,
    resetIsAccordionOpen,
  };
};
