import { useNavigate } from "react-router-dom";

const AddPet = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <p className="font-bold text-base text-[#2b2b2a] md:text-lg">My pets</p>
      <button
        className="bg-[#f6b83d] rounded-[30px] px-4 py-2.5 text-sm font-medium text-white md:px-5 md:text-base md:font-bold"
        onClick={() => navigate("/add-pet")}
      >
        Add pet +
      </button>
    </div>
  );
};

export default AddPet;
