interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  const renderTitle = () => {
    switch (title.toLowerCase()) {
      case "login":
        return "Log In";
      case "registration":
        return "Registration";
      case "news":
        return "News";
      case "friends":
        return "Our Friends";
      case "findpet":
        return "Find Your Favorite Pet";
      case "addpet":
        return "Add My Pet";
      default:
        return "Unknown Page";
    }
  };

  return (
    <h1 className="font-bold text-3xl text-[#262626] mb-1 md:text-[54px] mt-[60px] ">
      {renderTitle()}
    </h1>
  );
};

export default Title;
