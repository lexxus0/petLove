import Title from "../components/Title";
import FriendsList from "../components/FriendsList";
import { useEffect } from "react";
import { fetchFriends } from "../store/friends/operations";
import { useAppDispatch } from "../store/tools/hooks";

const FriendsPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <div className="xl:px-16">
      <Title title="friends" />
      <FriendsList />
    </div>
  );
};

export default FriendsPage;
