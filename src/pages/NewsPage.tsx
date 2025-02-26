import NewsList from "../components/NewsList";
import SearchField from "../components/SearchField";
import Title from "../components/Title";

const NewsPage = () => {
  return (
    <div className="xl:px-16">
      <div className="md:flex md:justify-between md:items-end">
        <Title title="news" />
        <SearchField color="text-[rgba(38,38,38,0.5)]" bg="bg-inherit" />
      </div>
      <NewsList />
    </div>
  );
};

export default NewsPage;
