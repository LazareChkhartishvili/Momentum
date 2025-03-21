import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Task, Comment } from "../types/Types";
import axiosInstance from "../utils/axiosInstance";
import statusIcon from "../assets/images/statusIcon.svg";
import userIcon from "../assets/images/userIcon.svg";
import calendarIcon from "../assets/images/calendar.svg";

const SingleTask = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [statuses, setStatuses] = useState<any[]>([]);
  const [, setSelectedStatus] = useState<string>("");

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
        console.log("TASKEBI", response.data);
        setTask(response.data);
        console.log(response.data.status_id);
      } catch (error) {
        setError("დავალებების ჩატვირთვა ვერ მოხერხდა, უკაცრავად...");
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      if (id) {
        try {
          const response = await axiosInstance.get(`/tasks/${id}/comments`);
          setComments(response.data);
        } catch (error) {
          console.error("Error fetching comments", error);
        }
      }
    };

    const fetchStatuses = async () => {
      try {
        const response = await axiosInstance.get("/statuses");
        console.log(response.data);
        setStatuses(response.data);
      } catch (error) {
        console.error("Error fetching statuses", error);
      }
    };

    fetchTask();
    fetchComments();
    fetchStatuses();
  }, [id]);

  const handlePostComment = async () => {
    if (!commentText.trim()) {
      alert("გთხოვთ, შეიყვანოთ კომენტარი");
      return;
    }

    const newComment = {
      text: commentText,
      parent_id: null,
    };

    try {
      const response = await axiosInstance.post(
        `/tasks/${id}/comments`,
        newComment
      );
      setCommentText("");
      setComments([response.data, ...comments]);
    } catch (error) {
      console.error("Error posting comment", error);
      alert("კომენტარის გამოგზავნა ვერ მოხერხდა");
    }
  };

  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatusId = Number(event.target.value);

    if (task) {
      try {
        const updatedTask = {
          ...task,
          status:
            statuses.find((status) => status.id === newStatusId) || task.status,
        };

        const response = await axiosInstance.put(
          `/tasks/${task.id}`,
          { status_id: newStatusId },
          {
            headers: {
              Authorization: `Bearer 9e6cb393-4dcc-40ae-bae5-6376c42411e6`,
            },
          }
        );

        console.log("Task status updated:", response.data);

        setTask(updatedTask);

        setSelectedStatus(newStatusId.toString());
      } catch (error: any) {
        console.error(
          "Error updating task status:",
          error.response?.data || error.message
        );
        alert("Error updating task status");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!task) return <div>დავალება ვერ მოიძებნა კაროჩე</div>;

  return (
    <div className="flex flex-row justify-between items-start">
      <div className="flex flex-col  w-[600px]">
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
        <div className="flex flex-col gap-6 ">
          <div className="flex flex-row items-center justify-between max-w-[493px]">
            <div className="flex items-center gap-3">
              <img src={statusIcon} alt="statusIcon" />
              <h4>სტატუსი</h4>
            </div>
            <select
              value={task.status.id}
              onChange={handleStatusChange}
              className="border border-gray-300 p-2 rounded-md dark:text-black"
            >
              {statuses.map((status) => (
                <option
                  className="dark:text-black"
                  key={status.id}
                  value={status.id}
                >
                  {status.name}
                </option>
              ))}
            </select>
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
      <div className="w-[741px] min-h-[400px] pb-20 bg-[#F8F3FE] dark:bg-gray-700 rounded-[10px]">
        <div className="pt-10 px-[45px] pb-[52px] relative">
          <textarea
            className="w-[651px] min-h-[135px] border dark:text-black border-[#898989] pt-6 pl-5 rounded-[10px] focus:outline-none"
            placeholder="დაწერეთ კომენტარი"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <button
            className="absolute bottom-16 right-20 text-white bg-purple py-2 px-[18px] rounded-[20px]"
            onClick={handlePostComment}
          >
            დააკომენტარე
          </button>
        </div>
        <div className="px-[45px]">
          <h2 className="font-medium text-[20px] dark:text-white text-black">
            კომენტარები{" "}
            <span className="bg-purple px-[15px] text-[15px] text-white py-[4px] rounded-full">
              {comments.length}
            </span>
          </h2>
          <div className="space-y-8 mt-5">
            {comments.map((comment) => (
              <div key={comment.id}>
                <div className="flex rounded-lg shadow-sm">
                  <img
                    src={comment.author_avatar}
                    alt={comment.author_nickname}
                    className="w-[38px] h-[38px] rounded-full mr-3"
                  />
                  <div>
                    <p className="text-darkGray dark:text-white text-lg font-medium">
                      {comment.author_nickname}
                    </p>
                    <p className="text-darkGray dark:text-gray-400">
                      {comment.text}
                    </p>
                  </div>
                </div>
                {/* <span>უპასუხე</span> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTask;
