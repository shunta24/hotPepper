import { ChangeEvent, memo } from "react";
import { BUDGET_DATA } from "@/constants/otherApiData";

type Props = {
  budgetParam: string;
  setBudgetParam: (props: string) => void;
};

const BudgetSelect = memo(({ budgetParam, setBudgetParam }: Props) => {
  const budgetSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setBudgetParam(e.currentTarget.value);
  };

  return (
    <>
      <p>予算</p>
      <select
        name="budget"
        className="cursor-pointer  border border-gray-400 py-5 text-lg"
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
