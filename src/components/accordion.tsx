"use client";

import { ReactNode, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prev) => (prev ? false : true));
  };

  return (
    <div
      className={`${
        isOpen && "duration-500 ease-in-out border-b border-gray-300"
      }`}
    >
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <p className="">{title}</p>
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>

      <div
        className={`${
          isOpen
            ? "duration-500 ease-in-out p-2 bg-blue-50"
            : "opacity-0 invisible h-0"
        }`}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
