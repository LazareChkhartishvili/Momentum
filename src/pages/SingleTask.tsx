import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Task } from "../types/Types";
import axiosInstance from "../utils/axiosInstance";

const SingleTask = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosInstance.get(`/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        setError("დავალებების ჩატვირთვა ვერ მოხერხდა, უკაცრავად...");
        console.error("Error fetchingg.", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchTask();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!task) return <div>დავალება ვერ მოიძებნა კაროჩე</div>;

  return (
    <div>
      <div className="flex flex-row items-center gap-[18px]">
        <div
          className={`border flex items-center gap-1 py-1 px-2 font-medium rounded-md w-[110px] ${
            task.priority.name === "დაბალი"
              ? "border-[#08A508]"
              : task.priority.name === "საშუალო"
              ? "border-[#FFA500] text-[#FFA500]"
              : task.priority.name === "მაღალი"
              ? "border-[#FF0000]"
              : "border-gray-300"
          }`}
        >
          <img src={task.priority.icon} alt={task.priority.name} />
          <span>{task.priority.name}</span>
        </div>
        <div>
          {(() => {
            switch (task.department.name) {
              case "ადამიანური რესურსების დეპარტამენტი":
                return (
                  <span className="bg-[#4075ca] text-white rounded-[15px] px-[9px] py-[5px]">
                    HR
                  </span>
                );
              case "ლოჯოსტიკის დეპარტამენტი":
                return (
                  <span className=" bg-[#89B6FF] text-white rounded-[15px] px-[9px] py-[5px]">
                    ლოჯისტიკა
                  </span>
                );
              case "ლოჯისტიკა":
                return <span>Logistics</span>;
              default:
                return "";
            }
          })()}
        </div>
      </div>
      <div className="mt-3 gap-[36px] flex flex-col">
        <h1 className="font-semibold text-[34px] text-darkGray">{task.name}</h1>
        <p className="text-[18px] text-black leading-[150%]">
          {task.description}
        </p>
      </div>
      <div className="mt-[73px] mb-[28px]">
        <h2 className="font-medium text-2xl text-[#2A2A2A]">
          დავალების დეტალები
        </h2>
      </div>
      <div>
        <div>asdahjsd</div>
      </div>
    </div>
  );
};

export default SingleTask;
