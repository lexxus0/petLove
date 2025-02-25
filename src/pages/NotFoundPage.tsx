import mobCatImg from "../assets/images/notfound/tab404Img.png";

const NotFoundPage = () => {
  return (
    <div className="rounded-4xl bg-[#f6b83d] flex flex-col gap-5 my-8 h-screen items-center justify-center">
      <p className="font-extrabold text-[120px] text-white flex items-center justify-center md:text-[300px]">
        4
        <span className="rounded-full bg-[rgba(255,255,255,0.1)] ">
          <img
            src={mobCatImg}
            alt="Funny cat image"
            className="p-1 w-[117px] h-[117px] md:w-[280px] md:h-[280px] md:p-2 "
          />
        </span>
        4
      </p>
      <p className="font-bold text-[16px] text-white md:text-2xl md:mt-[-70px]">
        Ooops! This page not found :(
      </p>
      <a href="/home">
        <button className="rounded-4xl text-[#f6b83d] bg-[#fff4df] py-4 px-7">
          To home page
        </button>
      </a>
    </div>
  );
};

export default NotFoundPage;
