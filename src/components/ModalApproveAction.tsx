import { useNavigate } from "react-router-dom";
import { IModalProps } from "../interfaces/interfaces";
import { signoutUser } from "../store/auth/operations";
import { useAppDispatch } from "../store/tools/hooks";
import Modal from "./Modal";

const ModalApproveAction: React.FC<IModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = () => {
    dispatch(signoutUser());
    onClose();
    navigate("/home");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white px-7 py-10 rounded-[30px] md:p-20">
        <div className="size-20 rounded-full bg-[#fff4df] text-[44px] mx-auto text-center mb-5">
          🐈
        </div>
        <p className="font-bold text-xl text-[#262626] mb-7 text-center md:text-2xl">
          Already leaving?
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onSubmit()}
            className="flex-1 font-bold text-sm md:text-base rounded-[30px] px-[57px] py-3 bg-[#f6b83d] text-white"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="flex-1 font-bold text-sm md:text-base rounded-[30px] px-[47px] py-3 bg-[rgba(38,38,38,0.05)] text-black"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalApproveAction;
