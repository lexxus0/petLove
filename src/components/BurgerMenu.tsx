import { IoClose } from "react-icons/io5";
import AuthNav from "./AuthNav";
import { useAppSelector } from "../store/tools/hooks";
import { selectIsLoggedIn } from "../store/auth/selectors";
import ModalApproveAction from "./ModalApproveAction";
import { useState } from "react";

interface BurgerMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const BurgerMenu = ({ isOpen, closeMenu }: BurgerMenuProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const currentPath = window.location.pathname;

  const links = [
    { href: "/news", label: "News" },
    { href: "/notices", label: "Find pet" },
    { href: "/friends", label: "Our friends" },
  ];

  const onClick = () => {
    closeMenu();
    toggleModal();
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40" onClick={closeMenu} />}

      <div
        className={`fixed top-0 right-0 h-full w-[60%] bg-white shadow-lg z-50 flex flex-col justify-between transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button className="absolute top-4 right-4" onClick={closeMenu}>
          <IoClose className="text-black text-2xl cursor-pointer" />
        </button>

        <nav className="absolute top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <ul className="space-y-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="text-black">
                  <button
                    className={`rounded-4xl border border-solid border-[rgba(38,38,38,0.15)] px-6 py-3  w-[119px] h-[48px] text-sm text-nowrap  hover:border-[#f6b83d] transition-all duration-300 ease-in-out  
    ${currentPath === href ? "!text-black !border-[#f6b83d]" : ""}`}
                  >
                    {label}
                  </button>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto p-6">
          {isLoggedIn ? (
            <div className="flex justify-center">
              <button
                className="uppercase rounded-[30px] px-8 py-2.5 bg-[#f6b83d] font-bold text-base text-white w-full max-w-[300px] md:max-w-[400px]"
                type="button"
                onClick={onClick}
              >
                Log out
              </button>
            </div>
          ) : (
            <AuthNav />
          )}
        </div>
      </div>
      <ModalApproveAction isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};

export default BurgerMenu;
