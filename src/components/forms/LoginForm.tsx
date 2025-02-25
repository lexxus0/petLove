import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginValidationSchema } from "../../validation/schemas";
import { useAppDispatch } from "../../store/tools/hooks";
import { loginUser } from "../../store/auth/operations";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="bg-white rounded-3xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                className="border w-full h-[42px] font-medium text-sm text-gray-600 pl-3 py-2 rounded-3xl border-gray-300 md:h-[52px]"
                placeholder="Email"
              />
            )}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="relative xl:mb-10">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type={showPassword ? "text" : "password"}
                className="border w-full h-[42px] font-medium text-sm text-gray-600 pl-3 py-2 rounded-3xl border-gray-300 md:h-[52px]"
                placeholder="Password"
              />
            )}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className="w-full py-3 mt-5 bg-[#f6b83d] text-white rounded-3xl disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 uppercase"
        >
          Log in
        </button>
        <p className="text-center font-medium text-xs leading-[117%] tracking-[-0.03em] text-[rgba(38,38,38,0.5)] md:text-base">
          Don't have an account?{" "}
          <span
            className="font-bold underline text-[#f6b83d] cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
