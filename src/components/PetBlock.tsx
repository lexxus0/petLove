import React from "react";
import mobRegImg from "../assets/images/register/mob.webp";
import tabRegImg from "../assets/images/register/tab.webp";
import deskRegImg from "../assets/images/register/desk.webp";
import mobLogImg from "../assets/images/login/mob.webp";
import tabLogImg from "../assets/images/login/tab.webp";
import deskLogImg from "../assets/images/login/desk.webp";
import mobAddPetImg from "../assets/images/addpet/mob.webp";
import tabAddPetImg from "../assets/images/addpet/tab.webp";
import deskAddPetImg from "../assets/images/addpet/desk.webp";

interface PetBlockProps {
  type: "register" | "login" | "add-pet";
}

const PetBlock: React.FC<PetBlockProps> = ({ type }) => {
  const data =
    type === "register"
      ? {
          name: "Jack",
          birthday: "18.10.2021",
          logo: "🐈",
          description:
            "Jack is a gray Persian cat with green eyes. He loves to be pampered and groomed, and enjoys playing with toys.",
          images: {
            mob: mobRegImg,
            tab: tabRegImg,
            desk: deskRegImg,
          },
        }
      : type === "login"
      ? {
          name: "Rich",
          birthday: "21.09.2020",
          logo: "🐶",
          description:
            "Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!",
          images: {
            mob: mobLogImg,
            tab: tabLogImg,
            desk: deskLogImg,
          },
        }
      : {
          images: {
            mob: mobAddPetImg,
            tab: tabAddPetImg,
            desk: deskAddPetImg,
          },
        };

  return (
    <div>
      <div className="relative">
        <picture>
          <source srcSet={data.images.desk} media="(min-width: 1280px)" />
          <source srcSet={data.images.tab} media="(min-width: 768px)" />
          <source srcSet={data.images.mob} media="(max-width: 767px)" />
          <img
            src={data.images.desk}
            alt={type ? type : "Pet's picture"}
            className="w-full h-full object-contain rounded-4xl xl:w-[592px] xl:h-[654px]"
          />
        </picture>
        {type !== "add-pet" && (
          <div className="hidden md:block rounded-[20px] bg-white w-[294px] h-[121px] absolute left-8 bottom-8 xl:left-[61px] xl:bottom-[97px]">
            <div>
              <p className="rounded-full bg-[#fff4df] p-3 size-[60px] text-center text-3xl absolute top-4 left-4">
                {data.logo}
              </p>
              <div className="flex w-[194px] flex-col ml-21 mt-[19px]">
                <div className="flex items-baseline justify-between mb-2">
                  <p className="font-bold text-[16px] text-[#f6b83d]">
                    {data.name}
                  </p>
                  <p className="font-medium text-xs text-[rgba(38,38,38,0.5)]">
                    Birthday:{" "}
                    <span className="text-[#262626]">{data.birthday}</span>
                  </p>
                </div>
                <p className="font-medium text-xs text-[rgba(38,38,38,0.8)] leading-[117%] tracking-[-0.02em]">
                  {data.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetBlock;
