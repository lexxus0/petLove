import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectNameFilter } from "../filter/selectors";
import { INews } from "../../interfaces/interfaces";

export const selectNews = (state: RootState) => state.news.news;
export const selectTotalPages = (state: RootState) => state.news.totalPages;

export const selectFilteredNews = createSelector(
  [selectNews, selectNameFilter],
  (news, filter) => {
    const newFilter = filter.toLowerCase();
    return news.filter((item: INews) =>
      item.title.toLowerCase().includes(newFilter)
    );
  }
);
