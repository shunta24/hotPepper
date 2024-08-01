import { BUDGET_DATA } from "@/constants/otherApiData";
import { ChangeEvent, memo } from "react";

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
        className="py-5  text-lg border border-gray-400 cursor-pointer"
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
