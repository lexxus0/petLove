import { RootState } from "../store";

export const selectNameFilter = (state: RootState) => state.filter.title;
export const selectCategories = (state: RootState) => state.filter.categories;
export const selectSex = (state: RootState) => state.filter.sex;
export const selectSpecies = (state: RootState) => state.filter.species;
export const selectCities = (state: RootState) => state.filter.cities;
export const selectLocations = (state: RootState) => state.filter.locations;
export const selectChosenCategory = (state: RootState) =>
  state.filter.selectedCategory;
export const selectChosenSex = (state: RootState) => state.filter.selectedSex;
export const selectChosenSpecies = (state: RootState) =>
  state.filter.selectedSpecies;
export const selectChosenCity = (state: RootState) => state.filter.selectedCity;
export const selectChosenLocations = (state: RootState) =>
  state.filter.selectedLocation;

export const selectKeyword = (state: RootState) => state.filter.keyword;
export const selectByPopularity = (state: RootState) =>
  state.filter.byPopularity;
export const selectByPrice = (state: RootState) => state.filter.byPrice;
