import { formatWorkDays } from "../helpers/helpers";
import { IFriends } from "../interfaces/interfaces";

type FriendsItemProps = {
  friend: IFriends;
};

const truncateText = (text: string, maxLength: number = 20): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const formatText = (prop: string | undefined | null) => {
  return prop && prop.trim() !== "" ? prop : "Not provided";
};

const FriendsItem: React.FC<FriendsItemProps> = ({ friend }) => {
  const email = formatText(friend.email);
  const address = formatText(friend.address);
  const phone = formatText(friend.phone);

  return (
    <li
      key={friend._id}
      className="flex rounded-2xl gap-[14px] bg-white pl-5 pr-[25px] py-10 h-[184px] md:h-[196px] md:w-[342px] md:gap-4 xl:w-[370px] xl:gap-5 relative"
    >
      <div className="p-2 rounded-[30px] bg-[#fff4df] absolute font-medium text-xs text-[#f6b83d] right-3 top-3 md:text-sm">
        {formatWorkDays(friend.workDays)}
      </div>
      <a href={friend.url} target="_blank" className="h-20">
        <img
          src={friend.imageUrl}
          alt={`${friend.title}'s image`}
          className="rounded-full w-auto h-auto max-w-20 md:max-w-[90px]"
        />
      </a>

      <div className="flex flex-col w-full">
        <p className="font-bold text-base text-[#262626] mb-2 md:text-xl md:mb-4">
          {friend.title}
        </p>

        <p className="font-medium text-sm text-[rgba(38,38,38,0.5)] mb-2">
          Email:{" "}
          {email !== "Not provided" ? (
            <a
              href={`mailto:${email}`}
              className="text-[#262626] hover:text-blue-500 transition-colors"
            >
              {truncateText(email, 16)}
            </a>
          ) : (
            <span className="text-[#262626]">{email}</span>
          )}
        </p>

        <p className="font-medium text-sm text-[rgba(38,38,38,0.5)] mb-2">
          Address:{" "}
          {address !== "Not provided" ? (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#262626] hover:text-blue-500 transition-colors"
            >
              {truncateText(address, 16)}
            </a>
          ) : (
            <span className="text-[#262626]">{address}</span>
          )}
        </p>

        <p className="font-medium text-sm text-[rgba(38,38,38,0.5)]">
          Phone:{" "}
          {phone !== "Not provided" ? (
            <a
              href={`tel:${phone}`}
              className="text-[#262626] hover:text-blue-500 transition-colors"
            >
              {phone}
            </a>
          ) : (
            <span className="text-[#262626]">{phone}</span>
          )}
        </p>
      </div>
    </li>
  );
};

export default FriendsItem;
