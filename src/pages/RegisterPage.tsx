import RegisterForm from "../components/RegisterForm";
import PetBlock from "../components/PetBlock";
import Title from "../components/Title";

const RegisterPage = () => {
  return (
    <div className="flex flex-col gap-[10px] mt-[26px] xl:flex-row mb-5 md:mb-8 xl:gap-8 xl:px-8">
      <PetBlock type="register" />

      <div className="h-[52%] flex flex-col p-5 rounded-4xl bg-[#fff] md:px-[140px] md:py-[30px] xl:px-[84px] xl:pb-[77px] xl:pt-5 xl:w-[48%]">
        <Title title="registration" />
        <p className="font-medium text-sm text-[#262626] mb-5 md:text-lg xl:mb-8">
          Thank you for interest in our platform.
        </p>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
