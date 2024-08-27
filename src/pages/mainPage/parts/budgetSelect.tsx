import { ChangeEvent, memo } from "react";
import { BUDGET_DATA } from "@/constants/otherApiData";

type Props = {
  budgetParam: string;
  budgetSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const BudgetSelect = memo(({ budgetParam, budgetSelect }: Props) => {
  return (
    <>
      <p className="self-center">予算</p>
      <select
        name="budget"
        className="cursor-pointer border border-gray-400 py-2 text-lg"
        onChange={budgetSelect}
        value={budgetParam}
      >
        {BUDGET_DATA.map((data) => (
          <option key={data.code} value={data.code}>
            {data.value}
          </option>
        ))}
      </select>
    </>
  );
});

export default BudgetSelect;
BudgetSelect.displayName = "BudgetSelect";
