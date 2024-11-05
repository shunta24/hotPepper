import { Button } from "@mui/material";
import { forwardRef, LegacyRef, memo } from "react";
import { UseFormHandleSubmit } from "react-hook-form";

type Props = {
  isPcLayout: boolean;
  isDisabledFilterSearch: string | number | boolean;
  wordSearch: (value: { searchWord: string }) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<{ searchWord: string }>;
};

const WordSearch = memo(
  forwardRef(
    (
      {
        isDisabledFilterSearch,
        isPcLayout,
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
              size={isPcLayout ? 30 : 20}
              className="border border-black placeholder:text-sm sm:mr-2 sm:placeholder:text-base"
              ref={ref}
              placeholder="店舗名を入力してください"
              {...props}
            />
            <Button
              id="wordSearchButton"
              className="hover:opacity-70"
              variant="contained"
              size={isPcLayout ? "medium" : "small"}
              type="submit"
              disabled={!isDisabledFilterSearch}
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
