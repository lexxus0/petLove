import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from "../tools/tools";
import { instance } from "../news/operations";
import { ICity } from "../../interfaces/interfaces";

export const fetchCategories = createAsyncThunk<string[], void>(
  "notices/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/notices/categories");
      return data;
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to fetch categories"));
    }
  }
);
export const fetchSex = createAsyncThunk<string[], void>(
  "notices/getSex",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/notices/sex");
      return data;
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to fetch sex "));
    }
  }
);
export const fetchSpecies = createAsyncThunk<string[], void>(
  "notices/getSpecies",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/notices/species");
      return data;
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to fetch species"));
    }
  }
);

export const fetchCities = createAsyncThunk<ICity[], { keyword: string }>(
  "notices/getCities",
  async ({ keyword }, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/cities&keyword=${keyword}`);
      return data;
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to fetch cities"));
    }
  }
);

export const fetchLocations = createAsyncThunk<ICity[], void>(
  "notices/getLocations",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/cities/locations`);
      return data;
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to fetch locations"));
    }
  }
);
