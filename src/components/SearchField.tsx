import { RxMagnifyingGlass } from "react-icons/rx";
import { useAppDispatch } from "../store/tools/hooks";
import { setKeyword } from "../store/filter/slice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type SearchFieldProps = {
  color: string;
  bg: string;
};

const SearchField: React.FC<SearchFieldProps> = ({ color, bg }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeyword(e.target.value));
  };

  useEffect(() => {
    dispatch(setKeyword(""));
  }, [location.pathname, dispatch]);

  return (
    <div className="relative md:mt-0 md:w-[265px]">
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
        className={`border relative border-solid ${bg} placeholder:${color}  border-[rgba(38,38,38,0.15)] rounded-[30px] pl-3 py-3 w-full h-[42px] text-sm  mb-3 md:w-[265px] md:h-11 md:text-base md:mb-0`}
      />
      <RxMagnifyingGlass className="absolute right-3 top-3 size-5" />
    </div>
  );
};

export default SearchField;
