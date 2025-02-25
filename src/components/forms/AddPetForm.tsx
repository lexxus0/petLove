import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addPetValidationSchema } from "../../validation/schemas";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendar } from "react-icons/ci";
import { IoPawOutline } from "react-icons/io5";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useAppDispatch } from "../../store/tools/hooks";
import { addPetToUser } from "../../store/auth/operations";
import { format } from "date-fns";

const AddPetForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarInput, setAvatarInput] = useState("");
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const speciesList = [
    "dog",
    "cat",
    "monkey",
    "bird",
    "snake",
    "turtle",
    "lizard",
    "frog",
    "fish",
    "ants",
    "bees",
    "butterfly",
    "spider",
    "scorpion",
  ];

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addPetValidationSchema),
    defaultValues: {
      title: "",
      name: "",
      imgURL: "",
      species: "",
      birthday: "",
      sex: "",
    },
  });

  const onSubmit = async (data: {
    title: string;
    name: string;
    imgURL: string;
    species: string;
    birthday: string;
    sex: string;
  }) => {
    dispatch(addPetToUser(data));
    navigate("/profile");
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setPreview(avatarInput);
      setValue("imgURL", avatarInput);
    }, 1000);

    return () => clearTimeout(handler);
  }, [avatarInput, setValue]);

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
        setValue("imgURL", data.secure_url);
        setPreview(data.secure_url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="bg-white rounded-3xl5">
      <h3 className="font-bold text-[28px] text-[#262626] mb-6 md:text-[32px]">
        Add my pet /{" "}
        <span className="text-sm font-bold text-[rgba(43,43,42,0.4)] md:text-base">
          Personal details
        </span>
      </h3>
      <form className="md:relative" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative xl:mb-8 md:absolute top-[-10px]">
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <div className="flex gap-2 text-center text-lg">
                <button
                  type="button"
                  className={`rounded-[30px] size-8 md:size-10 ${
                    field.value === "female"
                      ? "bg-[#f43f5e] text-white"
                      : "text-[#f43f5e] bg-[rgba(244,63,94,0.1)]"
                  }`}
                  onClick={() => field.onChange("female")}
                >
                  ♀
                  <input type="hidden" {...field} />
                </button>
                <button
                  type="button"
                  className={`rounded-[30px] size-8 md:size-10 ${
                    field.value === "male"
                      ? "bg-[#54adff] text-white"
                      : "text-[#54adff] bg-[rgba(84,173,255,0.1)]"
                  }`}
                  onClick={() => field.onChange("male")}
                >
                  ♂
                  <input type="hidden" {...field} />
                </button>
                <button
                  type="button"
                  className={`rounded-[30px]  size-8 md:size-10 relative ${
                    field.value === "multiple"
                      ? "bg-[#f6b83d] text-white"
                      : "text-[#f6b83d] bg-[#fff4df]"
                  }`}
                  onClick={() => field.onChange("multiple")}
                >
                  <span className="absolute top-0 left-2 md:left-3.25 md:top-0.75">
                    ⚤
                    <input type="hidden" {...field} />
                  </span>
                </button>
              </div>
            )}
          />
          {errors.sex && (
            <p className="text-sm text-red-500">{errors.sex.message}</p>
          )}
        </div>
        <div>
          <div className="rounded-full overflow-hidden mx-auto mb-4">
            {preview ? (
              <img
                src={preview}
                alt="Pet's image"
                className="size-[68px] object-cover rounded-full overflow-hidden  mx-auto  md:size-[86px]"
              />
            ) : (
              <div className="rounded-full overflow-hidden mx-auto size-[68px] bg-[#fff4df] p-4 text-[#f6b83d] text-4xl text-center md:size-[86px] md:text-5xl md:p-4.5">
                <IoPawOutline />
              </div>
            )}
          </div>
          <div className="relative flex gap-2 mb-2.5">
            <Controller
              name="imgURL"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="border w-[57.5%] h-[42px] text-sm pl-3 py-2 rounded-3xl border-gray-300 md:w-[70%] truncate"
                  placeholder="Enter URL"
                  value={avatarInput}
                  onChange={(e) => setAvatarInput(e.target.value)}
                />
              )}
            />
            <label className="p-2.5 bg-[#fff4df] text-[#262626] font-medium text-xs  rounded-3xl cursor-pointer flex items-center gap-[5px]">
              Upload photo
              <MdOutlineCloudUpload className="text-[#f6b83d] text-base" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onFileChange}
              />
            </label>
          </div>
          {errors.imgURL && (
            <p className="text-sm text-red-500">{errors.imgURL.message}</p>
          )}
        </div>
        <div>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="border w-full h-[42px] font-medium text-sm pl-3 py-2 rounded-3xl border-gray-300 mb-2.5 md:h-[52px] md:mb-[18px]"
                placeholder="Title"
              />
            )}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
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
                className="border w-full h-[42px] font-medium text-sm pl-3 py-2 rounded-3xl border-gray-300 mb-2.5  md:h-[52px] md:mb-[18px]"
                placeholder="Pet's Name"
              />
            )}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="flex gap-2 md:gap-3 md:mb-10 xl:w-[432px]">
          <div className="relative flex-1">
            <Controller
              name="birthday"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <div>
                  <DatePicker
                    selected={value ? new Date(value) : null}
                    onChange={(date: Date | null) => {
                      onChange(date ? format(date, "yyyy-MM-dd") : ""); // Convert to YYYY-MM-DD
                    }}
                    className="border w-full h-[42px] font-medium text-sm text-gray-600 pl-3 py-2 rounded-3xl border-gray-300 md:h-[52px] md:w-[210px]"
                    dateFormat="dd.MM.yyyy"
                    placeholderText="00.00.0000"
                  />
                  <input type="hidden" ref={ref} value={value || ""} />
                </div>
              )}
            />
            <CiCalendar className="absolute top-3 right-2.5 md:top-4.5 md:right-3.5" />
            {errors.birthday && (
              <p className="text-sm text-red-500">{errors.birthday.message}</p>
            )}
          </div>
          <Controller
            name="species"
            control={control}
            render={({ field }) => (
              <div className="relative flex-1">
                <button
                  type="button"
                  className="border w-full h-[42px] font-medium text-sm text-gray-600 px-3 py-2 rounded-3xl border-gray-300 md:h-[52px] flex justify-between items-center"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span
                    className={field.value ? "text-gray-700" : "text-gray-400"}
                  >
                    {field.value
                      ? field.value.charAt(0).toUpperCase() +
                        field.value.slice(1).toLowerCase()
                      : "Type of pet"}
                  </span>
                  <IoIosArrowDown
                    className={`text-gray-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-3xl shadow-md mt-2 max-h-48 overflow-y-auto z-10">
                    {speciesList.map((species) => (
                      <li
                        key={species}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-700"
                        onClick={() => {
                          field.onChange(species);
                          setIsOpen(false);
                        }}
                      >
                        {species.charAt(0).toUpperCase() + species.slice(1)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          />
          {errors.species && (
            <p className="text-sm text-red-500">{errors.species.message}</p>
          )}
        </div>
        <div className="flex justify-end w-full mt-8 gap-2 md:font-bold md:font-base">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            disabled={Object.keys(errors).length > 0}
            className="px-8 py-2 bg-[rgba(38,38,38,0.1)] text-[#262626] rounded-3xl disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 md:px-[67px]"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={Object.keys(errors).length > 0}
            className="px-6 py-2 bg-[#f6b83d] text-white rounded-3xl disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 md:px-[67px]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPetForm;
