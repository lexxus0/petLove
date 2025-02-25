import NoticesFilters from "../components/NoticesFilters";
import NoticesList from "../components/NoticesList";
import Title from "../components/Title";

const NoticesPage = () => {
  return (
    <div className="xl:px-16">
      <Title title="findpet" />
      <NoticesFilters />
      <NoticesList />
    </div>
  );
};

export default NoticesPage;
