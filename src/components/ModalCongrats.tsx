import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import { IModalProps } from "../interfaces/interfaces";

const ModalCongrats: React.FC<IModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="rounded-4xl bg-white w-[335px] h-[290px] px-5 py-5 text-center md:w-[410px] md:h-[364px] md:p-[55px]">
        <p className="text-5xl rounded-full bg-[#fff4df] size-20 text-center p-3 mx-auto mb-5">
          🐈
        </p>
        <h3 className="font-bold text-xl text-[#f6b83d] text-center mb-5 md:text-2xl">
          Congrats
        </h3>
        <p className="font-medium text-sm text-[#2b2b2a] mb-6 md:mb-7">
          The first fluff in the favorites! May your friendship be the happiest
          and filled with fun.
        </p>
        <NavLink
          to="/profile"
          className="w-[285px] rounded-4xl py-3 px-25  bg-[#f6b83d] text-white"
        >
          Go to profile
        </NavLink>
      </div>
    </Modal>
  );
};

export default ModalCongrats;
