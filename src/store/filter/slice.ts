import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCategories,
  fetchSex,
  fetchSpecies,
  fetchCities,
  fetchLocations,
} from "./operations";
import { ICity } from "../../interfaces/interfaces";

type FilterState = {
  title: string;
  error: string | null;
  categories: string[];
  selectedCategory: string | null;
  sex: string[];
  selectedSex: string | null;
  species: string[];
  selectedSpecies: string | null;
  cities: ICity[];
  selectedCity: ICity | null;
  locations: ICity[];
  byPrice: boolean | null;
  byPopularity: boolean | null;
  selectedLocation: ICity | null;
  keyword: string | null;
};

const INITIAL_STATE: FilterState = {
  title: "",
  keyword: "",
  error: null,
  categories: [],
  selectedCategory: null,
  sex: [],
  selectedSex: null,
  species: [],
  selectedSpecies: null,
  cities: [],
  selectedCity: null,
  locations: [],
  byPrice: null,
  byPopularity: false,
  selectedLocation: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState: INITIAL_STATE,
  reducers: {
    changeFilter: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setKeyword: (state, action: PayloadAction<string | null>) => {
      state.keyword = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSex: (state, action: PayloadAction<string | null>) => {
      state.selectedSex = action.payload;
    },
    setSpecies: (state, action: PayloadAction<string | null>) => {
      state.selectedSpecies = action.payload;
    },
    setCity: (state, action: PayloadAction<ICity | null>) => {
      state.selectedCity = action.payload;
    },
    setLocation: (state, action: PayloadAction<ICity | null>) => {
      state.selectedLocation = action.payload;
    },
    sortByPopularityAsc: (state) => {
      state.byPopularity = true;
    },
    sortByPopularityDesc: (state) => {
      state.byPopularity = null;
    },

    sortByPriceAsc: (state) => {
      state.byPrice = true;
      state.byPopularity = null;
    },
    sortByPriceDesc: (state) => {
      state.byPrice = null;
      state.byPopularity = false;
    },

    resetFilters: (state) => {
      state.selectedCategory = null;
      state.selectedSex = null;
      state.selectedSpecies = null;
      state.selectedLocation = null;
      state.byPopularity = false;
      state.byPrice = null;
      state.title = "";
      state.keyword = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchSex.fulfilled, (state, action) => {
        state.sex = action.payload;
      })
      .addCase(fetchSpecies.fulfilled, (state, action) => {
        state.species = action.payload;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchSex.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchSpecies.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const filterReducer = filterSlice.reducer;
export const {
  changeFilter,
  setCategory,
  setSex,
  setSpecies,
  setCity,
  setLocation,
  sortByPriceAsc,
  sortByPriceDesc,
  sortByPopularityAsc,
  sortByPopularityDesc,
  resetFilters,
  setKeyword,
} = filterSlice.actions;
