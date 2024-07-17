import { loadingStateAtom } from "@/recoil/loadingAtom";
import { CircularProgress } from "@mui/material";
import { useRecoilValue } from "recoil";

const Loading = () => {
  const isLoading = useRecoilValue(loadingStateAtom);
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 w-full h-full opacity-50 bg-gray-400 text-center content-center">
          <CircularProgress variant="indeterminate" size={100} />
        </div>
      )}
    </>
  );
};

export default Loading;
