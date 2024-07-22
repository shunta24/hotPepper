import { memo } from "react";
import Modal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalStateAtom } from "@/recoil/modalAtom";
import { Button } from "@mui/material";

const Modals = memo(() => {
  const [isOpen, setIsOpen] = useRecoilState(modalStateAtom);
  const handleClose = () => setIsOpen(false);
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="bg-gray-100 text-center absolute m-auto inset-0 w-[30%] h-[30%]">
        <h2 className="mt-4 mb-8 pb-2 font-bold text-2xl border-b border-gray-800">
          通信エラー
        </h2>
        <p>時間をおいて再度お試しください</p>
        <Button
          variant="contained"
          size="small"
          sx={{ marginTop: "30px", marginBottom: "20px" }}
          onClick={handleClose}
        >
          閉じる
        </Button>
      </div>
    </Modal>
  );
});

export default Modals;
