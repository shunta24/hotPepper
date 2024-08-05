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
          accordionState && "border-b border-gray-300 duration-500 ease-in-out"
        }`}
      >
        <div
          className="flex cursor-pointer items-center justify-between p-4"
          onClick={toggleAccordion}
        >
          <p>{title}</p>
          {accordionState ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>

        <div
          className={`${
            accordionState
              ? "bg-blue-50 p-2 duration-500 ease-in-out"
              : "invisible h-0 opacity-0"
          }`}
        >
          <div>{children}</div>
        </div>
      </div>
    );
  }
);

export default Accordion
Accordion.displayName = "Accordion";
