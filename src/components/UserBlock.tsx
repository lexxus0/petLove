import { selectUser } from "../store/auth/selectors";
import { useAppSelector } from "../store/tools/hooks";
import defaultPic from "../assets/images/header/notLoggedIn.svg";
import { RiUser3Fill } from "react-icons/ri";
import { useState } from "react";
import ModalEditUser from "./ModalEditUser";

const UserBlock = () => {
  const user = useAppSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  return (
    <div>
      <div className="text-white w-20 flex items-center gap-1 font-medium text-sm rounded-[30px] px-3.5 py-2.5 bg-[#f6b83d]">
        User <RiUser3Fill />
      </div>
      <img
        src={user.avatar ? user.avatar : defaultPic}
        alt="User profile picture"
        className="size-[94px] rounded-full mx-auto mb-2 md:size-[110px]"
      />
      <button
        className="underline cursor-pointer block font-medium text-xs text-[#262626] mb-6.5 mx-auto md:mb-5"
        onClick={toggleModal}
      >
        Upload photo
      </button>
      <p className="font-bold text-base text-[#2b2b2a] mb-5 md:text-lg">
        My information
      </p>
      <div className="flex flex-col gap-2.5 mb-10 md:flex-row md:flex-wrap md:gap-3.5">
        <input
          type="text"
          className="border w-full placeholder:text-[#262626] h-[42px] font-medium text-sm pl-3 py-2 rounded-3xl border-[rgba(38,38,38,0.5)] mb-2.5 md:h-[52px] md:w-[305px] md:mb-3.5 xl:w-[440px]"
          placeholder={user.name}
          readOnly
        />
        <input
          type="text"
          className="border w-full placeholder:text-[#262626] h-[42px] font-medium text-sm pl-3 py-2 rounded-3xl border-[rgba(38,38,38,0.5)] mb-2.5 md:h-[52px] md:w-[305px] md:mb-3.5 xl:w-[440px]"
          placeholder={user.email}
          readOnly
        />
        <input
          type="text"
          className="border placeholder:text-[#262626] h-[42px] font-medium text-sm pl-3 py-2 rounded-3xl border-[rgba(38,38,38,0.5)] mb-2.5 md:h-[52px] w-full md:w-[305px] md:mb-3.5 xl:w-[440px]"
          placeholder={user.phone ?? "+380"}
          readOnly
        />
      </div>
      <ModalEditUser isOpen={isOpen} onClose={toggleModal} />
    </div>
  );
};

export default UserBlock;
