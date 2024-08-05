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
      <div className="absolute inset-0 m-auto size-[30%] bg-gray-100 text-center">
        <h2 className="mb-8 mt-4 border-b border-gray-800 pb-2 text-2xl font-bold">
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
Modals.displayName='Modals'