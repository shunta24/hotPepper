import { CircularProgress } from "@mui/material";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import { loadingStateAtom } from "@/recoil/loadingAtom";

const Loading = memo(() => {
  const isLoading = useRecoilValue(loadingStateAtom);
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 size-full content-center bg-gray-400 text-center opacity-50">
          <CircularProgress variant="indeterminate" size={100} />
        </div>
      )}
    </>
  );
});

export default Loading;
Loading.displayName = "Loading";
