import { Button } from "@mui/material";
import { forwardRef, LegacyRef, memo } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { DistanceSearchParams } from "@/types/searchShopParams";

type Props = {
  isDisabledConditionSearch: string | number | DistanceSearchParams;
  wordSearch: (value: { searchWord: string }) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<{ searchWord: string }>;
};

const WordSearch = memo(
  forwardRef(
    (
      { isDisabledConditionSearch, wordSearch, handleSubmit, ...props }: Props,
      ref: LegacyRef<HTMLInputElement>
    ) => {
      return (
        <form onSubmit={handleSubmit(wordSearch)}>
          <input
            type="text"
            className="mr-2 w-1/4 border border-black"
            ref={ref}
            placeholder="店舗名を入力してください"
            {...props}
          />
          <Button
            variant="contained"
            size="small"
            type="submit"
            disabled={!isDisabledConditionSearch}
          >
            検索
          </Button>
        </form>
      );
    }
  )
);

export default WordSearch;
WordSearch.displayName = "WordSearch";
