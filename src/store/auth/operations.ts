import { instance } from "../news/operations";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { INotices, IPet, IUser } from "../../interfaces/interfaces";
import { handleError } from "../tools/tools";
import { clearAuthHeader, setAuthHeader } from "./tools/authHeader";
import { RootState } from "../store";

export const registerUser = createAsyncThunk<
  IUser,
  { name: string; email: string; password: string }
>("users/signup", async (credentials, { rejectWithValue }) => {
  try {
    const res = await instance.post("users/signup", credentials);
    setAuthHeader(res.data.token);
    return res.data;
  } catch (e) {
    return rejectWithValue(handleError(e, "Failed to register."));
  }
});

export const loginUser = createAsyncThunk<
  IUser,
  { email: string; password: string }
>("users/signin", async (credentials, { rejectWithValue }) => {
  try {
    const res = await instance.post("users/signin", credentials);
    setAuthHeader(res.data.token);
    return res.data;
  } catch (e) {
    return rejectWithValue(handleError(e, "Failed to login."));
  }
});

export const signoutUser = createAsyncThunk(
  "users/signout",
  async (_, thunkAPI) => {
    try {
      await instance.post("users/signout");
      clearAuthHeader();
    } catch (e) {
      return thunkAPI.rejectWithValue(handleError(e, "Failed to signout."));
    }
  }
);

export const refreshUser = createAsyncThunk<IUser, void, { state: RootState }>(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    try {
      setAuthHeader(persistedToken);
      const res = await instance.get("users/current/full");
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        handleError(e, "Failed to refresh user.")
      );
    }
  }
);

export const addNoticeToFavorites = createAsyncThunk<
  INotices,
  string,
  { state: RootState }
>("notices/addToFavorite", async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) throw new Error("User is not authenticated");

    const { data } = await instance.get(`/notices/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    await instance.post(
      `/notices/favorites/add/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return data;
  } catch (e) {
    return rejectWithValue(handleError(e, "Failed to add notice to favorites"));
  }
});

export const deleteNoticeFromFavorites = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("notices/deleteFromFavorite", async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) throw new Error("User is not authenticated");

    await instance.delete(`/notices/favorites/remove/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return id;
  } catch (e) {
    return rejectWithValue(
      handleError(e, "Failed to delete notice from favorites")
    );
  }
});

export const addPetToUser = createAsyncThunk<
  IPet[],
  IPet,
  { state: RootState }
>("auth/addPetToUser", async (data, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) throw new Error("User is not authenticated");

    const response = await instance.post("/users/current/pets/add", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.pets;
  } catch (e) {
    return rejectWithValue(handleError(e, "Failed to add pet to user."));
  }
});

export const deletePetFromUser = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("auth/deletePetFromUser", async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) throw new Error("User is not authenticated");

    await instance.delete(`/users/current/pets/remove/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (e) {
    return rejectWithValue(
      handleError(e, "Failed to delete pet from user's list")
    );
  }
});

export const editUserInfo = createAsyncThunk<
  IUser,
  Partial<IUser>,
  { state: RootState }
>("auth/editUser", async (data, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) throw new Error("User is not authenticated");

    const response = await instance.patch("/users/current/edit", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (e) {
    return rejectWithValue(handleError(e, "Failed to edit user information."));
  }
});
