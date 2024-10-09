import { useRecoilState, useResetRecoilState } from "recoil";
import { accordionStateAtom } from "@/recoil/accordionAtom";
import { detailAreaCodeStateAtom } from "@/recoil/detailAreaCodeAtom";
import { ShopData } from "@/types/shopData";

export const useDetailAreaSearch = (
  setShopsList: (props: ShopData[]) => void
) => {
  const [detailAreaCode, setDetailAreaCode] = useRecoilState(
    detailAreaCodeStateAtom
  );
  const [accordionOpen, setAccordionOpen] = useRecoilState(accordionStateAtom);
  const resetDetailAreaCode = useResetRecoilState(detailAreaCodeStateAtom);

  const clickClearButton = () => {
    resetDetailAreaCode();
    setShopsList([]);
    setAccordionOpen((prev) => ({ ...prev, area: true }));
  };

  return {
    detailAreaCode,
    accordionOpen,
    setAccordionOpen,
    setDetailAreaCode,
    clickClearButton,
    resetDetailAreaCode,
  };
};
