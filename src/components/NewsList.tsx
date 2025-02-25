import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { INews } from "../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../store/tools/hooks";
import { selectNews, selectTotalPages } from "../store/news/selectors";
import { useSearchParams } from "react-router-dom";
import { fetchNews } from "../store/news/operations";
import { selectKeyword } from "../store/filter/selectors";
import NewsItem from "./NewsItem";

const NewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  const totalPages = useAppSelector(selectTotalPages);
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = useAppSelector(selectKeyword);

  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const perPage = 2;

  useEffect(() => {
    setSearchParams({ page: currentPage.toString(), keyword });
    dispatch(fetchNews({ page: currentPage, perPage, keyword }));
  }, [dispatch, currentPage, keyword, setSearchParams]);

  return (
    <ul className="md:flex md:flex-wrap md:gap-6 flex-grow xl:gap-8">
      {news.map((item: INews) => (
        <NewsItem key={item._id} item={item} />
      ))}
      <div className="w-full mt-auto flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </ul>
  );
};

export default NewsList;
