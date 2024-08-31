"use client";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactNode, memo, useState } from "react";
// eslint-disable-next-line import/named
import { SetterOrUpdater } from "recoil";

type Props = {
  title: string;
  name?: string;
  children: ReactNode;
  isInitialOpen?: boolean;
  setIsInitialOpen?: SetterOrUpdater<{
    area: boolean;
    currentPosition: boolean;
    [key: string]: boolean;
  }>;
  // setIsInitialOpen?: Dispatch<SetStateAction<boolean>>;
  // setIsInitialOpen?: (prev: (prev: boolean) => boolean) => void;
};

const Accordion = memo(
  ({ title, name, children, isInitialOpen, setIsInitialOpen }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const accordionState = isInitialOpen || isOpen;

    const toggleAccordion = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      setIsInitialOpen && name
        ? // NOTE:操作するアコーディオンの値がオブジェクトなので対象のstateのみ変更
          setIsInitialOpen((prev) => ({
            ...prev,
            [name]: prev[name] ? false : true,
          }))
        : setIsOpen((prev) => (prev ? false : true));
    };

    return (
      <>
        <div
          className="flex cursor-pointer items-center justify-between p-4"
          onClick={toggleAccordion}
        >
          <p className="font-bold">{title}</p>
          {accordionState ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>

        <div
          className={`${
            accordionState
              ? "bg-blue-50 p-2 duration-200 ease-in-out"
              : "invisible h-0 opacity-0"
          }`}
        >
          <div>{children}</div>
        </div>
      </>
    );
  }
);

export default Accordion;
Accordion.displayName = "Accordion";
