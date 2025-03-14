import { useEffect, useRef } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    firstName: yup
      .string()
      .min(2, "მინიმუმ 2 სიმბოლო უნდა იყოს")
      .max(255, "მაქსიმუმ 255 სიმბოლო უნდა იყოს")
      .required("სახელი აუცილებელია"),
    lastName: yup
      .string()
      .min(2, "მინიმუმ 2 სიმბოლო უნდა იყოს")
      .max(255, "მაქსიმუმ 255 სიმბოლო უნდა იყოს")
      .required("გვარი აუცილებელია"),
  })
  .required();

const CreateEmployer = ({ closeModal }: { closeModal: () => void }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

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

  const onSubmit = (data: any) => {
    console.log(data);
  };

  // Watch for input changes
  const firstName = watch("firstName");
  const lastName = watch("lastName");

  return (
    <div className="fixed inset-0 backdrop-blur bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white w-[913px] h-[713px] rounded-lg shadow-lg relative z-10 pt-10 px-[50px] pb-[60px]"
      >
        <IoMdCloseCircleOutline
          onClick={closeModal}
          size={40}
          className="text-gray-500 hover:text-red-500 cursor-pointer duration-500 absolute right-[50px] top-10"
        />
        <h1 className="text-center mt-[117px] font-medium text-[32px] text-darkGray">
          თანამშრომლის დამატება
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
          <div className="flex flex-row items-center w-full justify-between">
            <div className="mb-5">
              <label htmlFor="firstName" className="block text-lg">
                სახელი
              </label>
              <input
                id="firstName"
                type="text"
                {...register("firstName")}
                className="mt-2 p-2 border rounded-md w-[383px]"
              />
              <div className="mt-2">
                {errors.firstName ? (
                  <span className="text-red-500">
                    {errors.firstName.message}
                  </span>
                ) : (
                  <div className="flex flex-col">
                    <span
                      className={`${
                        firstName && firstName.length < 2
                          ? "text-red-500"
                          : firstName && firstName.length >= 2
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      მინიმუმ 2 სიმბოლო
                    </span>
                    <span
                      className={`${
                        firstName && firstName.length > 255
                          ? "text-red-500"
                          : firstName && firstName.length <= 255
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      მაქსიმუმ 255 სიმბოლო
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="lastName" className="block text-lg">
                გვარი
              </label>
              <input
                id="lastName"
                type="text"
                {...register("lastName")}
                className="mt-2 p-2 border rounded-md w-[383px]"
              />
              <div className="mt-2">
                {errors.lastName ? (
                  <span className="text-red-500">
                    {errors.lastName.message}
                  </span>
                ) : (
                  <div className="flex flex-col">
                    <span
                      className={`${
                        lastName && lastName.length < 2
                          ? "text-red-500"
                          : lastName && lastName.length >= 2
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      მინიმუმ 2 სიმბოლო
                    </span>
                    <span
                      className={`${
                        lastName && lastName.length > 255
                          ? "text-red-500"
                          : lastName && lastName.length <= 255
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      მაქსიმუმ 255 სიმბოლო
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-5 p-2 bg-blue-500 text-white rounded-md"
          >
            შევავსო
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployer;
