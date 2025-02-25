import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/tools/hooks";
import { fetchNotices } from "../store/notices/operations";
import { useSearchParams } from "react-router-dom";
import { selectNotices, selectTotalPages } from "../store/notices/selectors";
import Pagination from "./Pagination";
import NoticesItem from "./NoticesItem";
import { INotices } from "../interfaces/interfaces";
import {
  selectByPopularity,
  selectByPrice,
  selectChosenCategory,
  selectChosenLocations,
  selectChosenSex,
  selectChosenSpecies,
  selectKeyword,
} from "../store/filter/selectors";

const NoticesList = () => {
  const dispatch = useAppDispatch();
  const notices = useAppSelector(selectNotices);
  const totalPages = useAppSelector(selectTotalPages);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const selectedCategory = useAppSelector(selectChosenCategory);
  const selectedSex = useAppSelector(selectChosenSex);
  const selectedSpecies = useAppSelector(selectChosenSpecies);
  const selectedLocation = useAppSelector(selectChosenLocations);
  const selectedKeyword = useAppSelector(selectKeyword);
  const selectedByPopularity = useAppSelector(selectByPopularity);
  const selectedByPrice = useAppSelector(selectByPrice);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategory,
    selectedKeyword,
    selectedSex,
    selectedSpecies,
    selectedLocation,
    selectedByPopularity,
    selectedByPrice,
  ]);

  useEffect(() => {
    const params = new URLSearchParams({
      page: currentPage.toString(),
    });

    if (selectedSex) params.set("sex", selectedSex);
    if (selectedSpecies) params.set("species", selectedSpecies);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedKeyword) params.set("keyword", selectedKeyword);
    if (selectedLocation !== "" && selectedLocation)
      params.set("locationId", selectedLocation._id);

    if (selectedByPopularity === true) {
      params.set("byPopularity", String(true));
    } else if (selectedByPopularity === false) {
      params.set("byPopularity", String(false));
    }

    if (selectedByPrice === true) {
      params.set("byPrice", String(true));
    }

    setSearchParams(params);
    dispatch(
      fetchNotices({
        page: currentPage,
        limit: 6,
        sex: selectedSex || undefined,
        keyword: selectedKeyword || undefined,
        species: selectedSpecies || undefined,
        category: selectedCategory || undefined,
        locationId:
          selectedLocation !== "" && selectedLocation
            ? selectedLocation._id
            : undefined,
        popularity: selectedByPopularity ?? undefined,
        price: selectedByPrice === true ? selectedByPrice : undefined,
      })
    );
  }, [
    currentPage,
    selectedCategory,
    selectedSex,
    selectedSpecies,
    selectedKeyword,
    selectedLocation,
    selectedByPopularity,
    selectedByPrice,
    dispatch,
    setSearchParams,
  ]);

  return (
    <>
      <ul className="my-10 flex flex-col gap-5 md:flex-row md:flex-wrap md:mt-11 md:mb-[60px] xl:gap-[31px] xl:mt-10">
        {notices.map((notice: INotices) => (
          <NoticesItem key={notice._id} notice={notice} type="add" />
        ))}
      </ul>
      <div className="w-full mt-auto flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default NoticesList;
