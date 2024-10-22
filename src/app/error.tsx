"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="text-center">
      <Image
        src={"/error.jpg"}
        alt="Server Error"
        width={400}
        height={500}
        className=" m-10 inline-block"
      />

      <div className="hover:opacity-70">
        <Link href="/" className="">
          <Button variant="contained">TOPに戻る</Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
