import { RootState } from "../store";

export const selectUser = (state: RootState) => state.auth.user;
export const selectUserName = (state: RootState) => state.auth.user.name;
export const selectProfilePic = (state: RootState) =>
  state.auth.user.profilePic;
export const selectFavorites = (state: RootState) =>
  state.auth.noticesFavorites;
export const selectViewed = (state: RootState) => state.auth.user.noticesViewed;
export const selectPets = (state: RootState) => state.auth.user.pets;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
