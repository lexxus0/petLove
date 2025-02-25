import React, { useState } from "react";
import ModalApproveAction from "./ModalApproveAction";
import { useLocation } from "react-router-dom";

type LogOutBtnProps = {
  text: string;
  bg: string;
};

const LogOutBtn: React.FC<LogOutBtnProps> = ({ text, bg }) => {
  const location = useLocation();
  const condition = location.pathname === "/home";
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  return (
    <>
      <button
        type="button"
        onClick={toggleModal}
        className={`rounded-[30px] px-7 py-3 bg-[${bg}] text-[${text}] uppercase ${
          condition ? "hidden" : ""
        } cursor-pointer`}
      >
        Log out
      </button>
      <ModalApproveAction isOpen={isOpen} onClose={toggleModal} />
    </>
  );
};

export default LogOutBtn;
