import { ChangeEvent, memo } from "react";

type Props = {
  id?: string;
  state: string[];
  displayData: {
    code: string;
    value: string;
  }[];
  isStyles?: boolean;
  disabled?: boolean;
  setState: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CheckBoxArray = memo(
  ({ id, state, displayData, isStyles, disabled, setState }: Props) => {
    return (
      <>
        {displayData.map((data) => (
          // NOTE:文字の部分をクリックするとGTMクリックイベントが2回発火する(labelのクリック+inputのクリック)
          <label
            className={`mr-1 inline-block cursor-pointer text-sm sm:mr-3 sm:text-base 
            `}
            key={data.code}
          >
            <input
              id={id}
              type="checkbox"
              value={data.code}
              className="cursor-pointer"
              onChange={setState}
              checked={state.includes(data.code)}
              disabled={disabled && !state.includes(data.code)}
            />
            <span className={`${isStyles && "text-lg"}`}>{data.value}</span>
          </label>
        ))}
      </>
    );
  }
);

export default CheckBoxArray;
CheckBoxArray.displayName = "CheckBoxArray";
