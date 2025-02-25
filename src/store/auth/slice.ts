import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotices, IUser } from "../../interfaces/interfaces";
import {
  registerUser,
  loginUser,
  signoutUser,
  refreshUser,
  addNoticeToFavorites,
  deleteNoticeFromFavorites,
  editUserInfo,
  addPetToUser,
  deletePetFromUser,
} from "./operations";

export interface AuthState {
  user: IUser | null;
  token: string | null | undefined;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  favoritesLoading: boolean;
  favoritesError: string | null;
  noticesFavorites: INotices[];
  noticesViewed: INotices[];
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  favoritesLoading: false,
  favoritesError: null,
  noticesFavorites: [],
  noticesViewed: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        avatar?: string | null;
        pets?: string[];
        noticesFavorites: INotices[];
      }>
    ) => {
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        avatar: action.payload.avatar || null,
      };
      state.isLoggedIn = action.payload.email !== null;
      state.noticesFavorites = action.payload.noticesFavorites || [];
    },
    addViewedNotice: (state, action: PayloadAction<INotices>) => {
      const notice = action.payload;
      const alreadyViewed = state.noticesViewed.some(
        (item) => item._id === notice._id
      );

      if (!alreadyViewed) {
        state.noticesViewed.push(notice);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          avatar: action.payload.avatar || null,
          pets: action.payload.pets || [],
          phone: action.payload.phone || null,
          noticesFavorites: action.payload.noticesFavorites || [],
          noticesViewed: action.payload.noticesViewed || [],
        };
        state.noticesFavorites = action.payload.noticesFavorites || [];
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          avatar: action.payload.avatar || null,
          pets: action.payload.pets || [],
          phone: action.payload.phone || null,
          noticesFavorites: action.payload.noticesFavorites || [],
          noticesViewed: action.payload.noticesViewed || [],
        };
        state.noticesFavorites = action.payload.noticesFavorites || [];
        state.noticesViewed = action.payload.noticesViewed || [];
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(signoutUser.fulfilled, (state) => {
        state.user = null;
        state.noticesViewed = [];
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          avatar: action.payload.avatar || null,
          pets: action.payload.pets || [],
          phone: action.payload.phone || null,
          noticesFavorites: action.payload.noticesFavorites || [],
          noticesViewed: action.payload.noticesViewed || [],
        };
        state.noticesFavorites = action.payload.noticesFavorites || [];
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(addNoticeToFavorites.pending, (state) => {
        state.favoritesLoading = true;
        state.favoritesError = null;
      })
      .addCase(addNoticeToFavorites.fulfilled, (state, action) => {
        state.favoritesLoading = false;
        state.noticesFavorites.push(action.payload);
      })
      .addCase(addNoticeToFavorites.rejected, (state, action) => {
        state.favoritesLoading = false;
        state.favoritesError = action.payload as string;
      })
      .addCase(deleteNoticeFromFavorites.pending, (state) => {
        state.favoritesLoading = true;
        state.favoritesError = null;
      })
      .addCase(deleteNoticeFromFavorites.fulfilled, (state, action) => {
        state.favoritesLoading = false;
        state.noticesFavorites = state.noticesFavorites.filter(
          (notice) => notice._id !== action.payload
        );
      })
      .addCase(deleteNoticeFromFavorites.rejected, (state, action) => {
        state.favoritesLoading = false;
        state.favoritesError = action.payload as string;
      })
      .addCase(editUserInfo.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          avatar: action.payload.avatar || null,
          phone: action.payload.phone || null,
        };
      })
      .addCase(addPetToUser.fulfilled, (state, action) => {
        if (state.user) {
          state.user.pets = action.payload;
        }
      })
      .addCase(deletePetFromUser.fulfilled, (state, action) => {
        if (state.user) {
          state.user.pets = state.user.pets?.filter(
            (pet) => pet._id !== action.payload
          );
        }
      });
  },
});

export const { addViewedNotice } = authSlice.actions;
export const authReducer = authSlice.reducer;
