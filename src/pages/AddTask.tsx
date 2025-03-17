import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

interface Department {
  id: number;
  name: string;
}

interface Status {
  id: number;
  name: string;
}

interface Priority {
  id: number;
  name: string;
}

interface Employee {
  id: number;
  fullName: string;
}

const AddTask = () => {
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
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-darkGray font-semibold text-[34px] mb-[25px]">
        შექმენი ახალი დავალება
      </h2>
      <div className="bg-[#FBF9FF] pt-[71px] px-[51px] pb-[70px]">
        <form className="grid grid-cols-4 grid-rows-2 h-[550px]">
          <div className="flex flex-col col-span-2">
            <label>სათაური*</label>
            <input
              className="w-[550px] py-2 border border-[#DEE2E6] rounded-[5px] pl-2 mt-[6px] focus:outline-none"
              type="text"
              placeholder="შეიყვანეთ სათაური"
            />
          </div>
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
          <div className="flex flex-col col-span-2">
            <label>აღწერა</label>
            <textarea className="w-[550px] h-[150px] border border-[#DEE2E6] rounded-[5px] pl-2 mt-[6px] focus:outline-none"></textarea>
          </div>
          <div className="flex flex-col w-[550px]">
            <label htmlFor="responsibleEmployee" className="text-[#ADB5BD] ">
              პასუხისმგებელი თანამშრომელი*
            </label>
            <select
              id="responsibleEmployee"
              className="w-[550px] py-2 border border-[#DEE2E6] rounded-[5px] pl-2 mt-[6px] focus:outline-none bg-white"
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.fullName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row col-span-2 space-x-4 mt-[61px]">
            <div className="flex flex-col w-[259px]">
              <label htmlFor="priority">პრიორიტეტი*</label>
              <select
                id="priority"
                className="w-full py-2 border border-[#DEE2E6] rounded-[5px] pl-2 mt-[6px] focus:outline-none bg-white"
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
                className="w-full py-2 border border-[#DEE2E6] rounded-[5px] pl-2 mt-[6px] focus:outline-none bg-white"
              >
                {statuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-[61px]">
            <label>დედლაინი</label>
            <input
              type="date"
              className="w-[318px] border-2 border-gray-300 p-2"
            />
          </div>
          <div className="mt-[100px] col-span-4 flex items-end justify-end mr-[208px]">
            <button className="w-[208px] py-2 border border-[#DEE2E6] rounded-[5px] bg-[#8338EC] text-white mt-4">
              დავალების შექმნა
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
