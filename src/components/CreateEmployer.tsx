import { useEffect, useRef, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaUpload } from "react-icons/fa";
import { Department } from "../types/Types";
import axiosInstance from "../utils/axiosInstance";

const CreateEmployer = ({ closeModal }: { closeModal: () => void }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
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
        <form className="mt-[45px]">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <label>სახელი*</label>
              <input
                className="w-[385px] mb-2 border border-[#CED4DA] rounded-md h-[42px] pl-2 focus:outline-none"
                type="text"
                placeholder="შეიყვანეთ სახელი"
              />
              <span className="text-[#6C757D] text-[11px]">
                მინიმუმ 2 სიმბოლო
              </span>
              <span className="text-[#6C757D] text-[11px]">
                მაქსიმუმ 255 სიმბოლო
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label>გვარი*</label>
              <input
                className="w-[385px] mb-2 border border-[#CED4DA] rounded-md h-[42px] pl-2 focus:outline-none"
                type="text"
                placeholder="შეიყვანეთ სახელი"
              />
              <span className="text-[#6C757D] text-[11px]">
                მინიმუმ 2 სიმბოლო
              </span>
              <span className="text-[#6C757D] text-[11px]">
                მაქსიმუმ 255 სიმბოლო
              </span>
            </div>
          </div>
          {/* Avatar */}
          <div className="mt-[45px]">
            <h2>ავატარი*</h2>
            <label className="border border-dashed h-[120px] border-[#CED4DA] rounded-[8px] mt-2 flex items-center justify-center cursor-pointer">
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
          </div>
          {/* Department */}
          <div className="mt-[45px]">
            <div className="flex flex-col col-span-2">
              <label htmlFor="department">დეპარტამენტი*</label>
              <select
                id="department"
                className="w-[550px] py-2 border border-[#DEE2E6] rounded-[5px] pl-2 mt-[6px] focus:outline-none bg-white"
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
