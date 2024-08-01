import { OptionData } from "@/types/optionData";
import { ChangeEvent, memo } from "react";

type Props = {
  displayData: OptionData[];
  state: string[];
  setState: (prev: (prev: string[]) => string[]) => void;
};

const CheckBoxArray = memo(({ displayData, state, setState }: Props) => {
  const selectCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setState((prev) =>
      prev.includes(value)
        ? prev.filter((param) => param !== value)
        : [...prev, value]
    );
  };

  return (
    <>
      {displayData.map((data) => (
        <label className="mr-3 cursor-pointer inline-block" key={data.code}>
          <input
            type="checkbox"
            value={data.code}
            className="cursor-pointer"
            onChange={selectCheckBox}
            checked={state.includes(data.code)}
          />
          {data.value}
        </label>
      ))}
    </>
  );
});

export default CheckBoxArray;
