import AddPetForm from "../components/AddPetForm";
import PetBlock from "../components/PetBlock";

const AddPetPage = () => {
  return (
    <div className="flex flex-col gap-2.5 my-5 md:my-8 xl:flex-row xl:gap-8 xl:px-8">
      <PetBlock type="add-pet" />
      <div className="bg-white rounded-[30px] px-5 pt-7 pb-5 md:px-[136px] md:py-10 xl:px-20  xl:py-[60px]">
        <AddPetForm />
      </div>
    </div>
  );
};

export default AddPetPage;
