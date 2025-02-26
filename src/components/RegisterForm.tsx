import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerValidationSchema } from "../validation/schemas";
import { registerUser } from "../store/auth/operations";
import { useAppDispatch } from "../store/tools/hooks";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userData } = data;
    dispatch(registerUser(userData));
  };

  return (
    <div className="bg-white rounded-3xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="border w-full h-[42px] font-medium text-sm text-gray-600 pl-3 py-2 rounded-3xl border-gray-300 md:h-[52px]"
                placeholder="Name"
              />
            )}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-2">{errors.name.message}</p>
          )}
        </div>

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
            <p className="text-sm text-red-500 mt-2">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="relative">
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
          </div>
          {errors.password && (
            <p className="text-sm text-red-500 mt-2">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="xl:mb-8">
          <div className="relative">
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type={showConfirmPassword ? "text" : "password"}
                  className="border w-full h-[42px] font-medium text-sm text-gray-600 pl-3 py-2 rounded-3xl border-gray-300 md:h-[52px]"
                  placeholder="Confirm Password"
                />
              )}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-2">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className="w-full py-3 bg-[#f6b83d] text-white rounded-3xl disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 uppercase"
        >
          Registration
        </button>
        <p className="text-center font-medium text-xs leading-[117%] tracking-[-0.03em] text-[rgba(38,38,38,0.5)] md:text-base">
          Already have an account?{" "}
          <span
            className="font-bold underline text-[#f6b83d]  cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
