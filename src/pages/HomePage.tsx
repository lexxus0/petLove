import mobImg from "../assets/images/welcome/mob.webp";
import tabImg from "../assets/images/welcome/tab.webp";
import deskImg from "../assets/images/welcome/desk.webp";

const HomePage = () => {
  return (
    <div className="relative h-screen flex flex-col py-5">
      <div className="h-1/2 bg-[#f6b83d] flex flex-col items-center justify-center text-white px-5 gap-6 rounded-[30px] md:rounded-[60px] xl:flex-row xl:items-end xl:justify-around">
        <h1 className="font-bold text-[50px] leading-[96%] tracking-[-0.03em] mt-12 md:text-[80px] xl:ml-9 xl:mb-8 xl:text-[90px] xl:h-[174px] xl:w-[760px]">
          Take good <span className="text-[rgba(255,255,255,0.4)]">care</span>{" "}
          of your small pets
        </h1>
        <p className="font-medium text-sm tracking-[-0.02em] md:ml-[417px] md:mr-8 xl:text-[18px] xl:mx-0 xl:w-[282px] xl:mb-10 xl:h-22">
          Choosing a pet for your home is a choice that is meant to enrich your
          life with immeasurable joy and tenderness.
        </p>
      </div>
      <div className="h-1/2">
        <img
          src={deskImg}
          srcSet={`
    ${mobImg} 767w, 
    ${tabImg} 1279w, 
    ${deskImg} 1280w
  `}
          sizes="
    (max-width: 767px) 100vw, 
    (max-width: 1279px) 100vw, 
    100vw
  "
          alt="Picture of a dog with its owner"
          className="w-full h-full object-cover rounded-[30px] md:rounded-[60px]"
        />
      </div>
    </div>
  );
};

export default HomePage;
