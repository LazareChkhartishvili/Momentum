import { useEffect, useState } from "react";
import { Status, Task } from "../types/Types";
import axiosInstance from "../utils/axiosInstance";

const StatusList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusesResponse, tasksResponse] = await Promise.all([
          axiosInstance.get("/statuses"),
          axiosInstance.get("/tasks"),
        ]);
        setStatuses(statusesResponse.data);
        setTasks(tasksResponse.data);
      } catch (error: any) {
        setError("Error Fetching Data");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="mt-[72px] grid gap-[52px] grid-cols-4 w-full">
      {statuses.map((status) => {
        const filteredTasks = tasks.filter(
          (task) => task.status.name === status.name
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
            <div className="mt-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-4 rounded-lg shadow-md mt-2"
                >
                  <h3 className="font-semibold">{task.name}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <p className="text-sm text-gray-500">
                    Due: {new Date(task.due_date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatusList;
