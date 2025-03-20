import { useEffect, useRef, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaUpload } from "react-icons/fa";
import { Department } from "../types/Types";
import axiosInstance from "../utils/axiosInstance";

const CreateEmployer = ({ closeModal }: { closeModal: () => void }) => {
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .min(2, "მინიმუმ 2 სიმბოლო")
      .max(255, "მაქსიმუმ 255 სიმბოლო")
      .required("სახელი სავალდებულოა"),
    lastName: yup
      .string()
      .min(2, "მინიმუმ 2 სიმბოლო")
      .max(255, "მაქსიმუმ 255 სიმბოლო")
      .required("სახელი სავალდებულოა"),
    image: yup
      .mixed()
      .test("required", "სურათის ატვირთვა აუცილებელია", (value) => {
        return value instanceof File;
      }),
    department: yup.string().required("დეპარტამენტი სავალდებულოა"),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const firstNameValue = watch("firstName");
  const lastNameValue = watch("lastName");

  const isFirstNameValid =
    firstNameValue?.length >= 2 && firstNameValue?.length <= 255;
  const firstNameError = errors.firstName;

  const isLastNameValid =
    lastNameValue?.length >= 2 && lastNameValue?.length <= 255;
  const lastNameError = errors.lastName;

  const [departments, setDepartments] = useState<Department[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setValue("image", file);
      trigger("image");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const departmentsRes = await axiosInstance.get("/departments");
      setDepartments(departmentsRes.data);
    };
    fetchDepartments();
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="fixed inset-0 backdrop-blur bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white w-[913px] rounded-lg shadow-lg relative z-10 pt-10 px-[50px] pb-[60px]"
      >
        <IoMdCloseCircleOutline
          onClick={closeModal}
          size={40}
          className="text-gray-500 hover:text-red-500 cursor-pointer duration-500 absolute right-[50px] top-10"
        />
        <h1 className="text-center mt-[37px] font-medium text-[32px] text-darkGray">
          თანამშრომლის დამატება
        </h1>
        <form className="mt-[45px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <label>სახელი*</label>
              <input
                className={`w-[385px] mb-2 border ${
                  firstNameError
                    ? "border-red-500"
                    : isFirstNameValid
                    ? "border-green-500"
                    : "border-[#CED4DA]"
                }  rounded-md h-[42px] pl-2 focus:outline-none`}
                type="text"
                placeholder="შეიყვანეთ სახელი"
                {...register("firstName")}
              />
              <span
                className={`text-[11px] ${
                  firstNameError
                    ? "text-red-500"
                    : isFirstNameValid
                    ? "text-green-500"
                    : "text-[#6C757D]"
                }`}
              >
                მინიმუმ 2 სიმბოლო
              </span>
              <span
                className={`text-[11px] ${
                  firstNameError
                    ? "text-red-500"
                    : isFirstNameValid
                    ? "text-green-500"
                    : "text-[#6C757D]"
                }`}
              >
                მაქსიმუმ 255 სიმბოლო
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label>გვარი*</label>
              <input
                className={`w-[385px] mb-2 border ${
                  lastNameError
                    ? "border-red-500"
                    : isLastNameValid
                    ? "border-green-500"
                    : "border-[#CED4DA]"
                }  rounded-md h-[42px] pl-2 focus:outline-none`}
                type="text"
                placeholder="შეიყვანეთ სახელი"
                {...register("lastName")}
              />
              <span
                className={`text-[11px] ${
                  lastNameError
                    ? "text-red-500"
                    : isLastNameValid
                    ? "text-green-500"
                    : "text-[#6C757D]"
                }`}
              >
                მინიმუმ 2 სიმბოლო
              </span>
              <span
                className={`text-[11px] ${
                  lastNameError
                    ? "text-red-500"
                    : isLastNameValid
                    ? "text-green-500"
                    : "text-[#6C757D]"
                }`}
              >
                მაქსიმუმ 255 სიმბოლო
              </span>
            </div>
          </div>
          {/* Avatar */}
          <div className="mt-[45px]">
            <h2>ავატარი*</h2>
            <label
              className={`border border-dashed h-[120px]  ${
                errors.image ? "border-red-500" : "border-[#CED4DA]"
              } rounded-[8px] mt-2 flex items-center justify-center cursor-pointer`}
            >
              {image ? (
                <img
                  src={image}
                  alt="Uploaded"
                  className="h-[90px] w-[90px] rounded-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <FaUpload className="text-2xl" />
                  <span className="text-sm mt-1">ატვირთეთ ფოტო</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <p className="text-[11px] mt-2 text-red-500">
              {errors.image ? "სურათი აუცილებელია" : ""}
            </p>
          </div>
          {/* Department */}
          <div className="mt-[45px]">
            <div className="flex flex-col col-span-2">
              <label htmlFor="department">დეპარტამენტი*</label>
              <select
                id="department"
                className="w-[550px] py-2 border border-[#DEE2E6] rounded-[5px] pl-2 mt-[6px] focus:outline-none bg-white"
                {...register("department")}
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Buttons */}
          <div className="mt-[45px] flex flex-row w-full items-center justify-end gap-[22px]">
            <button
              onClick={closeModal}
              className="flex items-center justify-center text-center rounded-[5px] h-[42px] px-4 bg-transparent border border-purple text-darkGray"
            >
              გაუქმება
            </button>
            <button className="flex items-center justify-center text-center rounded-[5px] h-[42px] bg-purple text-white px-[20px]">
              დაამატე თანამშრომელი
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployer;
