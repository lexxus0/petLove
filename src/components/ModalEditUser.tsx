import { IModalProps } from "../interfaces/interfaces";
import EditUserForm from "./EditUserForm";
import Modal from "./Modal";

const ModalEditUser: React.FC<IModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="rounded-4xl bg-white w-[335px] min-h-[473px] px-5 py-10 md:w-[480px] md:h-[580px] md:p-[50px]">
        <h3 className="font-bold text-xl md:text-lg">Edit information</h3>
        <EditUserForm onClose={onClose} />
      </div>
    </Modal>
  );
};

export default ModalEditUser;
