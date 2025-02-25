import { createSlice } from "@reduxjs/toolkit";
import { INews } from "../../interfaces/interfaces";
import { fetchNews } from "./operations";

interface NewsState {
  news: INews[];
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  totalPages: 1,
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload.news ?? [];
        state.totalPages = action.payload.totalPages ?? 1;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default newsSlice.reducer;
