import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import { IoCheckbox } from "react-icons/io5";
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import { Department, Priority, Employee } from "../types/Types";
import { motion } from "framer-motion";

interface MainFilterProps {
  selectedDepartment: Department | null;
  setSelectedDepartment: (department: Department | null) => void;
  selectedPriority: Priority | null;
  setSelectedPriority: (priority: Priority | null) => void;
  selectedEmployee: Employee | null;
  setSelectedEmployee: (employee: Employee | null) => void;
}

const MainFilter: React.FC<MainFilterProps> = ({
  selectedDepartment,
  setSelectedDepartment,
  selectedPriority,
  setSelectedPriority,
  selectedEmployee,
  setSelectedEmployee,
}) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [dropDepartments, setDropDepartments] = useState<boolean>(false);
  const [dropPriorities, setDropPriorities] = useState<boolean>(false);
  const [dropEmployers, setDropEmployers] = useState<boolean>(false);
  const [loadingDepartments, setLoadingDepartments] = useState<boolean>(true);
  const [loadingPriorities, setLoadingPriorities] = useState<boolean>(true);
  const [loadingEmployees, setLoadingEmployees] = useState<boolean>(true);
  const [errorDepartments, setErrorDepartments] = useState<string | null>(null);
  const [errorPriorities, setErrorPriorities] = useState<string | null>(null);
  const [errorEmployees, setErrorEmployees] = useState<string | null>(null);

  const fetchDepartments = async () => {
    try {
      const response = await axiosInstance.get<Department[]>("/departments");
      setDepartments(response.data);
    } catch (error) {
      setErrorDepartments("დეპარტამენტი ვერ ჩაიტვირთა");
    } finally {
      setLoadingDepartments(false);
    }
  };

  const fetchPriorities = async () => {
    try {
      const response = await axiosInstance.get<Priority[]>("/priorities");
      setPriorities(response.data);
    } catch (error) {
      setErrorPriorities("პრიორიტეტები ვერ ჩაიტვირთა");
    } finally {
      setLoadingPriorities(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axiosInstance.get<Employee[]>("/employees");
      setEmployees(response.data);
    } catch (error) {
      setErrorEmployees("თანამშრომლები ვერ ჩაიტვირთა");
    } finally {
      setLoadingEmployees(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchPriorities();
    fetchEmployees();
  }, []);

  const toggleDepartmentDropdown = () => {
    setDropDepartments(!dropDepartments);
    setDropPriorities(false);
    setDropEmployers(false);
  };

  const togglePriorityDropdown = () => {
    setDropPriorities(!dropPriorities);
    setDropDepartments(false);
    setDropEmployers(false);
  };

  const toggleEmployerDropdown = () => {
    setDropEmployers(!dropEmployers);
    setDropDepartments(false);
    setDropPriorities(false);
  };

  const handleDepartmentSelect = (department: Department) => {
    setSelectedDepartment(department);
    setDropDepartments(false);
  };

  const handlePrioritySelect = (priority: Priority) => {
    setSelectedPriority(priority);
    setDropPriorities(false);
  };

  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDropEmployers(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="mt-[52px] w-[688px] border border-[#DEE2E6] rounded-[10px] flex items-center justify-between py-3">
        <div className="relative">
          <button
            onClick={toggleDepartmentDropdown}
            className="px-[18px] flex items-center gap-1 dark:text-white text-darkGray"
          >
            {selectedDepartment ? selectedDepartment.name : "დეპარტამენტი"}{" "}
            {dropDepartments ? <FaArrowUp /> : <FaArrowDown />}
          </button>
          {dropDepartments && (
            <div className="absolute pt-10 pl-[30px] pb-[25px] gap-y-[22px] flex flex-col top-10 left-0 z-10 bg-white dark:text-black dark:bg-slate-700 border-purple border rounded-[10px] w-[688px] h-[274px] overflow-auto">
              {departments.map((department) => (
                <div key={department.id} className="">
                  <button
                    className="flex gap-2 items-center"
                    onClick={() => handleDepartmentSelect(department)}
                  >
                    <IoCheckbox />
                    <span>{department.name}</span>
                  </button>
                </div>
              ))}
              <button className="items-end text-end flex mx-auto justify-end mr-[30px] py-2 px-[48px] bg-purple rounded-[20px] text-white w-[155px]">
                არჩევა
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={togglePriorityDropdown}
            className="flex items-center gap-1 dark:text-white text-darkGray"
          >
            {selectedPriority ? selectedPriority.name : "პრიორიტეტები"}{" "}
            {dropPriorities ? <FaArrowUp /> : <FaArrowDown />}
          </button>
          {dropPriorities && (
            <div className="absolute pt-10 pl-[30px] pb-[25px] gap-y-[22px] flex flex-col top-10 left-0 transform -translate-x-[280px] z-10 bg-white border-purple border rounded-[10px] w-[688px]">
              {priorities.map((priority) => (
                <div
                  key={priority.id}
                  className="flex flex-row items-center gap-2"
                >
                  <button
                    className="flex gap-2 items-center"
                    onClick={() => handlePrioritySelect(priority)}
                  >
                    <IoCheckbox />
                    <span>{priority.name}</span>
                  </button>
                </div>
              ))}
              <button className="items-end text-end flex mx-auto justify-end mr-[30px] py-2 px-[48px] bg-purple rounded-[20px] text-white w-[155px]">
                არჩევა
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={toggleEmployerDropdown}
            className="pr-[18px] flex items-center gap-1 dark:text-white text-darkGray"
          >
            {selectedEmployee ? selectedEmployee.name : "თანამშრომელი"}{" "}
            {dropEmployers ? <FaArrowUp /> : <FaArrowDown />}
          </button>
          {dropEmployers && (
            <div className="absolute pt-10 pl-[30px] pb-[25px] gap-y-[22px] flex flex-col top-10 left-0 transform -translate-x-[280px] z-10 bg-white border-purple border rounded-[10px] w-[688px]">
              {employees.map((employee) => (
                <div
                  key={employee.id}
                  className="flex flex-row items-center gap-2"
                >
                  <button
                    className="flex gap-2 items-center"
                    onClick={() => handleEmployeeSelect(employee)}
                  >
                    <IoCheckbox />
                    <span>{employee.name}</span>
                  </button>
                </div>
              ))}
              <button className="items-end text-end flex mx-auto justify-end mr-[30px] py-2 px-[48px] bg-purple rounded-[20px] text-white w-[155px]">
                არჩევა
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MainFilter;
