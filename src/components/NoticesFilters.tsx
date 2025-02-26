import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Select, { SingleValue } from "react-select";
import SearchField from "./SearchField";
import {
  fetchCategories,
  fetchLocations,
  fetchSex,
  fetchSpecies,
} from "../store/filter/operations";
import { useAppDispatch, useAppSelector } from "../store/tools/hooks";
import {
  resetFilters,
  setCategory,
  setSex,
  setSpecies,
  setLocation,
  sortByPopularityAsc,
  sortByPriceAsc,
  sortByPopularityDesc,
  sortByPriceDesc,
} from "../store/filter/slice";
import { ICity } from "../interfaces/interfaces";
import {
  selectCategories,
  selectSex,
  selectSpecies,
  selectLocations,
  selectChosenCategory,
  selectChosenLocations,
  selectChosenSex,
  selectChosenSpecies,
  selectByPopularity,
  selectByPrice,
} from "../store/filter/selectors";
import { useMediaQuery } from "react-responsive";

const NoticesFilters = () => {
  const dispatch = useAppDispatch();

  const isTablet = useMediaQuery({ minWidth: 768 });

  const categories = useAppSelector(selectCategories);
  const selectedCategory = useAppSelector(selectChosenCategory);

  const sex = useAppSelector(selectSex);
  const selectedSex = useAppSelector(selectChosenSex);

  const species = useAppSelector(selectSpecies);
  const selectedSpecies = useAppSelector(selectChosenSpecies);

  const locations = useAppSelector(selectLocations);
  const selectedLocation = useAppSelector(selectChosenLocations);

  const isPopular = useAppSelector(selectByPopularity);
  const isCheap = useAppSelector(selectByPrice);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSex());
    dispatch(fetchSpecies());
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleCategoryChange = (selected: string) =>
    dispatch(setCategory(selected));
  const handleSexChange = (selected: string) => dispatch(setSex(selected));
  const handleSpeciesChange = (selected: string) =>
    dispatch(setSpecies(selected));
  const handleLocationChange = (
    selected: SingleValue<{ value: string; label: string }>
  ) => {
    if (selected) {
      const selectedCity = locations.find(
        (loc: { _id: string }) => loc._id === selected.value
      );
      if (selectedCity) {
        dispatch(setLocation(selectedCity));
      }
    } else {
      dispatch(setLocation(null));
    }
  };

  return (
    <div className="bg-[#fff4df] rounded-[30px] p-5 space-y-4 relative md:px-8 md:py-10 mt-10">
      <div className="mb-5 relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-12px] after:h-[1px] after:bg-[rgba(38,38,38,0.1)] xl:flex">
        <div className="md:flex md:gap-4">
          <SearchField color="text-black" bg="bg-white" />
          <div className="flex gap-2 md:w-[356px] md:gap-4">
            <Select
              options={categories.map((cat: string) => ({
                value: cat,
                label: cat,
              }))}
              value={
                selectedCategory
                  ? { value: selectedCategory, label: selectedCategory }
                  : null
              }
              onChange={(option) => handleCategoryChange(option?.value || "")}
              className="flex-1 "
              styles={{
                control: (styles) => ({
                  ...styles,
                  paddingBlock: isTablet ? "4px" : undefined,
                  borderRadius: "30px",
                  borderColor: "rgba(38,38,38,0.15)",
                }),
                placeholder: (styles) => ({
                  ...styles,
                  color: "black",
                }),
              }}
              placeholder="Category"
            />

            <Select
              options={sex.map((s: string) => ({ value: s, label: s }))}
              value={
                selectedSex ? { value: selectedSex, label: selectedSex } : null
              }
              onChange={(option) => handleSexChange(option?.value || "")}
              className="flex-1 xl:mr-4"
              styles={{
                control: (styles) => ({
                  ...styles,
                  paddingBlock: isTablet ? "4px" : undefined,
                  borderRadius: "30px",
                  borderColor: "rgba(38,38,38,0.15)",
                }),
                placeholder: (styles) => ({
                  ...styles,
                  color: "black",
                }),
              }}
              placeholder="By Gender"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:gap-4 mt-3 md:mt-4 xl:mt-0">
          <Select
            options={species.map((sp: string) => ({ value: sp, label: sp }))}
            value={
              selectedSpecies
                ? { value: selectedSpecies, label: selectedSpecies }
                : null
            }
            onChange={(option) => handleSpeciesChange(option?.value || "")}
            styles={{
              control: (styles) => ({
                ...styles,
                width: isTablet ? "190px" : undefined,
                paddingBlock: isTablet ? "4px" : undefined,
                borderRadius: "30px",
                borderColor: "rgba(38,38,38,0.15)",
              }),
              placeholder: (styles) => ({
                ...styles,
                color: "black",
              }),
            }}
            placeholder="By type"
          />

          <Select
            options={locations.map((loc: ICity) => ({
              value: loc._id,
              label: loc.cityEn,
            }))}
            value={
              selectedLocation
                ? {
                    value: selectedLocation._id,
                    label: selectedLocation.cityEn,
                  }
                : null
            }
            onChange={(option) => handleLocationChange(option)}
            styles={{
              control: (styles) => ({
                ...styles,
                width: isTablet ? "227px" : undefined,
                paddingBlock: isTablet ? "4px" : undefined,
                borderRadius: "30px",
                borderColor: "rgba(38,38,38,0.15)",
              }),
              placeholder: (styles) => ({
                ...styles,
                color: "black",
              }),
            }}
            placeholder="Location"
          />
        </div>
      </div>

      <div className="flex gap-2.5 flex-wrap">
        <label>
          <button
            className={`rounded-[30px] px-4 py-2 font-medium text-sm md:p-3.5 md:text-base cursor-pointer flex items-center gap-2
              ${
                isPopular
                  ? "bg-[#f6b83d] text-white"
                  : "bg-white text-[#262626]"
              }`}
            onClick={() => {
              if (!isPopular) {
                dispatch(sortByPopularityAsc());
              } else {
                dispatch(sortByPopularityDesc());
              }
            }}
          >
            Popular
            {isPopular && (
              <FaTimes className="w-4 h-4 text-white cursor-pointer" />
            )}
          </button>
        </label>
        <label>
          <button
            className={`rounded-[30px] px-4 py-2 font-medium text-sm md:p-3.5 md:text-base cursor-pointer flex items-center gap-2
            ${isCheap ? "bg-[#f6b83d] text-white" : "bg-white text-[#262626]"}`}
            onClick={() => {
              if (!isCheap) {
                dispatch(sortByPriceAsc());
              } else {
                dispatch(sortByPriceDesc());
              }
            }}
          >
            Cheap
            {isCheap && (
              <FaTimes className="w-4 h-4 text-white cursor-pointer" />
            )}
          </button>
        </label>
      </div>

      <button
        className="bg-red-400 text-white py-2 px-4 rounded-4xl absolute right-3 bottom-3"
        onClick={() => dispatch(resetFilters())}
      >
        Reset
      </button>
    </div>
  );
};

export default NoticesFilters;
