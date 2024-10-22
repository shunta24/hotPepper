import { Button } from "@mui/material";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  description: "404エラー 存在しないページ",
  robots: {
    // NOTE:noindexはNext.jsの方で元から設定されている
    // index:false,
    follow: false,
  },
};

const NotFoundPage = () => {
  return (
    <div className="text-center">
      <p className="relative z-10 mt-10 text-3xl font-bold">
        ページが見つかりません
      </p>
      <Image
        src={"/404.jpg"}
        alt="404 Page Not Found"
        width={700}
        height={700}
        className="mb-[-50px] mt-[-60px] inline-block"
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
