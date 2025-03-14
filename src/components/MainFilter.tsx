import { FaArrowDown } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import { Department, Priority } from "../types/Types";
import { FaArrowUp } from "react-icons/fa6";
import emptyCheck from "../assets/images/emptycheck.svg";

const MainFilter = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [dropDepartments, setDropDepartments] = useState<boolean>(false);
  const [dropPriorities, setDropPriorities] = useState<boolean>(false);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState<boolean>(true);
  const [loadingPriorities, setLoadingPriorities] = useState<boolean>(true);
  const [errorDepartments, setErrorDepartments] = useState<string | null>(null);
  const [errorPriorities, setErrorPriorities] = useState<string | null>(null);

  const fetchDepartments = async () => {
    try {
      const response = await axiosInstance.get("/departments");
      console.log(
        loadingDepartments,
        loadingPriorities,
        errorDepartments,
        errorPriorities
      );
      setDepartments(response.data);
      console.log(response.data);
    } catch (error: any) {
      setErrorDepartments("დეპარტამენტი ვერ ჩაიტვირთა");
    } finally {
      setLoadingDepartments(false);
    }
  };

  const fetchPriorities = async () => {
    try {
      const response = await axiosInstance.get("/priorities");
      setPriorities(response.data);
      console.log(response.data);
    } catch (error: any) {
      setErrorPriorities("პრიორიტეტები ვერ ჩაიტვირთა");
    } finally {
      setLoadingPriorities(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchPriorities();
  }, []);

  const toggleDepartmentDropdown = () => {
    setDropDepartments(!dropDepartments);
    setDropPriorities(false);
  };

  const togglePriorityDropdown = () => {
    setDropPriorities(!dropPriorities);
    setDropDepartments(false);
  };

  return (
    <div className="mt-[52px] w-[688px] border border-[#DEE2E6] rounded-[10px] flex items-center justify-between py-3">
      <div className="relative">
        <button
          onClick={toggleDepartmentDropdown}
          className="px-[18px] flex items-center gap-1 dark:text-white text-darkGray"
        >
          დეპარტამენტი {dropDepartments ? <FaArrowUp /> : <FaArrowDown />}
        </button>
        {dropDepartments && (
          <div className="absolute pt-10 pl-[30px] pb-[25px] gap-y-[22px] flex flex-col top-10 left-0 bg-white dark:text-black dark:bg-slate-700 border-purple border rounded-[10px] w-[688px] h-[274px] overflow-auto">
            {departments.map((department) => {
              return (
                <div key={department.id} className="">
                  <button className="flex gap-2 items-center">
                    <img src={emptyCheck} alt="emptyCheckIcon" />
                    <span>{department.name}</span>
                  </button>
                </div>
              );
            })}
            <button className="items-end text-end flex mx-auto justify-end mr-[30px] py-2 px-[48px] bg-purple  rounded-[20px] text-white w-[155px]">
              არჩევა
            </button>
          </div>
        )}
      </div>
      <div className="relative">
        <button
          onClick={togglePriorityDropdown}
          className="flex items-center gap-1 dark:text-white text-darkGray "
        >
          პრიორიტეტები {dropPriorities ? <FaArrowUp /> : <FaArrowDown />}
        </button>
        {dropPriorities && (
          <div className="absolute pt-10 pl-[30px] pb-[25px] gap-y-[22px] flex flex-col top-10 left-0 transform -translate-x-[280px] z-10 bg-white border-purple border rounded-[10px] w-[688px] ">
            {priorities.map((priority) => (
              <div
                key={priority.id}
                className="flex flex-row items-center gap-2"
              >
                <input type="checkbox" />
                <span>{priority.name}</span>
              </div>
            ))}
            <button className="items-end text-end flex mx-auto justify-end mr-[30px] py-2 px-[48px] bg-purple rounded-[20px] text-white w-[155px]">
              არჩევა
            </button>
          </div>
        )}
      </div>
      <button className="pr-[18px] flex items-center gap-1 dark:text-white text-darkGray ">
        თანამშრომელი <FaArrowDown />
      </button>
    </div>
  );
};

export default MainFilter;
