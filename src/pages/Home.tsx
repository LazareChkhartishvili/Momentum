import { useState } from "react";
import MainFilter from "../components/MainFilter";
import StatusList from "../components/StatusList";
import { Department, Priority, Employee } from "../types/Types";

const HomePage = () => {
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(
    null
  );
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  return (
    <div>
      <h1 className="text-darkGray dark:text-white font-semibold text-[32px]">
        დავალებების გვერდი
      </h1>
      <MainFilter
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
      />
      <StatusList
        selectedDepartment={selectedDepartment}
        selectedPriority={selectedPriority}
        selectedEmployee={selectedEmployee}
      />
    </div>
  );
};

export default HomePage;
