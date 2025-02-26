import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditUserValidationSchema } from "../../validation/schemas";
import { useAppDispatch, useAppSelector } from "../../store/tools/hooks";
import { selectUser } from "../../store/auth/selectors";
import { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { IUser } from "../../interfaces/interfaces";
import pic from "../../assets/images/header/notLoggedIn.svg";
import { editUserInfo } from "../../store/auth/operations";
import _ from "lodash";

type EditUserFormProps = {
  onClose: () => void;
};

const EditUserForm: React.FC<EditUserFormProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [preview, setPreview] = useState(user.avatar || "");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditUserValidationSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      avatar: user.avatar || "",
      phone: user.phone,
    },
  });

  const [initialValues] = useState(user);

  const onSubmit = async (data: IUser) => {
    if (_.isEqual(initialValues, data)) {
      onClose();
      return;
    }

    dispatch(editUserInfo(data));
    onClose();
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "petlove");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dxx9fqrgt/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.secure_url) {
        setValue("avatar", data.secure_url);
        setPreview(data.secure_url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <img
          src={preview || pic}
          alt="User's avatar"
          className="size-[68px] object-cover rounded-full overflow-hidden  mx-auto  md:size-[86px]"
        />
        <div className="relative flex gap-2 mb-2.5">
          <div className="flex gap-2">
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="border w-[57.5%] placeholder:text-[#262626] h-[42px] text-sm pl-3 py-2 pr-2 rounded-3xl border-[rgba(38,38,38,0.5)] md:w-[226px] truncate"
                  placeholder="Enter URL"
                  onChange={(e) => {
                    field.onChange(e);
                    setPreview(e.target.value);
                  }}
                />
              )}
            />
            <label className="p-2.5 bg-[#fff4df] text-[#262626] font-medium text-xs  rounded-3xl cursor-pointer flex items-center gap-[5px] md:px-5 md:gap-2">
              Upload photo
              <MdOutlineCloudUpload className="text-[#f6b83d] text-base md:text-lg" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onFileChange}
              />
            </label>
          </div>
          {errors.avatar && (
            <p className="text-sm text-red-500">{errors.avatar.message}</p>
          )}
        </div>

        <div>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="border w-[295px] placeholder:text-[#262626] h-[42px] font-medium text-sm pl-3 py-2 rounded-3xl border-[rgba(38,38,38,0.5)] md:h-[52px] md:w-[380px]"
                placeholder="Full Name"
              />
            )}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
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
                className="border w-full placeholder:text-[#262626] h-[42px] font-medium text-sm pl-3 py-2 rounded-3xl border-[rgba(38,38,38,0.5)] md:h-[52px] md:w-[380px]"
                placeholder="Email"
              />
            )}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="border w-full placeholder:text-[#262626] h-[42px] font-medium text-sm pl-3 py-2 rounded-3xl border-[rgba(38,38,38,0.5)] md:h-[52px] md:w-[380px]"
                placeholder="Phone Number"
              />
            )}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="submit"
            className="w-full rounded-[30px] bg-[#f6b83d] text-white font-bold text-sm py-3 md:py-4 md:text-base"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
