import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../news/operations";
import { IFriends } from "../../interfaces/interfaces";
import { handleError } from "../tools/tools";

export const fetchFriends = createAsyncThunk<
  IFriends[],
  void,
  { rejectValue: string }
>("friends/getAll", async (_, ThunkAPI) => {
  try {
    const response = await instance.get<IFriends[]>("/friends");
    return response.data;
  } catch (e) {
    return ThunkAPI.rejectWithValue(handleError(e, "Failed to fetch friends"));
  }
});
