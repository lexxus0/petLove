import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { RxHamburgerMenu } from "react-icons/rx";
import mobSvg from "../assets/images/logo/mobLogo.svg";
import tabSvg from "../assets/images/logo/logo-tab.svg";
import tabWhiteSvg from "../assets/images/logo/whitelogo_tab.svg";
import mobWhiteSvg from "../assets/images/logo/mobWhiteLogo.svg";
import BurgerMenu from "./BurgerMenu";
import AuthNav from "./AuthNav";
import { useAppSelector } from "../store/tools/hooks";
import { selectIsLoggedIn } from "../store/auth/selectors";
import UserNav from "./UserNav";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const condition = location.pathname === "/home";
  const isMd = useMediaQuery({ minWidth: 768 });

  const currentPath = window.location.pathname;

  const links = [
    { href: "/news", label: "News" },
    { href: "/notices", label: "Find pet" },
    { href: "/friends", label: "Our friends" },
  ];

  const logo = isMd
    ? condition
      ? tabWhiteSvg
      : tabSvg
    : condition
    ? mobWhiteSvg
    : mobSvg;

  return (
    <div
      className={`ml-2 flex items-center justify-between z-[10] w-[320px] md:w-[675px] text-white xl:w-full xl:ml-0 xl:px-[64px] ${
        condition ? "p-4 absolute top-5 max-w-[1280px]" : "mt-[34px]"
      }`}
    >
      <a href="/home" className="xl:flex xl:items-center xl:w-1/3">
        <img src={logo} alt="Website logo" />
      </a>

      <div className="hidden xl:flex xl:justify-center xl:w-1/3">
        <ul className="flex gap-2.5">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`rounded-4xl border cursor-pointer border-solid px-6 py-3 text-sm 
    hover:border-[#f6b83d] transition-all duration-300 ease-in-out  
    ${currentPath === href ? "text-black border-[#f6b83d]" : ""}
    ${
      condition
        ? "text-white border-[rgba(255,255,255,0.4)] hover:border-blue-600"
        : "text-black border-[rgba(38,38,38,0.15)]"
    }
  `}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`${
          isLoggedIn ? "block" : "hidden"
        } mr-3 md:block ml-auto xl:flex xl:justify-end xl:w-1/3`}
      >
        {isLoggedIn ? <UserNav /> : <AuthNav />}
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden">
        <RxHamburgerMenu
          className={`cursor-pointer md:text-3xl ${
            condition ? "text-white" : "text-black"
          }`}
        />
      </button>

      <BurgerMenu isOpen={isOpen} closeMenu={() => setIsOpen(false)} />
    </div>
  );
};

export default Header;
