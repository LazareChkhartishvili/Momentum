import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Department, Employee, Priority, Status } from "../types/Types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router";

const AddTask = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [departmentsRes, statusesRes, prioritiesRes, employeesRes] =
          await Promise.all([
            axiosInstance.get("/departments"),
            axiosInstance.get("/statuses"),
            axiosInstance.get("/priorities"),
            axiosInstance.get("/employees"),
          ]);

        setDepartments(departmentsRes.data);
        setStatuses(statusesRes.data);
        setPriorities(prioritiesRes.data);
        setEmployees(employeesRes.data);
        console.log(employeesRes.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(2, "მინიმუმ 2 სიმბოლო")
      .max(255, "მაქსიმუმ 255 სიმბოლო")
      .required("სათაური სავალდებულოა"),
    description: yup
      .string()
      .min(2, "მინიმუმ 2 სიმბოლო")
      .max(255, "მაქსიმუმ 255 სიმბოლო")
      .required("აღწერა სავალდებულოა"),
    due_date: yup
      .date()
      .nullable()
      .required("გთხოვთ მიუთითოთ დედლაინი")
      .test(
        "is-future-date",
        "დედლაინი უნდა იყოს მომავალი თარიღი",
        (value) => value && new Date(value) > new Date()
      ),
    department: yup.string().required("დეპარტამენტი სავალდებულოა"),
    priority_id: yup.string(),
    status_id: yup.string(),
    employee_id: yup.string(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      department: "",
      priority_id: "",
      status_id: "",
      employee_id: "",
    },
  });

  const titleValue = watch("name");
  const descriptionValue = watch("description");

  const isTitleValueError =
    titleValue?.length >= 2 && titleValue?.length <= 255;
  const titleValueError = errors.name;

  const isDescValueError =
    descriptionValue?.length >= 2 && descriptionValue?.length <= 255;
  const descValueError = errors.description;

  const onSubmit = (data: any) => {
    console.log(data);
    try {
      axiosInstance.post("/tasks", data);
      navigate("/");
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  return (
    <div>
      <h2 className="text-darkGray dark:text-white font-semibold text-[34px] mb-[25px]">
        შექმენი ახალი დავალება
      </h2>
      <div className="bg-[#FBF9FF] dark:bg-transparent pt-[71px] px-[51px] pb-[70px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-4 grid-rows-2 h-[580px]"
        >
          {/* Title Field */}
          <div className="flex flex-col col-span-2">
            <label>სათაური*</label>
            <input
              className={`w-[550px] ${
                errors.name ? "border-red-500" : "border-[#DEE2E6]"
              } dark:text-black placeholder:dark:text-gray-500 py-2 border border-[#DEE2E6] rounded-[5px] pl-2 mt-[6px] focus:outline-none`}
              type="text"
              placeholder="შეიყვანეთ სათაური"
              {...register("name")}
            />
            <span
              className={`mt-2 text-[11px] ${
                titleValueError
                  ? "text-red-500"
                  : isTitleValueError
                  ? "text-green-500"
                  : "text-[#6C757D]"
              }`}
            >
              მინიმუმ 2 სიმბოლო
            </span>
            <span
              className={`text-[11px] ${
                titleValueError
                  ? "text-red-500"
                  : isTitleValueError
                  ? "text-green-500"
                  : "text-[#6C757D]"
              }`}
            >
              მაქსიმუმ 255 სიმბოლო
            </span>
          </div>

          {/* Department Field */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="department">დეპარტამენტი*</label>
            <select
              id="department"
              className="w-[550px] dark:text-black placeholder:dark:text-gray-500 py-2 border border-[#DEE2E6] rounded-[5px] pl-2 mt-[6px] focus:outline-none bg-white"
              {...register("department")}
            >
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description Field */}
          <div className="flex flex-col col-span-2">
            <label>აღწერა</label>
            <textarea
              placeholder="შეიყვანეთ აღწერა"
              {...register("description")}
              className={`w-[550px] ${
                errors.description ? "border-red-500" : "border-[#DEE2E6]"
              } dark:text-black py-2 h-[150px] placeholder:dark:text-gray-500 border border-[#DEE2E6] rounded-[5px] pl-2 mt-[6px] focus:outline-none`}
            ></textarea>
            <span
              className={`mt-2 text-[11px] ${
                descValueError
                  ? "text-red-500"
                  : isDescValueError
                  ? "text-green-500"
                  : "text-[#6C757D]"
              }`}
            >
              მინიმუმ 2 სიმბოლო
            </span>
            <span
              className={`text-[11px] ${
                descValueError
                  ? "text-red-500"
                  : isDescValueError
                  ? "text-green-500"
                  : "text-[#6C757D]"
              }`}
            >
              მაქსიმუმ 255 სიმბოლო
            </span>
          </div>

          {/* Employee Field */}
          <div className="flex flex-col w-[550px]">
            <label htmlFor="responsibleEmployee" className="text-[#ADB5BD] ">
              პასუხისმგებელი თანამშრომელი*
            </label>
            <select
              id="responsibleEmployee"
              className="w-[550px] py-2 dark:text-black  border border-[#DEE2E6] rounded-[5px] pl-2 mt-[6px] focus:outline-none bg-white"
              {...register("employee_id")}
            >
              {employees.map((emp) => (
                <option
                  key={emp.id}
                  value={emp.id}
                  className="text-black dark:text-black"
                >
                  {emp.name} {emp.surname}
                </option>
              ))}
            </select>
          </div>

          {/* Priority and Status Fields */}
          <div className="flex flex-row col-span-2 space-x-4 mt-[61px]">
            <div className="flex flex-col w-[259px]">
              <label htmlFor="priority">პრიორიტეტი*</label>
              <select
                id="priority"
                className="w-full dark:text-black py-2 border border-[#DEE2E6] rounded-[5px] pl-2 mt-[6px] focus:outline-none bg-white"
                {...register("priority_id")}
              >
                {priorities.map((priority) => (
                  <option key={priority.id} value={priority.id}>
                    {priority.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-[259px]">
              <label htmlFor="status">სტატუსი*</label>
              <select
                id="status"
                className="w-full dark:text-black py-2 border border-[#DEE2E6] rounded-[5px] pl-2 mt-[6px] focus:outline-none bg-white"
                {...register("status_id")}
              >
                {statuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Deadline Field */}
          <div className="mt-[61px] flex flex-col gap-2">
            <label>დედლაინი</label>
            <input
              type="date"
              className={`mt-1 w-[318px] rounded-[5px] border dark:text-black p-2 ${
                errors.due_date ? "border-red-500" : "border-gray-300"
              }`}
              {...register("due_date")}
            />
            {errors.due_date && (
              <span className="text-[11px] text-red-500">
                {errors.due_date.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-[100px] col-span-4 flex items-end justify-end mr-[208px]">
            <button
              type="submit"
              onSubmit={handleSubmit(onSubmit)}
              className="w-[208px] py-2 border rounded-[5px] bg-[#8338EC] text-white mt-4"
            >
              დავალების შექმნა
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
