import { Button } from "@mui/material";
import { forwardRef, LegacyRef, memo } from "react";
import { UseFormHandleSubmit } from "react-hook-form";

type Props = {
  isDisabledConditionSearch: string | number | boolean;
  isResponsive: boolean;
  wordSearch: (value: { searchWord: string }) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<{ searchWord: string }>;
};

const WordSearch = memo(
  forwardRef(
    (
      {
        isDisabledConditionSearch,
        isResponsive,
        wordSearch,
        handleSubmit,
        ...props
      }: Props,
      ref: LegacyRef<HTMLInputElement>
    ) => {
      return (
        <>
          <form onSubmit={handleSubmit(wordSearch)}>
            <input
              type="text"
              size={isResponsive ? 30 : 20}
              className="border border-black placeholder:text-sm sm:mr-2 sm:placeholder:text-base"
              ref={ref}
              placeholder="店舗名を入力してください"
              {...props}
            />
            <Button
              variant="contained"
              size={isResponsive ? "medium" : "small"}
              type="submit"
              disabled={!isDisabledConditionSearch}
            >
              検索
            </Button>
          </form>
        </>
      );
    }
  )
);

export default WordSearch;
WordSearch.displayName = "WordSearch";
