import { createSlice } from "@reduxjs/toolkit";
import { INotices } from "../../interfaces/interfaces";
import { fetchNotices } from "./operations";

interface NoticesState {
  notices: INotices[];
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: NoticesState = {
  notices: [],
  totalPages: 1,
  loading: false,
  error: null,
};

const noticesSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.loading = false;
        state.notices = action.payload.notices ?? [];
        state.totalPages = action.payload.totalPages ?? 1;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default noticesSlice.reducer;
