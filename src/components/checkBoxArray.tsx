import { ChangeEvent, memo } from "react";

type Props = {
  id: string;
  state: string[];
  displayData: {
    code: string;
    value: string;
  }[];
  setState: (e: ChangeEvent<HTMLInputElement>) => void;
  // setState: Dispatch<SetStateAction<string[]>>;
  // setState: (prev: (prev: string[]) => string[]) => void;
};

const CheckBoxArray = memo(({ id, state, displayData, setState }: Props) => {
  return (
    <>
      {displayData.map((data) => (
        <label className="mr-3 inline-block cursor-pointer" key={data.code}>
          <input
            id={id}
            type="checkbox"
            value={data.code}
            className="cursor-pointer"
            onChange={setState}
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
