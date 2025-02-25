import { selectUser } from "../store/auth/selectors";
import { useAppSelector } from "../store/tools/hooks";
import defaultPic from "../assets/images/header/notLoggedIn.svg";
import LogOutBtn from "./LogOutBtn";
import { useLocation } from "react-router-dom";

const UserNav = () => {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  const condition = location.pathname === "/home";
  return (
    <div className="flex items-center">
      <div className="hidden md:block mr-2">
        <LogOutBtn bg="#f6b83d" text="#fff" />
      </div>
      <a href="/profile">
        <img
          src={user.avatar ? user.avatar : defaultPic}
          alt="User profile picture"
          className="size-8 md:size-[50px] rounded-[30px] md:mr-4 "
        />
      </a>
      <p
        className={`hidden font-bold text-xl md:block ${
          condition ? "text-white" : "text-[#262626]"
        }`}
      >
        {user.name}
      </p>
    </div>
  );
};

export default UserNav;
