import { RootState } from "../store";

export const selectNotices = (state: RootState) => state.notices.notices;
export const selectTotalPages = (state: RootState) => state.notices.totalPages;
