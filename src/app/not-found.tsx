import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
const NotFoundPage = () => {
  return (
    <div className="text-center">
      <p className="font-bold text-3xl mt-10 z-10 relative">ページが見つかりません</p>
      <Image
        src={"/404.jpg"}
        alt="404 Page Not Found"
        width={700}
        height={700}
        className="inline-block mt-[-60px] mb-[-50px]"
      />

      <div className="hover:opacity-70">
        <Link href="/" className="">
          <Button variant="contained">TOPに戻る</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
