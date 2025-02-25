import LoginForm from "../components/forms/LoginForm";
import PetBlock from "../components/PetBlock";
import Title from "../components/Title";

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-[10px] mt-[26px] mb-5 xl:gap-8 xl:flex-row xl:px-8">
      <PetBlock type="login" />

      <div className="h-[52%] flex flex-col p-5 rounded-4xl bg-[#fff] py-[55px] md:px-[140px] md:py-[71px] xl:pb-[118px] xl:pt-[58px] xl:px-[84px] xl:w-[48%]">
        <Title title="login" />

        <p className="font-medium text-sm text-[#262626] mb-5 md:text-lg md:mb-8">
          Welcome! Please enter your credentials to login to the platform:
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
