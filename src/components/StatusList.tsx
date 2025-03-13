import { useEffect, useState } from "react";
import { Status } from "../types/Types";
import axiosInstance from "../utils/axiosInstance";

const StatusList = () => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await axiosInstance.get("/statuses");
        setStatuses(response.data);
      } catch (error: any) {
        setError("Error Fetching Statuses");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatuses();
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
          </div>
        );
      })}
    </div>
  );
};

export default StatusList;
