import { RiDeleteBin5Line } from "react-icons/ri";
import { convertDate, convertName } from "../helpers/helpers";
import { IPet } from "../interfaces/interfaces";
import { deletePetFromUser } from "../store/auth/operations";
import { useAppDispatch } from "../store/tools/hooks";

type PetsItemProps = {
  pet: IPet;
};

const PetsItem: React.FC<PetsItemProps> = ({ pet }) => {
  const dispatch = useAppDispatch();
  const handleClick = (id: string) => {
    dispatch(deletePetFromUser(id));
  };

  return (
    <div className="border border-[rgba(38,38,38,0.1)] rounded-[20px] flex gap-[14px] py-4 pr-8 pl-4 relative xl:py-8 xl:w-full">
      <img
        src={pet.imgURL}
        alt={`${pet.name}'s picture`}
        className="rounded-full size-[66px] md:size-[75px] xl:size-[90px]"
      />
      <div className="flex flex-col xl:justify-center">
        <button
          className="absolute right-3 top-3 rounded-[30px] p-1.5 bg-[#fff4df] xl:right-5 xl:top-5 xl:size-[38px] xl:p-2.5"
          onClick={() => pet._id && handleClick(pet._id)}
        >
          <RiDeleteBin5Line className="text-[#f6b83d]" />
        </button>
        <p className="font-bold text-sm text-[#2b2b2a] xl:mb-2.5">{pet.name}</p>
        <div className="flex gap-2.5 flex-wrap text-center w-[153px] max-h-[100px] xl:w-[225px]">
          <p className="flex-1 text-left font-medium text-[10px] text-[rgba(38,38,38,0.5)]">
            Name{" "}
            <span className="block text-xs text-[#2b2b2a]">
              {convertName(pet.name)}
            </span>
          </p>
          <p className="flex-1 text-left font-medium text-[10px] text-[rgba(38,38,38,0.5)]">
            Birthday{" "}
            <span className="block text-xs text-[#2b2b2a]">
              {convertDate(pet.birthday)}
            </span>
          </p>
          <p className="flex-1 text-left font-medium text-[10px] text-[rgba(38,38,38,0.5)]">
            Sex <span className="block text-xs text-[#2b2b2a]">{pet.sex}</span>
          </p>
          <p className="text-left font-medium text-[10px] text-[rgba(38,38,38,0.5)]">
            Species{" "}
            <span className="block text-xs text-[#2b2b2a]">{pet.species}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PetsItem;
