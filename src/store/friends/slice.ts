import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFriends } from "../../interfaces/interfaces";
import { fetchFriends } from "./operations";

interface FriendsState {
  friends: IFriends[];
  loading: boolean;
  error: string | null;
}

const initialState: FriendsState = {
  friends: [],
  loading: false,
  error: null,
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFriends.fulfilled,
        (state, action: PayloadAction<IFriends[]>) => {
          state.loading = false;
          state.friends = action.payload;
        }
      )
      .addCase(fetchFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default friendsSlice.reducer;
