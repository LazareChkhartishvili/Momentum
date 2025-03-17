import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Task } from "../types/Types";
import axiosInstance from "../utils/axiosInstance";
import statusIcon from "../assets/images/statusIcon.svg";
import userIcon from "../assets/images/userIcon.svg";
import calendarIcon from "../assets/images/calendar.svg";

const SingleTask = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("ka-GE", {
      weekday: "short",
    })} - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

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
    <div className="flex flex-row justify-between items-start">
      <div className="flex flex-col ">
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
          <h1 className="font-semibold text-[34px] text-darkGray dark:text-white">
            {task.name}
          </h1>
          <p className="text-[18px] text-black leading-[150%] dark:text-white">
            {task.description}
          </p>
        </div>
        <div className="mt-[73px] mb-[28px]">
          <h2 className="font-medium text-2xl text-[#2A2A2A] dark:text-slate-400">
            დავალების დეტალები
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-row items-center justify-between max-w-[493px]">
            <div className="flex items-center gap-3">
              <img src={statusIcon} alt="statusIcon" />
              <h4>სტატუსი</h4>
            </div>
            <div>{task.status.name}</div>
          </div>
          <div className="flex flex-row items-center justify-between max-w-[493px] ">
            <div className="flex items-center gap-3">
              <img src={userIcon} alt="userIcon" />
              <h4>თანამშრომელი</h4>
            </div>
            <div className="flex flex-row gap-1">
              <img
                className="w-8 h-8 rounded-full"
                src={
                  "https://static.vecteezy.com/system/resources/previews/014/194/216/non_2x/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg"
                }
                alt={task.employee.name}
              />
              <div>
                <h5 className="text-[#474747] text-[11px] font-light">
                  {(() => {
                    switch (task.department.name) {
                      case "ადამიანური რესურსების დეპარტამენტი":
                        return (
                          <span className="dark:text-white">
                            HR დეპარტამენტი
                          </span>
                        );
                      case "ლოჯოსტიკის დეპარტამენტი":
                        return (
                          <span className="dark:text-white">
                            ლოჯისტიკის დეპარტამენტი
                          </span>
                        );
                      case "ლოჯისტიკა":
                        return <span>Logistics</span>;
                      default:
                        return "";
                    }
                  })()}
                </h5>
                <h3 className="text-[14px] font-semibold text-darkGray dark:text-slate-400 leading-[150%]">
                  {task.employee.name}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between max-w-[493px] gap-10">
            <div className="flex items-center gap-3">
              <img src={calendarIcon} alt="CalendarIcon" />
              <h4>დავალების ვადა</h4>
            </div>
            <div>{formatDate(task.due_date)}</div>
          </div>
        </div>
      </div>
      {/* Comments Section */}
      <div className="w-[741px] h-[400px] bg-[#F8F3FE] rounded-[10px]">
        <div className="pt-10 px-[45px] pb-[52px] relative">
          <textarea
            className="w-[651px] min-h-[135px] border border-[#898989] pt-6 pl-5 rounded-[10px] focus:outline-none"
            placeholder="დაწერეთ კომენტარი"
          ></textarea>
          <button className="absolute bottom-16 right-20 text-white bg-purple py-2 px-[18px] rounded-[20px]">
            დააკომენტარე
          </button>
        </div>
        <div className="px-[45px]">
          <h2 className="font-medium text-[20px] text-black">კომენტარები</h2>
        </div>
      </div>
    </div>
  );
};

export default SingleTask;
