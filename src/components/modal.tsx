import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { memo } from "react";
import { useRecoilState } from "recoil";
import { modalStateAtom } from "@/recoil/modalAtom";

type Props = {
  title: string;
  contents: string;
};

const Modals = memo(({ title, contents }: Props) => {
  const [isOpen, setIsOpen] = useRecoilState(modalStateAtom);
  const handleClose = () => setIsOpen(false);
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="absolute inset-0 m-auto h-[30%] w-[70%] bg-white text-center">
        <h2 className="my-4 border-b border-gray-800 pb-2 text-2xl font-bold lg:mb-8">
          {title}
        </h2>
        <p>{contents}</p>
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
Modals.displayName = "Modals";
