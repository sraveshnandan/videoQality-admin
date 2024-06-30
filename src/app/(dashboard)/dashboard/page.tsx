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
    if (item.moderator?.first_name === user?.first_name) {
      return router.push(`/dashboard/tasks/submit/${item._id}`);
    }
    return toast.error("You cannot submit another moderator task.");
  };

  useEffect(() => {
    if (!tasks?.length) {
      setloading(true);
      FetchAllTask((params) => {
        setloading(false);
        if (!tasks?.length) {
          return setTasks(params);
        }
      });
    }

    if (!user?.first_name) {
      SetUserProfile((params) => {
        return setUser(params);
      });
    }
    const u = localStorage.getItem("user");
    if (u === null) {
      router.push("/sign-in");
    }

    return () => {};
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      {view && (
        <>
          <div className="bg-dark-surface/60 top-0 left-0 bottom-0 right-0 flex  backdrop-blur-sm text-white  z-10 absolute xl:p-12 p-4 items-center justify-center flex-col">
            {/* close button  */}

            <X
              className="absolute lg:right-8 lg:top-8 top-2 right-2 text-red-600 ring-white ring-2 rounded-full cursor-pointer"
              onClick={() => setview(false)}
              size={28}
            />
            {/* inner section  */}
            <div className="bg-dark-surface/60 shadow-lg shadow-black p-4 text-white font-medium w-full rounded-md xl:w-[70%]">
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
              <span className="text-2xl gap-4 mx-auto w-fit self-center font-medium my-4">
                Video Details
              </span>
              <div className="flex my-4 lg:flex-row gap-4 flex-col ">
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

      <div className="flex flex-col my-8 text-white gap-2">
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
                  className="bg-dark-bg text-white lg:flex-row flex-col justify-between rounded-md p-2 flex gap-4 "
                >
                  {/* id section  */}
                  <div className="flex lg:flex-col flex-row items-start">
                    <span>Task ID:</span>
                    <span>{String(item._id).substring(0, 8)}...</span>
                  </div>

                  {/* creation  section  */}
                  <div className="flex lg:flex-col flex-row gap-4 items-start">
                    <span>Creation Date:</span>
                    <span>{String(item.createdAt).split("T")[0]}</span>
                  </div>

                  {/* user   section  */}
                  <div className="flex lg:flex-col flex-row gap-4 items-start">
                    <span>User Name:</span>
                    <span>{item?.user?.first_name}</span>
                  </div>

                  {/* creation  section  */}
                  <div className="flex lg:flex-col flex-row gap-4 items-start justify-start">
                    <span>Action:</span>
                    <Link
                      className="text-blue-500 w-fit  font-medium cursor-pointer bg-white rounded-full px-3 "
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
                  className="bg-dark-bg text-white lg:flex-row flex-col justify-between rounded-md p-2 flex gap-4 lg:gap-0 "
                >
                  {/* id section  */}
                  <div className="flex lg:flex-col flex-row items-start">
                    <span className="line-clamp-1 text-sm">Task ID:</span>
                    <span>{String(item?._id).substring(0, 8)}...</span>
                  </div>

                  {/* creation  section  */}
                  <div className="flex lg:flex-col flex-row items-start">
                    <span className="line-clamp-1 text-sm">Creation Date:</span>
                    <span>{String(item?.createdAt).split("T")[0]}</span>
                  </div>

                  {/* user   section  */}
                  <div className="flex lg:flex-col flex-row items-start">
                    <span className="line-clamp-1 text-sm">
                      Moderator Name:
                    </span>
                    <span className="line-clamp-1 text-sm">
                      {item.moderator.first_name}
                    </span>
                  </div>

                  {/* Submission  section  */}
                  <div className="flex  lg:flex-col flex-row items-center  gap-4">
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
        <div className="bg-dark-surface flex flex-col  gap-2 rounded-md shadow-lg p-4">
          <span className="text-white text-2xl font-semibold">
            All Completed Tasks
          </span>

          {tasks &&
            tasks
              .filter((t: ITask) => t.status === "completed")
              .map((item: ITask) => (
                <div
                  key={item!._id as any}
                  className="bg-dark-bg text-white lg:flex-row flex-col gap-4 justify-between rounded-md p-2 flex "
                >
                  {/* id section  */}
                  <div className="flex lg:flex-col flex-row gap-4 items-start">
                    <span>Task ID:</span>
                    <span>{item?._id.substring(0, 8)}...</span>
                  </div>

                  {/* creation  section  */}
                  <div className="flex lg:flex-col flex-row gap-4 items-start">
                    <span>Creation Date:</span>
                    <span>{item.createdAt.split("T")[0]}</span>
                  </div>

                  {/* user   section  */}
                  <div className="flex lg:flex-col flex-row gap-4 items-start">
                    <span>User Name:</span>
                    <span>
                      {item.user.first_name} {item.user.last_name}
                    </span>
                  </div>

                  {/* user   section  */}
                  <div className="flex lg:flex-col lg:hidden flex-row gap-4 items-start">
                    <span>Moderator Name:</span>
                    <span>
                      {item.moderator.first_name} {item.moderator.last_name}
                    </span>
                  </div>

                  {/* creation  section  */}
                  <div className="flex lg:flex-col flex-row gap-4 items-start justify-start">
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
    </>
  );
};

export default DashboardPage;
