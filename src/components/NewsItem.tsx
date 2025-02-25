import { INews } from "../interfaces/interfaces";
import { formatDate, truncateText } from "../helpers/helpers";

type NewsItemProps = {
  item: INews;
};

const NewsItem: React.FC<NewsItemProps> = ({ item }) => {
  return (
    <li className="flex flex-col mb-6 md:mt-11 md:w-[340px] md:h-[476px] xl:w-[362px]">
      <img
        src={item.imgUrl}
        alt={`Image of ${item.title}`}
        className="rounded-2xl w-full h-[190px] mb-5 md:mb-7 md:h-[226px]"
      />
      <h3 className="font-bold text-base text-[#262626] mb-3 md:mb-[14px] md:text-xl min-h-[50px]">
        {item.title}
      </h3>
      <p className="text-sm font-medium text-[#262626] mb-5 md:text-base md:mb-7 min-h-[60px] md:line-clamp-3">
        <span className="md:hidden">{item.text}</span>{" "}
        <span className="hidden md:inline">{truncateText(item.text)}</span>{" "}
      </p>

      <div className="mt-auto flex justify-between font-medium text-sm md:text-base">
        <p className="text-[rgba(38,38,38,0.5)]">{formatDate(item.date)}</p>
        <a href={item.url} className="underline text-[#f6b83d]" target="_blank">
          Read more
        </a>
      </div>
    </li>
  );
};

export default NewsItem;
