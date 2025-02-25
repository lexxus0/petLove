import MyNotices from "../components/MyNotices";
import UserCard from "../components/UserCard";

const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-10 mt-7 md:mt-10 xl:flex-row xl:p-8 ">
      <UserCard />
      <MyNotices />
    </div>
  );
};

export default ProfilePage;
