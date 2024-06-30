"use client";
import Loader from "@/components/shared/Loader";
import Uploader from "@/components/shared/uploader";
import { ITask } from "@/lib/database/models/task.model";
import useStore from "@/stores/main-store";
import { FetchAllTask, SetUserProfile } from "@/utils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TaskSubmitPage = () => {
  const params = useParams();

  const router = useRouter();
  const { tasks, user, setTasks, setUser } = useStore();
  const [task, settask] = useState<ITask | null>(null);
  const [vidurl, setvidurl] = useState<string | null>(null);
  const [loading, setloading] = useState<boolean>(false);

  const handleTaskSubmit = async () => {
    setloading(true);
    if (vidurl === null) {
      return toast.error("Edited video file is required");
    }

    const formData = new FormData();
    formData.append("videourl", vidurl as any);
    formData.append("taskId", task?._id as any);

    const res = await fetch("/api/admin/video", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setloading(false);
    if (data.success) {
      toast.success(data.message);
      localStorage.removeItem("alltasks");
      FetchAllTask((params) => {
        return setTasks(params);
      });
      setTimeout(() => {
        return router.push("/dashboard");
      }, 1500);
    } else {
      toast.error(data.message);
    }
  };

  // refressing task
  useEffect(() => {
    if (!tasks?.length) {
      setloading(true);
      FetchAllTask((params) => {
        setloading(false);
        if (!tasks?.length) {
          setTasks(params);
        }
      });
    }
    // filtering current task
    const t = tasks?.find((t) => t._id!.toString() === params.id);
    settask(t as any);
  }, [tasks]);
  // refressing user
  useEffect(() => {
    if (!user?.first_name) {
      setloading(true);
      SetUserProfile((params) => {
        setloading(false);
        if (!user?._id) {
          return setUser(params);
        }
        return;
      });
    }
    return () => {};
  }, [user]);
  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col items-start justify-start gap-2 bg-dark-surface rounded-md my-8 p-8">
      <span className="text-xl text-white"> Details of {task?._id as any}</span>
      <hr />

      {/* task details  */}

      <div className="flex text-xl bg-glass rounded-md shadow-lg  p-4 text-white flex-col gap-2">
        {/* task Id  */}
        <span className="flex  text-xl font-semibold  w-fit mb-2  flex-row items-center gap-2">
          Task ID:{" "}
          <span className="text-purple-400 text-lg">{task?._id as any}</span>
        </span>
        {/* task prompt  */}
        <span className="flex text-xl font-semibold   w-fit mb-2  flex-row items-center gap-2">
          Prompt:{" "}
          <span className=" text-purple-400 text-lg line-clamp-1">
            {task?.prompt}
          </span>
          <span className="text-white cursor-pointer"></span>
        </span>

        {task?.editing_type && (
          <>
            {/* editing type  */}
            <div className="flex text-xl line-clamp-1 font-semibold   w-fit mb-2  flex-row items-center gap-2">
              Type:{" "}
              <span className=" text-purple-400 text-lg line-clamp-1">
                {task?.editing_type}
              </span>
              <span className="text-white cursor-pointer"></span>
            </div>
          </>
        )}

        {/* task createdAt data  */}
        <span className="flex text-xl font-semibold   w-fit  flex-row items-center gap-2">
          Created At:{" "}
          <span className="text-purple-400 text-lg">
            {String(task?.createdAt).split("T")[0]}
          </span>
        </span>

        {/* Video Section  */}

        <span className="text-xl flex flex-row items-center gap-2 mb-4 font-semibold text-white">
          Status:{" "}
          <span className="text-purple-400 text-xl">{task?.status}</span>
        </span>

        <span className="text-xl flex flex-row items-center gap-2 mb-4 font-semibold text-white">
          User Name:{" "}
          <span className="text-purple-400 text-xl">
            {task?.user.first_name}
          </span>
        </span>

        <div className="flex lg:flex-row   items-center justify-start p-2 rounded-md min-h-fit flex-col gap-2">
          <div className="flex flex-col w-full items-center justify-center lg:w-1/2 min-h-[250px] border p-2 rounded-md gap-2">
            <span className="text-white mb-1 border-b-[2px] text-lg font-semibold">
              Previous Video
            </span>

            <video
              className="w-full h-full"
              src={task?.rawVideo!}
              controls
              autoPlay
            ></video>
          </div>

          <div className="flex flex-col w-full items-center justify-center lg:w-1/2 min-h-[250px] border p-2 rounded-md gap-2">
            <span className="text-white mb-1 border-b-[2px] text-lg font-semibold">
              Edited Video
            </span>
            <Uploader rawVideoFile={setvidurl} />
          </div>
        </div>

        {/* Process Button  */}

        {!task?.finalVideo && (
          <>
            <button
              disabled={loading}
              onClick={handleTaskSubmit}
              className={`bg-green-600 ${
                loading && "bg-gray-400 "
              } duration-300  transition-all cursor-pointer  text-center text-white px-5 py-3 rounded-md w-[30%] my-4 mx-auto  font-semibold`}
            >
              {loading ? "Please wait..." : "Submit Task"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskSubmitPage;
