import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { INews } from "../../interfaces/interfaces";
import { handleError } from "../tools/tools";

export const instance = axios.create({
  baseURL: "https://petlove.b.goit.study/api",
});

export const fetchNews = createAsyncThunk<
  { news: INews[]; totalPages: number },
  { page: number; perPage: number; keyword?: string }
>("news/getAll", async ({ page, perPage, keyword }, { rejectWithValue }) => {
  try {
    const { data } = await instance.get(
      `/news?page=${page}&perPage=${perPage}${
        keyword ? `&keyword=${keyword}` : ""
      }`
    );
    return {
      news: data.results,
      totalPages: data.totalPages,
    };
  } catch (e) {
    return rejectWithValue(handleError(e, "Failed to fetch news"));
  }
});
