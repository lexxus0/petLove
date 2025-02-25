import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import { IModalProps } from "../interfaces/interfaces";

const ModalAttention: React.FC<IModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="rounded-4xl bg-white w-[335px] h-[394px] px-5 py-7 text-center md:w-[466px] md:h-[434px] md:p-14">
        <p className="text-5xl rounded-full bg-[#fff4df] size-20 text-center p-3 mx-auto mb-5">
          🐶
        </p>
        <h3 className="font-bold text-xl text-[#f6b83d] text-center mb-5 md:text-2xl">
          Attention
        </h3>
        <p className="font-medium text-sm text-[#2b2b2a] mb-6 md:mb-7">
          We would like to remind you that certain functionality is available
          only to authorized users.If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features.
        </p>
        <div className="flex gap-2 md:w-[288px] md:mx-auto">
          <NavLink
            to="/login"
            className="flex-1 rounded-4xl py-3  bg-[#f6b83d] text-white"
          >
            Log in
          </NavLink>
          <NavLink
            to="/register"
            className="flex-1 rounded-4xl py-3 bg-[#fff4df] font-bold text-sm text-[#f6b83d]"
          >
            Registration
          </NavLink>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAttention;
