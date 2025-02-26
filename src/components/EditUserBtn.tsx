import { FiEdit2 } from "react-icons/fi";
import ModalEditUser from "./ModalEditUser";
import { useState } from "react";

const EditUserBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  return (
    <>
      <div
        className="absolute top-4.5 right-5 rounded-[30px] size-[38px] bg-[#fff4df] text-center p-3 md:top-10 md:right-10 cursor-pointer"
        onClick={toggleModal}
      >
        <FiEdit2 className="text-sm text-[#f7b83d]" />
      </div>
      <ModalEditUser isOpen={isOpen} onClose={toggleModal} />
    </>
  );
};

export default EditUserBtn;
