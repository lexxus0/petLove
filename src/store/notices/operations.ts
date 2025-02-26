import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../news/operations";
import { INotices } from "../../interfaces/interfaces";
import { handleError } from "../tools/tools";

export const fetchNotices = createAsyncThunk<
  { notices: INotices[]; totalPages: number },
  {
    page: number;
    limit: number;
    sex?: string;
    species?: string;
    category?: string;
    locationId?: string;
    popularity?: boolean;
    price?: boolean;
    keyword?: string;
  }
>(
  "notices/getAll",
  async (
    {
      page,
      limit,
      sex = "",
      species = "",
      category = "",
      locationId = "",
      keyword = "",
      popularity,
      price,
    },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (keyword) params.append("keyword", keyword);
      if (sex) params.append("sex", sex);
      if (species) params.append("species", species);
      if (category) params.append("category", category);
      if (location) params.append("locationId", locationId);

      if (popularity !== undefined)
        params.append("byPopularity", String(popularity));
      if (price !== undefined) params.append("byPrice", String(price));

      const { data } = await instance.get(`/notices?${params.toString()}`);

      return {
        notices: data.results,
        totalPages: data.totalPages,
      };
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to fetch notices"));
    }
  }
);
