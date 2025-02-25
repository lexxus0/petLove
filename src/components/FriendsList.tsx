import { useAppSelector } from "../store/tools/hooks";
import { selectFriends } from "../store/friends/selectors";
import FriendsItem from "./FriendsItem";
import { IFriends } from "../interfaces/interfaces";

const FriendsList = () => {
  const friends = useAppSelector(selectFriends);

  return (
    <ul className="flex flex-col gap-5 mt-9 md:mt-10 md:flex-row md:flex-wrap xl:mt-14">
      {friends.map((friend: IFriends) => (
        <FriendsItem key={friend._id} friend={friend} />
      ))}
    </ul>
  );
};

export default FriendsList;
