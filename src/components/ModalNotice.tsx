import Modal from "./Modal";

import { CiHeart } from "react-icons/ci";
import { INotices } from "../interfaces/interfaces";
import { convertDate, convertName, convertPrice } from "../helpers/helpers";
import StarRating from "./StarRating";
import { useAppDispatch, useAppSelector } from "../store/tools/hooks";
import { addNoticeToFavorites } from "../store/auth/operations";
import { selectFavorites, selectIsLoggedIn } from "../store/auth/selectors";
import { useState } from "react";
import ModalAttention from "./ModalAttention";
import { toast, Zoom } from "react-toastify";

type ModalNoticeProps = {
  isOpen: boolean;
  onClose: () => void;
  notice: INotices;
};

const ModalNotice: React.FC<ModalNoticeProps> = ({
  isOpen,
  onClose,
  notice,
}) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const [isAttentionOpen, setIsAttentionOpen] = useState(false);
  const favorites = useAppSelector(selectFavorites);
  const isFavorite = (id: string) =>
    favorites.some((fav: INotices) => fav._id === id);

  const toggleModal = () => setIsAttentionOpen((prev) => !prev);

  const handleClick = () => {
    if (isLoggedIn) {
      if (!isFavorite(notice._id)) {
        dispatch(addNoticeToFavorites(notice._id));
        toast.success("Successfully added to favorites!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        });
      } else {
        toast.warning("This notice is already in your favorites.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        });
      }
    } else {
      toggleModal();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="rounded-4xl bg-white w-[335px] h-[490px] py-10 px-5 text-center md:w-[466px] md:h-[550px] md:p-14">
        <div className="relative w-fit mx-auto">
          <img
            src={notice.imgURL}
            alt={`${notice.name}'s photo`}
            className="size-[120px] rounded-full object-cover mb-5 md:size-[150px]"
          />
          <span className="absolute top-0 left-0 rounded-[30px] bg-[#fff4df] text-xs font-medium text-[#f6b83d] px-3 py-2 md:text-sm">
            {notice.category}
          </span>
        </div>
        <h3 className="font-bold text-base text-center mb-2.5 md:text-lg">
          {notice.name}
        </h3>
        <StarRating rating={notice.popularity} />
        <div className="flex justify-between gap-1.5 mb-4">
          <p className="flex-1 text-center font-medium text-[10px] text-[rgba(38,38,38,0.5)]">
            Name{" "}
            <span className="block text-xs text-[#2b2b2a]">
              {convertName(notice.name)}
            </span>
          </p>
          <p className="flex-1 text-center font-medium text-[10px] text-[rgba(38,38,38,0.5)]">
            Birthday{" "}
            <span className="block text-xs text-[#2b2b2a]">
              {convertDate(notice.birthday)}
            </span>
          </p>
          <p className="flex-1 text-center font-medium text-[10px] text-[rgba(38,38,38,0.5)]">
            Sex{" "}
            <span className="block text-xs text-[#2b2b2a]">{notice.sex}</span>
          </p>
          <p className="flex-1 text-center font-medium text-[10px] text-[rgba(38,38,38,0.5)]">
            Species{" "}
            <span className="block text-xs text-[#2b2b2a]">
              {notice.species}
            </span>
          </p>
        </div>
        <p className="font-medium text-sm text-[#2b2b2a] mb-6 md:mb-7">
          {notice.comment}
        </p>
        <p className="font-bold text-base mb-3 md:text-lg">
          {convertPrice(notice.price)}
        </p>
        <div className="flex gap-2.5 w-[279px] mx-auto md:w-[330px]">
          <button
            type="button"
            onClick={() => handleClick()}
            className="flex flex-1 items-center justify-center gap-1 flex-nowrap rounded-4xl bg-[#f6b83d] text-white w-[135px] md:w-[160px]"
          >
            Add to
            <CiHeart className="text-xl" />
          </button>
          <button className="flex-1 rounded-4xl py-3 bg-[#fff4df] font-bold text-sm text-[#f6b83d] w-[135px] md:w-[160px]">
            Contact
          </button>
        </div>
        <ModalAttention isOpen={isAttentionOpen} onClose={toggleModal} />
      </div>
    </Modal>
  );
};

export default ModalNotice;
