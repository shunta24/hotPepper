"use client";
import { Dispatch, ReactNode, SetStateAction, memo, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Accordion = memo(
  ({
    title,
    children,
    isInitialOpen,
    setIsInitialOpen,
  }: {
    title: string;
    children: ReactNode;
    isInitialOpen?: boolean;
    setIsInitialOpen?: Dispatch<SetStateAction<boolean>>;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const accordionState = isInitialOpen || isOpen;

    const toggleAccordion = () => {
      const isAccordionOpen = setIsInitialOpen || setIsOpen;
      isAccordionOpen((prev) => (prev ? false : true));
    };

    return (
      <div
        className={`${
          accordionState && "duration-500 ease-in-out border-b border-gray-300"
        }`}
      >
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={toggleAccordion}
        >
          <p>{title}</p>
          {accordionState ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>

        <div
          className={`${
            accordionState
              ? "duration-500 ease-in-out p-2 bg-blue-50"
              : "opacity-0 invisible h-0"
          }`}
        >
          <div>{children}</div>
        </div>
      </div>
    );
  }
);

export default Accordion;
