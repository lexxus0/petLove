import EditUserBtn from "./EditUserBtn";
import LogOutBtn from "./LogOutBtn";
import PetsBlock from "./PetsBlock";
import UserBlock from "./UserBlock";

const UserCard = () => {
  return (
    <div className="rounded-[30px] bg-white px-5 pb-10 pt-4.5 relative md:p-10 xl:w-[500px]">
      <EditUserBtn />
      <UserBlock />
      <PetsBlock />
      <LogOutBtn bg="#fff4df" text="#f7b83d" />
    </div>
  );
};

export default UserCard;
