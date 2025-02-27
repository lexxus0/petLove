import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { INotices } from "../interfaces/interfaces";
import { convertDate, convertName, convertPrice } from "../helpers/helpers";
import ModalNotice from "./ModalNotice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/tools/hooks";
import {
  addNoticeToFavorites,
  deleteNoticeFromFavorites,
} from "../store/auth/operations";
import { selectFavorites, selectIsLoggedIn } from "../store/auth/selectors";
import { addViewedNotice } from "../store/auth/slice";
import ModalAttention from "./ModalAttention";
import ModalCongrats from "./ModalCongrats";

interface NoticesItemProps {
  notice: INotices;
  type: string;
  position?: string;
}

const NoticesItem: React.FC<NoticesItemProps> = ({
  notice,
  type,
  position,
}) => {
  const dispatch = useAppDispatch();

  const [isAttentionOpen, setIsAttentionOpen] = useState(false);
  const toggleAttentionModal = () => setIsAttentionOpen(!isAttentionOpen);

  const [isCongratsOpen, setIsCongratsOpen] = useState(false);
  const toggleCongratsModal = () => setIsCongratsOpen(!isCongratsOpen);

  const favorites = useAppSelector(selectFavorites);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const isFavorite =
    isLoggedIn && favorites.some((fav: INotices) => fav._id === notice._id);

  const handleOpenModal = () => {
    dispatch(addViewedNotice(notice));
    setActiveNotice(notice);
  };

  const [activeNotice, setActiveNotice] = useState<INotices | null>(null);
  const closeModal = () => setActiveNotice(null);

  const handleFirstNotice = () => {
    if (favorites.length === 0) {
      dispatch(addNoticeToFavorites(notice._id));
      toggleCongratsModal();
    } else {
      dispatch(addNoticeToFavorites(notice._id));
    }
  };

  return (
    <li
      className={`rounded-2xl p-6 bg-white text-[#2b2b2a] md:w-[342px] flex flex-col ${
        position === "profile" ? "xl:w-[322px]" : "xl:w-[363px]"
      }`}
    >
      {activeNotice && (
        <ModalNotice
          isOpen={!!activeNotice}
          onClose={closeModal}
          notice={activeNotice}
        />
      )}
      <img
        src={notice.imgURL}
        alt={`${notice.name}'s photo`}
        className="rounded-2xl w-[287px] h-[230px] object-cover mb-6 md:w-[294px] xl:w-[315px] xl:h-[260px]"
      />
      <div className="flex justify-between items-baseline mb-2 md:mb-4">
        <p className="font-bold text-base md:text-lg">{notice.title}</p>
        <p className="font-medium text-sm">⭐ {notice.popularity}</p>
      </div>
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
          Sex <span className="block text-xs text-[#2b2b2a]">{notice.sex}</span>
        </p>
        <p className="flex-1 text-center font-medium text-[10px] text-[rgba(38,38,38,0.5)]">
          Species{" "}
          <span className="block text-xs text-[#2b2b2a]">{notice.species}</span>
        </p>
        <p className="flex-1 text-center font-medium text-[10px] text-[rgba(38,38,38,0.5)]">
          Category{" "}
          <span className="block text-xs text-[#2b2b2a]">
            {notice.category}
          </span>
        </p>
      </div>
      <p className="font-medium text-sm mb-4 md:mb-6 flex-grow">
        {notice.comment}
      </p>
      <p className="font-bold text-base mb-3 md:text-lg">
        {convertPrice(notice.price)}
      </p>
      <div className="flex gap-2 items-center mt-auto">
        <button
          type="button"
          onClick={() => handleOpenModal()}
          className="bg-[#f6b83d] rounded-4xl px-[75px] py-[14px] font-medium text-sm text-white cursor-pointer flex-1 md:text-base xl:px-2 xl:text-lg"
        >
          Learn more
        </button>
        <button
          type="button"
          className={`bg-[#fff4df] p-[16px] rounded-4xl ${
            type === "default" && "hidden"
          }`}
          onClick={() => {
            if (isLoggedIn) {
              return type === "add"
                ? handleFirstNotice()
                : dispatch(deleteNoticeFromFavorites(notice._id));
            } else {
              toggleAttentionModal();
            }
          }}
          aria-label={
            type === "add" ? "Add to Favorites" : "Delete from Favorites"
          }
        >
          {type === "add" ? (
            isFavorite ? (
              <FaHeart className="text-gray-300 size-[24px]" />
            ) : (
              <CiHeart className="text-gray-300 size-[24px]" />
            )
          ) : (
            <RiDeleteBin5Line className="text-[#f6b83d] text-lg" />
          )}
        </button>
      </div>
      <ModalAttention isOpen={isAttentionOpen} onClose={toggleAttentionModal} />
      <ModalCongrats isOpen={isCongratsOpen} onClose={toggleCongratsModal} />
    </li>
  );
};

export default NoticesItem;
