const AuthNav: React.FC = () => {
  return (
    <div className="uppercase font-bold flex flex-col items-center gap-2 text-center mx-5 md:flex-row md:justify-center xl:mx-0 ">
      <a
        href="/login"
        className="rounded-4xl w-[178px] py-3 bg-[#f6b83d] text-white md:w-[119px]"
      >
        Log in
      </a>
      <a
        href="/register"
        className="rounded-4xl w-[178px] py-3 bg-[#fff4df] text-[#f6b83d] md:w-[149px]"
      >
        Registration
      </a>
    </div>
  );
};

export default AuthNav;
