import { ChangeEvent, memo } from "react";

type Props = {
  displayData: {
    code: string;
    value: string;
  }[];
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
        <label className="mr-3 inline-block cursor-pointer" key={data.code}>
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
CheckBoxArray.displayName = "CheckBoxArray";
