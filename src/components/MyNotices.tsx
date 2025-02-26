import { INotices } from "../interfaces/interfaces";
import NoticesItem from "./NoticesItem";
import { useAppSelector } from "../store/tools/hooks";
import { selectFavorites, selectViewed } from "../store/auth/selectors";
import { useState } from "react";

const MyNotices = () => {
  const favorites = useAppSelector(selectFavorites);
  const viewed = useAppSelector(selectViewed);
  const [active, setActive] = useState("favorite");

  return (
    <>
      <div>
        <div className="flex gap-2.5">
          <button
            onClick={() => setActive("favorite")}
            className={`${
              active === "favorite" ? "bg-[#f6b83d] text-white" : "bg-white"
            } rounded-[30px] px-3`}
          >
            My favorite pets
          </button>
          <button
            onClick={() => setActive("viewed")}
            className={`${
              active === "viewed" ? "bg-[#f6b83d] text-white" : "bg-white"
            } rounded-[30px] px-[38px] py-3`}
          >
            Viewed
          </button>
        </div>
        {active === "favorite" ? (
          <ul className="my-10 flex flex-col gap-5 md:flex-row md:flex-wrap md:mt-11 md:mb-[60px] xl:gap-[31px] xl:mt-10">
            {Array.isArray(favorites) && favorites !== null ? (
              favorites.map((favorite: INotices) => (
                <NoticesItem
                  key={favorite._id}
                  notice={favorite}
                  position="profile"
                  type="delete"
                />
              ))
            ) : (
              <p className="font-medium text-sm text-[#262626] text-center md:text-base md:py-[180px] md:px-[155px] xl:px-[135px] xl:pt-[180px] xl:pb-0">
                Oops,{" "}
                <span className="font-bold text-[#f6b83d]">
                  looks like there aren't any furries
                </span>{" "}
                on our adorable page yet. Do not worry! View your pets on the
                "find your favorite pet" page and add them to your favorites.
              </p>
            )}
          </ul>
        ) : (
          <ul className="my-5 flex flex-col gap-5 md:flex-row md:flex-wrap md:mt-11 md:mb-[60px] xl:gap-[31px] xl:mt-10 xl:flex-row">
            {Array.isArray(viewed) && viewed !== null ? (
              viewed.map((view: INotices) => (
                <NoticesItem
                  key={view._id}
                  notice={view}
                  type="default"
                  position="profile"
                />
              ))
            ) : (
              <p className="font-medium text-sm text-[#262626] text-center md:text-base md:py-[180px] md:px-[155px] xl:px-[135px] xl:pt-[180px] xl:pb-0">
                Oops,{" "}
                <span className="font-bold text-[#f6b83d]">
                  looks like there aren't viewed furries
                </span>{" "}
                on our adorable page yet. Do not worry! View your pets on the
                "find your favorite pet" page.
              </p>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default MyNotices;
