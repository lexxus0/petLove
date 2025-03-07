import { IPet } from "../interfaces/interfaces";
import { selectPets } from "../store/auth/selectors";
import { useAppSelector } from "../store/tools/hooks";
import PetsItem from "./PetsItem";

const PetsList = () => {
  const pets = useAppSelector(selectPets);

  return (
    <ul className="my-10 flex flex-col gap-5 md:flex-row md:flex-wrap md:mt-11 md:mb-[60px] xl:gap-[31px] xl:mt-10">
      {Array.isArray(pets) &&
        pets.map((pet: IPet) => <PetsItem key={pet._id} pet={pet} />)}
    </ul>
  );
};

export default PetsList;
