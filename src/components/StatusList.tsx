import { useEffect, useState } from "react";
import { Status, Task, Department, Priority, Employee } from "../types/Types";
import axiosInstance from "../utils/axiosInstance";
import { FaCommentAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";

interface StatusListProps {
  selectedDepartment: Department | null;
  selectedPriority: Priority | null;
  selectedEmployee: Employee | null;
}

const StatusList: React.FC<StatusListProps> = ({
  selectedDepartment,
  selectedPriority,
  selectedEmployee,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusesResponse, tasksResponse] = await Promise.all([
          axiosInstance.get<Status[]>("/statuses"),
          axiosInstance.get<Task[]>("/tasks"),
        ]);
        setStatuses(statusesResponse.data);
        setTasks(tasksResponse.data);
      } catch (error) {
        setError("Error Fetching Data");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterTasks = (tasks: Task[]) => {
    return tasks.filter((task) => {
      const matchesDepartment = selectedDepartment
        ? task.department.id === selectedDepartment.id
        : true;
      const matchesPriority = selectedPriority
        ? task.priority.id === selectedPriority.id
        : true;
      const matchesEmployee = selectedEmployee
        ? task.employee.id === selectedEmployee.id
        : true;
      return matchesDepartment && matchesPriority && matchesEmployee;
    });
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="mt-[72px] grid gap-[52px] grid-cols-4 w-full pb-40">
      {statuses.map((status) => {
        const filteredTasks = filterTasks(
          tasks.filter((task) => task.status.name === status.name)
        );

        return (
          <div key={status.id} className="w-[381px] text-center">
            <h2
              className={`${status.name === "დასაწყები" && "bg-[#F7BC30]"} ${
                status.name === "პროგრესში" && "bg-[#FB5607]"
              } ${status.name === "მზად ტესტირებისთვის" && "bg-[#FF006E]"} ${
                status.name === "დასრულებული" && "bg-[#3A86FF]"
              } font-medium text-white rounded-[10px] py-[15px] text-[20px]`}
            >
              {status.name}
            </h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 20 }}
              transition={{ duration: 1 }}
            >
              <div className="mt-4">
                {filteredTasks.map((task) => (
                  <Link key={task.id} to={`/task/${task.id.toString()}`}>
                    <div
                      className={`${
                        task.status.name === "დასაწყები"
                          ? "border-[#F7BC30]"
                          : task.status.name === "პროგრესში"
                          ? "border-[#FB5607]"
                          : task.status.name === "მზად ტესტირებისთვის"
                          ? "border-[#FF006E]"
                          : "border-[#3A86FF]"
                      } pt-[21px] px-5 pb-5 rounded-lg shadow-md mt-2 border-2  duration-700 cursor-pointer`}
                    >
                      <div className="flex flex-row items-center justify-between">
                        <div
                          className={`flex items-center flex-row py-1 px-2 rounded-md w-[110px] gap-1 border ${
                            task.priority.name === "დაბალი"
                              ? "border-[#08A508]"
                              : task.priority.name === "საშუალო"
                              ? "border-[#FFA500]"
                              : task.priority.name === "მაღალი"
                              ? "border-[#FF0000]"
                              : "border-gray-300"
                          }`}
                        >
                          <img
                            src={task.priority.icon}
                            alt={task.priority.name}
                          />
                          <span
                            className={`${
                              task.priority.name === "დაბალი" &&
                              "text-[#08A508]"
                            }`}
                          >
                            {task.priority.name}
                          </span>
                          {(() => {
                            switch (task.department.name) {
                              case "ადამიანური რესურსების დეპარტამენტი":
                                return (
                                  <span className="ml-8 bg-[#4075ca] text-white rounded-[15px] px-[9px] py-[5px]">
                                    HR
                                  </span>
                                );
                              case "ლოჯოსტიკის დეპარტამენტი":
                                return (
                                  <span className="ml-8 bg-[#89B6FF] text-white rounded-[15px] px-[9px] py-[5px]">
                                    ლოჯისტიკა
                                  </span>
                                );
                              case "ადმინისტრაციის დეპარტამენტი":
                                return (
                                  <span className="ml-8 bg-[#4075ca] text-white rounded-[15px] px-[9px] py-[5px]">
                                    ადმ.დეპ
                                  </span>
                                );
                              case "ფინანსების დეპარტამენტი":
                                return (
                                  <span className="ml-8 bg-[#4075ca] text-white rounded-[15px] px-[9px] py-[5px]">
                                    მარკეტინგი
                                  </span>
                                );
                              case "გაყიდვები და მარკეტინგის დეპარტამენტი":
                                return (
                                  <span className="ml-8 bg-[#4075ca] text-white rounded-[15px] px-[9px] py-[5px]">
                                    მარკეტინგი
                                  </span>
                                );
                              case "ტექნოლოგიების დეპარტამენტი":
                                return (
                                  <span className="ml-8 bg-[#4075ca] text-white rounded-[15px] px-[10px] py-[5px]">
                                    ტექნოლოგიების დეპარტამენტი
                                  </span>
                                );
                              case "მედიის დეპარტამენტი":
                                return (
                                  <span className="ml-8 bg-[#4075ca] text-white rounded-[15px] px-[10px] py-[5px]">
                                    მედია
                                  </span>
                                );
                              default:
                                return "";
                            }
                          })()}
                        </div>

                        <p className="text-sm text-gray-500">
                          {new Date(task.due_date).toLocaleDateString()}
                        </p>
                      </div>
                      <h3 className="font-bold mt-7 text-start text-darkGray dark:text-white">
                        {task.name}
                      </h3>
                      <p className="text-sm text-[#343A40] dark:text-white text-start mb-7">
                        {task.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm">
                          <img
                            src={
                              "https://static.vecteezy.com/system/resources/previews/014/194/216/non_2x/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg"
                            }
                            alt={task.employee.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <h4>{task.employee.name}</h4>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <FaCommentAlt />
                          <span>{task.total_comments}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default StatusList;
