"use client";
import Loader from "@/components/shared/Loader";
import { ITask } from "@/lib/database/models/task.model";
import useStore from "@/stores/main-store";
import { FetchAllTask, SetUserProfile } from "@/utils";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const DashboardPage = (props: Props) => {
  const router = useRouter();
  const { tasks, setTasks, user, setUser } = useStore();
  const [loading, setloading] = useState<boolean>(false);
  const [view, setview] = useState<boolean>(false);
  const [currentTask, setcurrentTask] = useState<ITask | null>(null);

  // handlid task submission
  const handletaskSubmit = (item: ITask) => {
    if (user?._id!.toString() === item?.moderator._id.toString()) {
      return router.push(`/dashboard/tasks/submit/${item._id}`);
    }
    return toast.error("You cannot submit another moderator task.");
  };

  useEffect(() => {
    setloading(true);
    FetchAllTask((params) => {
      setloading(false);
      if (!tasks?.length) {
        return setTasks(params);
      }
    });

    SetUserProfile((params) => {
      return setUser(params);
    });
    const u = localStorage.getItem("user");
    if (u === null) {
      router.push("/sign-in");
    }
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col my-8 text-white gap-2">
      {view && (
        <>
          <div className="bg-dark-surface/60 top-0 left-0 right-0 flex  backdrop-blur-sm text-white h-full z-10 absolute p-12 items-center justify-center flex-col">
            {/* close button  */}

            <X
              className="absolute right-8 top-8 cursor-pointer"
              onClick={() => setview(false)}
              size={55}
            />
            {/* inner section  */}
            <div className="bg-dark-surface/60 shadow-lg shadow-black p-4 text-white font-medium rounded-md">
              <span className="text-2xl hover:border-b-2 cursor-pointer">
                Edited By {currentTask?.moderator.first_name}
              </span>

              {/* details  */}

              <div className="flex xl:min-w-[900px] border-b-[1px] border-b-gray-400 pb-4 my-2 text-xl gap-3 flex-col items-start">
                <span>Task Id: {currentTask._id}</span>
                <span>
                  Task Craetion Date: {currentTask?.createdAt.split("T")[0]}
                </span>
                <span>Task Prompt: {currentTask?.prompt}</span>
                <span>Task Created By: {currentTask?.user.first_name}</span>

                {currentTask?.editing_type && (
                  <span>Task Editing Type: {currentTask?.editing_type}</span>
                )}
              </div>

              {/* videos  */}
              <span className="text-2xl mx-auto w-fit self-center font-medium my-4">
                Video Details
              </span>
              <div className="flex my-4 xl:flex-row flex-col ">
                {/* previous video  */}
                <div className="lg:w-1/2 w-full border min-h-[280px] overflow-hidden rounded-md">
                  <video
                    src={currentTask?.rawVideo}
                    controls
                    className="max-w-fit max-h-[250px]"
                  ></video>
                </div>

                {/* edited video  */}
                <div className="lg:w-1/2 w-full border min-h-[280px] overflow-hidden rounded-md">
                  <video
                    src={currentTask?.finalVideo}
                    controls
                    className="max-w-full max-h-[250px]"
                  ></video>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* queued tasks  */}
      <div className="bg-dark-surface flex flex-col gap-2 rounded-md shadow-lg p-4">
        <span className="text-white text-2xl font-semibold">
          All Queued Tasks
        </span>

        {tasks &&
          tasks
            .filter((t: ITask) => t.status === "queued")
            .map((item: ITask) => (
              <div
                key={item.rawVideo}
                className="bg-dark-bg text-white flex-row justify-between rounded-md p-2 flex "
              >
                {/* id section  */}
                <div className="flex flex-col items-start">
                  <span>Task ID:</span>
                  <span>{String(item._id).substring(0, 8)}...</span>
                </div>

                {/* creation  section  */}
                <div className="flex flex-col items-start">
                  <span>Creation Date:</span>
                  <span>{String(item.createdAt).split("T")[0]}</span>
                </div>

                {/* user   section  */}
                <div className="flex flex-col items-start">
                  <span>User Name:</span>
                  <span>{item?.user?.first_name}</span>
                </div>

                {/* creation  section  */}
                <div className="flex flex-col items-start justify-start">
                  <span>Action:</span>
                  <Link
                    className="text-blue-500 font-medium cursor-pointer bg-white rounded-full px-3 "
                    href={`/dashboard/tasks/${item._id}`}
                  >
                    Process
                  </Link>
                </div>
              </div>
            ))}
      </div>
      {/* processing tasks  */}
      <div className="bg-dark-surface flex flex-col gap-2 rounded-md shadow-lg p-4">
        <span className="text-white text-2xl font-semibold">
          All Processing Tasks
        </span>
        {tasks &&
          tasks
            .filter((t: ITask) => t.status === "processing")
            .map((item: ITask) => (
              <div
                key={item.rawVideo}
                className="bg-dark-bg text-white flex-row justify-between rounded-md p-2 flex "
              >
                {/* id section  */}
                <div className="flex flex-col items-start">
                  <span className="line-clamp-1 text-sm">Task ID:</span>
                  <span>{String(item?._id).substring(0, 8)}...</span>
                </div>

                {/* creation  section  */}
                <div className="flex flex-col items-start">
                  <span className="line-clamp-1 text-sm">Creation Date:</span>
                  <span>{String(item?.createdAt).split("T")[0]}</span>
                </div>

                {/* user   section  */}
                <div className="flex flex-col items-start">
                  <span className="line-clamp-1 text-sm">Moderator Name:</span>
                  <span className="line-clamp-1 text-sm">
                    {item.moderator.first_name}
                  </span>
                </div>

                {/* Submission  section  */}
                <div className="flex  flex-col items-center  justify-center">
                  <span className="line-clamp-1 text-sm">Action:</span>
                  <button
                    className={`text-white font-medium text-sm cursor-pointer bg-green-500 rounded-full px-3 py-1 `}
                    onClick={() => handletaskSubmit(item)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ))}
      </div>
      {/* completed tasks  */}
      <div className="bg-dark-surface flex flex-col gap-2 rounded-md shadow-lg p-4">
        <span className="text-white text-2xl font-semibold">
          All Completed Tasks
        </span>

        {tasks &&
          tasks
            .filter((t: ITask) => t.status === "completed")
            .map((item: ITask) => (
              <div
                key={item!._id as any}
                className="bg-dark-bg text-white flex-row justify-between rounded-md p-2 flex "
              >
                {/* id section  */}
                <div className="flex flex-col items-start">
                  <span>Task ID:</span>
                  <span>{item?._id.substring(0, 8)}...</span>
                </div>

                {/* creation  section  */}
                <div className="flex flex-col items-start">
                  <span>Creation Date:</span>
                  <span>{item.createdAt.split("T")[0]}</span>
                </div>

                {/* user   section  */}
                <div className="flex flex-col items-start">
                  <span>User Name:</span>
                  <span>{item.user.first_name}</span>
                </div>

                {/* creation  section  */}
                <div className="flex flex-col items-start justify-start">
                  <span>View:</span>
                  <button
                    onClick={() => {
                      setcurrentTask(item);
                      setview((prev) => !prev);
                    }}
                    className="text-white font-medium cursor-pointer bg-green-500 rounded-full px-3 "
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default DashboardPage;
